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
   // val df = spark.read.option("header","False").option("inferSchema","true").csv("s3://sce.umkc.ml/metrics/DealerUserResponseTime.csv")
    val df = spark.read.option("header","False").option("inferSchema","true").csv("/Users/sudhakar/Downloads/workingDUResp.csv")
    df.createOrReplaceTempView("DealerUserRespTime")

    // All Dealer data
    val DealerAvgTime = spark.sql("SELECT _c0 as Dealer, AVG(_c2) as Average FROM DealerUserRespTime GROUP BY _c0")
    spark.sparkContext.hadoopConfiguration.set("mapreduce.fileoutputcommitter.marksuccessfuljobs", "false")
    DealerAvgTime.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").csv("/Users/sudhakar/Downloads/Output/DealerAverages")
    DealerAvgTime.createOrReplaceTempView("AverageDealerResponseTime")
    DealerAvgTime.toString()



    val std = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Mean, MIN(Dealer) as MinValue, MAX(Dealer) as MaxValue FROM AverageDealerResponseTime")
    std.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").csv("/Users/sudhakar/Downloads/Output/AllDealerDataStd")

    // User Averages
    val UserAvgTime = spark.sql("SELECT First(_c1) as User, AVG(_c2) as Average, First(_c0) as Dealer FROM DealerUserRespTime GROUP BY _c1")
    UserAvgTime.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").csv("/Users/sudhakar/Downloads/Output/UserAverages")
    UserAvgTime.createOrReplaceTempView("DealerUserUserAvg")

    val DealerSTD = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Mean, Min(User) Minimum, Max(User) Maximum, Dealer FROM DealerUserUserAvg GROUP BY Dealer")
    DealerSTD.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").csv("/Users/sudhakar/Downloads/Output/DealerSpecificData")

  }
}