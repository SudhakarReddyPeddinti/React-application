package vin.analytics.ml.sales

import org.apache.log4j.{Level, Logger}
import org.apache.spark.ml.evaluation.{BinaryClassificationEvaluator, MulticlassClassificationEvaluator}
import org.apache.spark.ml.classification.{NaiveBayes, RandomForestClassifier}
import org.apache.spark.ml.feature.{IndexToString, StringIndexer, VectorAssembler}
import org.apache.spark.ml.tuning.{CrossValidator, ParamGridBuilder}
import org.apache.spark.ml.{Pipeline, util}
import org.apache.spark.mllib.evaluation.BinaryClassificationMetrics
import org.apache.spark.sql.types._
import org.apache.spark.sql.functions._
import org.apache.spark.sql.{DataFrame, SQLContext, SaveMode, SparkSession}
import vin.analytics.ml.sales.data.DataPrep


/**
  * Created by mali on 9/2/2016.
  */
object RandomForestModelTrainer {


  def main(args: Array[String]): Unit = {


    System.setProperty("hadoop.home.dir","C:\\dev\\apps\\winutils\\")

    Logger.getLogger("org").setLevel(Level.WARN)

    val HDFS = "c:///tmp"

    val spark = SparkSession
      .builder
      .appName("SalesPrediction")
      .master("local[*]")
      .config("spark.sql.warehouse.dir", HDFS + "/spark-warehouse")
      .config("spark.files.overwrite", "true")
      .getOrCreate();

    val sc = spark.sparkContext

    val programStartTime = System.nanoTime()
    val (dataDF, predictDF) = DataPrep.getTrainingDF(sqlContext = spark.sqlContext, withLabel = false)


    //implicit conversion for types
    import spark.sqlContext.implicits._

    val numericFeatures = Seq(/*"leadcreationmonth","leadcreationday",*/"actionableminute","attemptedcontactminute","adjustedattemptedcontactminute"/*,"leadage"*/,"actualcontactminute","firstappointmentday","firstappointmentconfirmationday","appointments","firstsalesrepemailday","firstsalesrepcallday","visits","firstvisitday","lastvisitday","pricechanges","firstpricechangeday","lastpricechangeday")

    val categoricalFeatures = Seq("hasSalesRepEmail","hasSalesRepCall","hasCustomerReplyEmail","hasAutoResponderEmail")
    val indexedCategoricalFeatures = categoricalFeatures.map(_ + "Indexed")
    val features = numericFeatures ++ categoricalFeatures
    val IndexedFeatures = numericFeatures ++ indexedCategoricalFeatures


    val IDHeader = "AutoLeadID"
    val featureHeader = "Features"
    val labelHeader = "Sold"
    val indexedLabelHeader = "SoldLabel"


    val allPredictFeatures = features ++ Seq(IDHeader)

    val dataDFFiltered = dataDF.select(labelHeader, allPredictFeatures: _*)

    //dataDFFiltered.show(20)

    val predictDFFiltered = predictDF.select(labelHeader, allPredictFeatures: _*)

    //predictDFFiltered.show(20)

    println("trainingSet instances: "+ dataDFFiltered.count)

    val allData = dataDFFiltered.union(predictDFFiltered)
    allData.cache()

    val stringIndexers = categoricalFeatures.map { colName =>
      new StringIndexer()
        .setInputCol(colName)
        .setOutputCol(colName + "Indexed")

    }

    // index classes
    val labelIndexer = new StringIndexer()
      .setInputCol(labelHeader)
      .setOutputCol(indexedLabelHeader)
      .fit(allData) //alldata

    // vector assembler
    val assembler = new VectorAssembler()
      .setInputCols(Array(IndexedFeatures: _*))
      .setOutputCol(featureHeader)

    val randomForest = new RandomForestClassifier()
      .setLabelCol(indexedLabelHeader)
      .setFeaturesCol(featureHeader)

    val labelConverter = new IndexToString()
      .setInputCol("prediction")
      .setOutputCol("predictedLabel")
      .setLabels(labelIndexer.labels)

    val pipeline = new Pipeline()
      .setStages(stringIndexers.toArray
        :+ labelIndexer
        :+ assembler
        :+ randomForest
        :+ labelConverter
      )


    // grid of values to perform cross validation using different parameters
    val paramGrid = new ParamGridBuilder()
      .addGrid(randomForest.maxBins, Array(25, 28, 31))
      .addGrid(randomForest.maxDepth, Array(4, 6, 8))
      .addGrid(randomForest.impurity, Array("entropy", "gini"))
      .build()

    val evaluator = new BinaryClassificationEvaluator()
      .setLabelCol(indexedLabelHeader)

    val cv = new CrossValidator()
      .setEstimator(pipeline)
      .setEvaluator(evaluator)
      .setEstimatorParamMaps(paramGrid)
      .setNumFolds(4)

    val startTime = System.nanoTime()
    // train the model
    val crossValidatorModel = cv.fit(dataDFFiltered)


    val elapsedTime = (System.nanoTime() - startTime) / 1e9
    println(s"Training time: $elapsedTime seconds")

    dataDFFiltered.show(3)

    val model = crossValidatorModel.bestModel
    val predictions = model.transform(predictDFFiltered)


    println("******Metrics*******")
    val evaluator1 = new BinaryClassificationEvaluator()
      .setLabelCol(indexedLabelHeader)
    val accuracy = evaluator1.evaluate(predictions)
    println("Accuracy: " + accuracy)

    val predsAndlabel = predictions.select("prediction", "SoldLabel").rdd.map( x => (x.getDouble(0), x.getDouble(1)) )
    val metrics = new BinaryClassificationMetrics(predsAndlabel)
    println("Area under ROC: " + metrics.areaUnderROC())
    println("Area under PR: " + metrics.areaUnderPR())

    metrics.pr().foreach {
      case (p, r) =>
        println(s"Precision: $p, Recall: $r")
    }

    metrics.precisionByThreshold().foreach {
      case (t, p) =>
        println(s"Threshold: $t, Precision: $p")
    }

    metrics.recallByThreshold().foreach {
      case (t, r) =>
        println(s"Threshold: $t, Recall: $r")
    }

    //predictions.show(25)

    crossValidatorModel.write.overwrite().save(HDFS + "/Models/SP/RF/")

    val ProgramElapsedTime = (System.nanoTime() - programStartTime) / 1e9
    println(s"program run time: $ProgramElapsedTime seconds")

    predictions
      .select("AutoLeadID", "SoldLabel", "PredictedLabel", "prediction", "probability")
      .map(row => (row.getLong(0), row.getDouble(1), row.getString(2), row.getDouble(3), row.getAs[org.apache.spark.ml.linalg.DenseVector](4).values(1)))
      .withColumnRenamed("_1", "AutoLeadID")
      .withColumnRenamed("_2", "SoldLabel")
      .withColumnRenamed("_3", "PredictedLabel")
      .withColumnRenamed("_4", "Prediction")
      .withColumnRenamed("_5", "Confidence")
      .coalesce(1)
      .write.mode(SaveMode.Overwrite)
      .format("json")
      .option("header", "true")
      .save(HDFS + "/output")



  }

}
