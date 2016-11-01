import com.amazonaws.regions.Regions
import com.amazonaws.services.sqs.AmazonSQSClient
import org.apache.log4j.{Level, Logger}
import org.apache.spark.ml.tuning.CrossValidatorModel
import org.apache.spark.rdd.RDD
import org.apache.spark.sql.{Row, SparkSession}
import org.apache.spark.streaming.{Seconds, StreamingContext, Time}
import vin.analytics.ml.sales.data.DataPrep


/**
  * Created by mali on 9/28/2016.
  */
object StreamingSalesScenarioPrediction {


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


    startRealTimePrediction(spark, HDFS)
  }

  def startRealTimePrediction(spark: SparkSession, HDFS: String): Unit = {
    //implicit conversion for types
    import spark.sqlContext.implicits._

    val sqsClient = new AmazonSQSClient()

    val QueueURL =  "https://sqs.us-east-1.amazonaws.com/743856605832/salespredictionresult"


    val trainedModel = CrossValidatorModel.load(HDFS + "/models/SP/RF")

    println("Trained model loaded and ready for use")

    val ssc = new StreamingContext(spark.sparkContext, Seconds(1))

    val lines = ssc.receiverStream(new SQSReceiver("salesprediction")
      .at(Regions.US_EAST_1)
      .withTimeout(seconds = 1))

    lines.foreachRDD { (rdd: RDD[String], time: Time) =>

      val lRDD = rdd
        .flatMap(new String(_).split("\\s+"))
        .map(_.split(",", -1))
        .map(col => Row(col(0).toLong, col(1).toInt, col(2).toInt, col(3).toInt, col(4).toInt, col(5).toInt, col(6).toInt, col(7).toInt, col(8).toInt, col(9).toInt, col(10).toInt, col(11).toInt, col(12).toInt, col(13).toInt, col(14).toInt, col(15).toInt, col(16).toInt, col(17).toInt, col(18).toInt, col(19).toInt, col(20).toInt, col(21).toInt, col(22).toInt))


      val recordDF = spark.sqlContext.createDataFrame(lRDD, DataPrep.testSchema)

      recordDF.show(5)

      val predictions = trainedModel.bestModel.transform(recordDF)


     //send result to SQS queue
      if (!predictions.rdd.isEmpty()) {

        val result = predictions
          .select("AutoLeadID", "predictedLabel", "probability")
          .map(row => (row.getLong(0), row.getString(1), row.getAs[org.apache.spark.ml.linalg.DenseVector](2).values(1)))
          .withColumnRenamed("_1", "AutoLeadID")
          .withColumnRenamed("_2", "Predicted")
          .withColumnRenamed("_3", "Confidence")
          .rdd
          .map((x) => x.toString().replace("]", "").replace("[", ""))
          .reduce((a, b) => (a + "\r\n" + b))

        sqsClient.sendMessage(QueueURL, result)

        println(result)
      }
    }

    ssc.start()
    ssc.awaitTermination()
  }

}




