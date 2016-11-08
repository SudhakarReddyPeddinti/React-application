import org.apache.spark.ml.tuning.CrossValidatorModel
import org.apache.spark.sql.{SaveMode, SparkSession}
import vin.analytics.ml.sales.data.DataPrep


/**
  * Created by mali on 9/18/2016.
  */

object SalesScenarioPrediction {

//  def main(args: Array[String]) {
//
//    System.setProperty("hadoop.home.dir", "C:\\dev\\apps\\winutils\\")
//
//
//    val HDFS = "c:///tmp"
//    //val HDFS = "s3://sce.umkc.ml/"
//
//    val spark = SparkSession
//      .builder
//      .appName("SalesPrediction")
//      .master("local[*]")
//      .config("spark.sql.warehouse.dir", HDFS + "/spark-warehouse")
//      .config("spark.files.overwrite", "true")
//      .getOrCreate();
//
//    //implicit conversion for types
//    import spark.sqlContext.implicits._
//
//
//    val trainedModel = CrossValidatorModel.load(HDFS + "/models/SP/RF")
//
//
//    val testData = DataPrep.getTestDF(spark.sqlContext)
//
//    val predictions = trainedModel.bestModel.transform(testData)

//    predictions
//      .select("AutoLeadID", "predictedLabel", "probability")
//      .map(row => (row.getLong(0), row.getString(1), row.getAs[org.apache.spark.ml.linalg.DenseVector](2).values(1)))
//      .withColumnRenamed("_1", "AutoLeadID")
//      .withColumnRenamed("_2", "Predicted")
//      .withColumnRenamed("_3", "Confidence")
//      .coalesce(1)
//      .write.mode(SaveMode.Overwrite)
//      .format("json")
//      .option("header", "true")
//      .save(HDFS + "/predictions")
//
//    val result = predictions
//      .select("AutoLeadID", "predictedLabel", "probability")
//      .map(row => (row.getLong(0), row.getString(1), row.getAs[org.apache.spark.ml.linalg.DenseVector](2).values(1)))
//      .withColumnRenamed("_1", "AutoLeadID")
//      .withColumnRenamed("_2", "Predicted")
//      .withColumnRenamed("_3", "Confidence")



//    predictions.show()
//    val results = result.rdd.map((x) => x.toString().replace("]", "").replace("[", "")).reduce((a, b) => (a + "\r\n" + b))

   // println(results)


//  }
}
