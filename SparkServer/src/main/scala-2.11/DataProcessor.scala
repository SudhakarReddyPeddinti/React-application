/**
  * Created by sudhakar on 9/10/16.
  */

import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.types.{StructType, DataTypes, StructField}
import org.apache.spark.sql.functions.{stddev_samp, stddev_pop}


object DataProcessor {
  def main(args: Array[String]) {
    val spark = SparkSession.builder.master("local").appName("Simple Application").getOrCreate()

    // Read data from ./csv file
    val df = spark.read.option("header","False").option("inferSchema","true").csv("s3://sce.umkc.ml/metrics/DealerUserResponseTime.csv")
    df.createOrReplaceTempView("DealerUserRespTime")

    // Dealer Averages
    val DealerAvgTime = spark.sql("SELECT _c0 as Dealer, AVG(_c2) as Average FROM DealerUserRespTime GROUP BY _c0")
    spark.sparkContext.hadoopConfiguration.set("mapreduce.fileoutputcommitter.marksuccessfuljobs", "false")
    DealerAvgTime.coalesce(1).write.mode("Overwrite").json("s3://sce.umkc.ml/metrics/output/DealerAverages")
    DealerAvgTime.createOrReplaceTempView("AverageDealerResponseTime")


    // Histogram calculations
    val histogram = spark.sql("SELECT floor(Average/45.00)*45 + 45 as bucket_size, COUNT(*) AS count FROM " +
      " AverageDealerResponseTime GROUP BY 1 ORDER BY 1")
    histogram.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").save("s3://sce.umkc.ml/metrics/output/Histogram")


    // User Averages
    val UserAvgTime = spark.sql("SELECT First(_c1) as User, AVG(_c2) as Average, First(_c0) as Dealer FROM DealerUserRespTime GROUP BY _c1")
    UserAvgTime.coalesce(1).write.mode("Overwrite").json("s3://sce.umkc.ml/metrics/output/UserAverages")
    UserAvgTime.createOrReplaceTempView("DealerUserUserAvg")


    // Dealer specific statistics
    val DealerSTD = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Mean, Min(Average) Minimum, Max(Average) Maximum, Dealer FROM DealerUserUserAvg GROUP BY Dealer")
    DealerSTD.coalesce(1).write.mode("Overwrite").json("s3://sce.umkc.ml/metrics/output/DealerSpecificData")
  }
}
