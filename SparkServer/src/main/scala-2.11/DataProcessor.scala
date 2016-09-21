/**
  * Created by sudhakar on 9/10/16.
  */

import java.util

import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.types.{StructType, DataTypes, StructField}
import org.apache.spark.sql.functions.{stddev_samp, stddev_pop}


object DataProcessor {
  def main(args: Array[String]) {
    val spark = SparkSession.builder.appName("Simple Application").getOrCreate()

    // Read data from ./csv file
    val df = spark.read.option("header","False").option("inferSchema","true").csv("s3://sce.umkc.ml/metrics/DealerUserResponseTime.csv")
    df.createOrReplaceTempView("DealerUserRespTime")

    // All Dealer data
    val DealerAvgTime = spark.sql("SELECT _c0 as Dealer, AVG(_c2) as Average FROM DealerUserRespTime GROUP BY _c0")
    DealerAvgTime.write.mode("Append").json("s3://sce.umkc.ml/metrics/Output/DealerAverages.json")
    DealerAvgTime.createOrReplaceTempView("AverageDealerResponseTime")

    val std = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Average, MIN(Dealer) as min_value, MAX(Dealer) as max_value FROM AverageDealerResponseTime")
    std.write.mode("Overwrite").json("s3://sce.umkc.ml/metrics/Output/AllDealerDataStd.json")

    // User Averages
    val UserAvgTime = spark.sql("SELECT First(_c1) as User, AVG(_c2) as UserAverage, First(_c0) as Dealer FROM DealerUserRespTime GROUP BY _c1")
    UserAvgTime.write.mode("Overwrite").json("s3://sce.umkc.ml/metrics/Output/UserAverages.json")
    UserAvgTime.createOrReplaceTempView("DealerUserUserAvg")

    val DealerSTD = spark.sql("SELECT STD(UserAverage) StandardDeviation, AVG(UserAverage) Average, Dealer FROM DealerUserUserAvg GROUP BY Dealer")
    DealerSTD.write.mode("Overwrite").json("s3://sce.umkc.ml/metrics/Output/DealerSpecificData.json")

    System.exit(0)

  }
}