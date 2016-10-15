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

    val (dataDF, predictDF) = DataPrep.getTrainingDF(spark.sqlContext, true)


    //val numericFeatures = Seq("leadcreationmonth","leadcreationday","actionableminute","attemptedcontactminute","adjustedattemptedcontactminute","actualcontactminute","firstappointmentday","firstappointmentconfirmationday","appointments","leadage","firstsalesrepemailday","firstsalesrepcallday","visits","firstvisitday","lastvisitday","pricechanges","firstpricechangeday","lastpricechangeday")
    val numericFeatures = Seq("leadcreationmonth","leadcreationday","actionableminute","attemptedcontactminute","adjustedattemptedcontactminute","actualcontactminute","firstappointmentday","firstappointmentconfirmationday","appointments","leadage","hasSalesRepEmail","hasSalesRepCall","hasCustomerReplyEmail","hasAutoResponderEmail","firstsalesrepemailday","firstsalesrepcallday","visits","firstvisitday","lastvisitday","pricechanges","firstpricechangeday","lastpricechangeday")
    val categoricalFeatures = Seq("hasSalesRepEmail","hasSalesRepCall","hasCustomerReplyEmail","hasAutoResponderEmail")
    val indexedCategoricalFeatures = categoricalFeatures.map(_ + "Indexed")
    val allFeatures = numericFeatures //++ categoricalFeatures
    val allIndexedfeatures = numericFeatures //++ indexedCategoricalFeatures


    val IDHeader = "AutoLeadID"
    val labelHeader = "SoldString"
    val featureHeader = "Features"

    val allPredictFeatures = allFeatures ++ Seq(IDHeader)

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
        .fit(allData)
    }

    val indexedLabelHeader = "SoldIndexed"

    // index classes
    val labelIndexer = new StringIndexer()
      .setInputCol(labelHeader)
      .setOutputCol(indexedLabelHeader)
      .fit(allData)

    // vector assembler
    val assembler = new VectorAssembler()
      .setInputCols(Array(allIndexedfeatures: _*))
      .setOutputCol(featureHeader)

    val randomForest = new RandomForestClassifier()
      .setLabelCol(indexedLabelHeader)
      .setFeaturesCol(featureHeader)

    val labelConverter = new IndexToString()
      .setInputCol("prediction")
      .setOutputCol("predictedLabel")
      .setLabels(labelIndexer.labels)

    // define the order of the operations to be performed
//    val pipeline = new Pipeline().setStages(Array.concat(
//      stringIndexers.toArray,
//      Array(labelIndexer, assembler, randomForest, labelConverter)
//    ))

    val pipeline = new Pipeline().setStages(Array(labelIndexer, assembler, randomForest, labelConverter))

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
      .setNumFolds(10)

    val startTime = System.nanoTime()
    // train the model
    val crossValidatorModel = cv.fit(dataDFFiltered)

    val elapsedTime = (System.nanoTime() - startTime) / 1e9
    println(s"Training time: $elapsedTime seconds")

    val predictions = crossValidatorModel.transform(predictDFFiltered)
//
//    val predictionAndLabels =predictions.select("prediction", "predictedLabel").rdd.map(x =>
//      (x(0).asInstanceOf[Double], x(1).asInstanceOf[Double]))
//    val metrics = new BinaryClassificationMetrics(predictionAndLabels)
    // A Precision-Recall curve plots (precision, recall) points for different threshold values
    // while a receiver operating characteristic, or ROC, curve plots (recall, false positive rate) points.
    println("******Metrics*******")
    val evaluator1 = new BinaryClassificationEvaluator().setLabelCol(indexedLabelHeader)
    // Evaluates predictions and returns a scalar metric areaUnderROC(larger is better).
    var accuracy = evaluator1.evaluate(predictions)
    println("Accuracy: " + accuracy)

    accuracy = evaluator.evaluate(predictions)
    println("Accuracy: " + accuracy)


    //println("area under the receiver operating characteristic (ROC) curve : " + metrics.areaUnderROC.toString)

    //predictions.show(25)

   // crossValidatorModel.write.overwrite().save(HDFS + "/Models/SP/RF/")


//    predictions
//      .withColumn("Sold", col("predictedLabel"))
//      .select("AutoLeadID", "Sold")
//      .coalesce(1)
//      .write.mode(SaveMode.Overwrite)
//      .format("com.databricks.spark.csv")
//      .option("header", "true")
//      .save(HDFS + "/output")

  }

}
