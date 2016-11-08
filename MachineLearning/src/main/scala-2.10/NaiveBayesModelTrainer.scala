
import org.apache.log4j.{Level, Logger}
import org.apache.spark.ml.classification.RandomForestClassifier
import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator
import org.apache.spark.ml.feature.{StringIndexer, VectorAssembler}
import org.apache.spark.sql.{SaveMode, SparkSession}

import vin.analytics.ml.sales.data.DataPrep

/**
  * Created by mali on 9/27/2016.
  */
object NaiveBayesModelTrainer {

  def sigmoid(x: Double): Double = {

    1.0 / (1.0 + Math.exp(-x))

  }

  def main(args: Array[String]): Unit = {
    System.setProperty("hadoop.home.dir", "C:\\dev\\apps\\winutils\\")

    Logger.getLogger("org").setLevel(Level.WARN)

    //val HDFS = "c:///tmp"

    val spark = SparkSession
      .builder
      .appName("SalesPrediction")
      .master("local[*]")
      //.config("spark.sql.warehouse.dir", HDFS + "/spark-warehouse")
      .config("spark.files.overwrite", "true")
      .getOrCreate();

    val sc = spark.sparkContext

    val (dataDF, predictDF) = DataPrep.getTrainingDF(spark.sqlContext, false )

    //implicit conversion for types
    import spark.sqlContext.implicits._

    val numericFeatures = Seq("leadcreationmonth", "leadcreationday", "actionableminute", "attemptedcontactminute", "adjustedattemptedcontactminute", "actualcontactminute", "firstappointmentday", "firstappointmentconfirmationday", "appointments", "leadage", "hasSalesRepEmail", "hasSalesRepCall", "hasCustomerReplyEmail", "hasAutoResponderEmail", "firstsalesrepemailday", "firstsalesrepcallday", "visits", "firstvisitday", "lastvisitday", "pricechanges", "firstpricechangeday", "lastpricechangeday")
    val categoricalFeatures = Seq("hasSalesRepEmail", "hasSalesRepCall", "hasCustomerReplyEmail", "hasAutoResponderEmail")

    val featureHeader = "features"
    val labelHeader = "Sold"
    val indexedLabelHeader = "label"

    // create vector assembler
    val assembler = new VectorAssembler()
      .setInputCols(Array(numericFeatures: _*))
      .setOutputCol(featureHeader)

    //now create feature vector
    val featureDF = assembler.transform(dataDF)

    // index classes
    val labeledDF = new StringIndexer()
      .setInputCol(labelHeader)
      .setOutputCol(indexedLabelHeader)
      .fit(featureDF)
      .transform(featureDF)

    val classifier = new RandomForestClassifier()
      .setImpurity("gini")
      .setMaxDepth(3)
      .setNumTrees(20)
      .setFeatureSubsetStrategy("auto")
      .setSeed(5043)

    val Array(trainingData, testData) = labeledDF.randomSplit(Array(0.6, 0.4))

    val model = classifier.fit(trainingData)


    //evaluate
    val predictions = model.transform(testData)

    println("******Metrics*******")
    val evaluator1 = new BinaryClassificationEvaluator().setLabelCol(indexedLabelHeader)
    // Evaluates predictions and returns a scalar metric areaUnderROC(larger is better).
    val accuracy = evaluator1.evaluate(predictions)
    println("Accuracy: " + accuracy)



    predictions.show


    predictions
      .select("AutoLeadID", "label", "prediction", "probability")
      .map(row => (row.getInt(0), row.getDouble(1), row.getDouble(2), sigmoid(row.getAs[org.apache.spark.ml.linalg.DenseVector](3).values(1))))
      .withColumnRenamed("_1", "AutoLeadID")
      .withColumnRenamed("_2", "Label")
      .withColumnRenamed("_3", "Prediction")
      .withColumnRenamed("_4", "Confidence")
      .coalesce(1)
      .write.mode(SaveMode.Overwrite)
      .format("json")
      .option("header", "true")
      .save("model/NBModelTrainer")
      //.save(HDFS + "/output")

  }

}
