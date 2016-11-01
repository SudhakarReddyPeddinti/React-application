
import org.apache.log4j.{Level, Logger}
import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.classification.RandomForestClassifier
import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator
import org.apache.spark.ml.feature.{IndexToString, StringIndexer, VectorAssembler}
import org.apache.spark.ml.tuning.{CrossValidator, ParamGridBuilder}
import org.apache.spark.sql.{SaveMode, SparkSession}
import vin.analytics.ml.sales.data.DataPrep

/**
  * Created by mali on 9/27/2016.
  */
object CrossValidatorModelTrainer {

  def sigmoid(x: Double): Double = {

    1.0 / (1.0 + Math.exp(-x))

  }

  def main(args: Array[String]): Unit = {
    System.setProperty("hadoop.home.dir", "C:\\dev\\apps\\winutils\\")

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

    //implicit conversion for types
    import spark.sqlContext.implicits._

    val numericFeatures = Seq(/*"leadcreationmonth","leadcreationday",*/"actionableminute","attemptedcontactminute","adjustedattemptedcontactminute","actualcontactminute","firstappointmentday","firstappointmentconfirmationday","appointments","leadage","firstsalesrepemailday","firstsalesrepcallday","visits","firstvisitday","lastvisitday","pricechanges","firstpricechangeday","lastpricechangeday")
    val categoricalFeatures = Seq("hasSalesRepEmail","hasSalesRepCall","hasCustomerReplyEmail","hasAutoResponderEmail")
    val indexedCategoricalFeatures = categoricalFeatures.map(_ + "Indexed")
    val features = numericFeatures ++ categoricalFeatures
    val IndexedFeatures = numericFeatures ++ indexedCategoricalFeatures

    val featureHeader = "features"
    val labelHeader = "Sold"
    val indexedLabelHeader = "label"


    val allData = dataDF.union(predictDF)
    allData.cache()

    // create vector assembler
    val assembler = new VectorAssembler()
      .setInputCols(Array(numericFeatures: _*))
      .setOutputCol(featureHeader)


    val labelIndexer = new StringIndexer()
      .setInputCol(labelHeader)
      .setOutputCol(indexedLabelHeader)
      .fit(allData)


    val classifier = new RandomForestClassifier()
      .setLabelCol(indexedLabelHeader)
      .setFeaturesCol(featureHeader)
      .setThresholds(Array(0.5, 0.6, 0.75))


    val labelConverter = new IndexToString()
      .setInputCol("prediction")
      .setOutputCol("predictedLabel")
      .setLabels(labelIndexer.labels)

    // grid of values to perform cross validation using different parameters
    val paramGrid = new ParamGridBuilder()
      .addGrid(classifier.maxBins, Array(25, 28, 31))
      .addGrid(classifier.maxDepth, Array(4, 6, 8))
      .addGrid(classifier.impurity, Array("entropy", "gini"))
      .build()


    val pipeline = new Pipeline().setStages(Array(labelIndexer, assembler, classifier, labelConverter))

    val evaluator = new BinaryClassificationEvaluator()
      .setLabelCol(indexedLabelHeader)

    val cv = new CrossValidator()
      .setEstimator(pipeline)
      .setEvaluator(evaluator)
      .setEstimatorParamMaps(paramGrid)
      .setNumFolds(10)


    val startTime = System.nanoTime()
    // train the model
    val trainedModel = cv.fit(dataDF)

    val elapsedTime = (System.nanoTime() - startTime) / 1e9
    println(s"Training time: $elapsedTime seconds")

    dataDF.show(3)
    val predictions = trainedModel.transform(predictDF)



    println("******Metrics*******")
    val evaluator1 = new BinaryClassificationEvaluator().setLabelCol(indexedLabelHeader)
    // Evaluates predictions and returns a scalar metric areaUnderROC(larger is better).
    val accuracy = evaluator1.evaluate(predictions)
    println("Accuracy: " + accuracy)


    trainedModel.write.overwrite().save(HDFS + "/Models/SP/RF/")

    //predictions.show


    predictions
      .select("AutoLeadID", "label", "prediction", "probability")
      .map(row => (row.getLong(0), row.getDouble(1), row.getDouble(2), sigmoid(row.getAs[org.apache.spark.ml.linalg.DenseVector](3).values(1))))
      .withColumnRenamed("_1", "AutoLeadID")
      .withColumnRenamed("_2", "Label")
      .withColumnRenamed("_3", "Prediction")
      .withColumnRenamed("_4", "Confidence")
      .coalesce(1)
      .write.mode(SaveMode.Overwrite)
      .format("json")
      .option("header", "true")
      .save(HDFS + "/output")

  }

}
