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
    DealerAvgTime.write.mode("Append").format("com.databricks.spark.csv").save(s"s3://sce.umkc.ml/metrics/Output/DealerAverages.csv")

    DealerAvgTime.createOrReplaceTempView("AverageDealerResponseTime")
    val std = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Average, MIN(Dealer) as min_value, MAX(Dealer) as max_value FROM AverageDealerResponseTime")
    std.write.mode("Overwrite").format("com.databricks.spark.csv").save("s3://sce.umkc.ml/metrics/Output/AllDealerDataStd.csv")

    // User Averages
    val UserAvgTime = spark.sql("SELECT First(_c1) as User, AVG(_c2) as UserAverage, First(_c0) as Dealer FROM DealerUserRespTime GROUP BY _c1")
    UserAvgTime.write.mode("Overwrite").format("com.databricks.spark.csv").save(s"s3://sce.umkc.ml/metrics/Output/UserAverages.csv")

    val dealers = df.select("_c0").distinct.collect.flatMap(_.toSeq)
    val UserAverageDFList = dealers.map(dealer => UserAvgTime.filter(s"Dealer = $dealer"))

    val resultSet = UserAverageDFList.map(f => {
      f.createOrReplaceTempView("temp")
      val result = spark.sql("SELECT STD(UserAverage) StandardDeviation, AVG(UserAverage) Average, MIN(User) as min_value, MAX(User) as max_value, First(Dealer) as Dealer FROM temp")
      result.write.mode("Overwrite").format("com.databricks.spark.csv").save(s"s3://sce.umkc.ml/metrics/Output/${result.select("Dealer").first().getAs(0)}.csv")
    })
  }
}