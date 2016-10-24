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
    val df = spark.read.option("header","False").option("inferSchema","true").csv("/Users/sudhakar/Downloads/workingDUResp.csv")
    df.createOrReplaceTempView("DealerUserRespTime")

    // Dealer Averages
    val DealerAvgTime = spark.sql("SELECT _c0 as Dealer, AVG(_c2) as Average FROM DealerUserRespTime GROUP BY _c0")
    spark.sparkContext.hadoopConfiguration.set("mapreduce.fileoutputcommitter.marksuccessfuljobs", "false")
    DealerAvgTime.coalesce(1).write.mode("Overwrite").json("/Users/sudhakar/Downloads/Eclipse_Output/DealerAverages")
    //DealerAvgTime.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").save("/Users/sudhakar/Downloads/Output/DealerAverages")
    DealerAvgTime.createOrReplaceTempView("AverageDealerResponseTime")


    // Histogram calculations
    val histogram = spark.sql("SELECT bucket_ceiling, CONCAT(bucket_floor, ' to ', bucket_ceiling) AS bucket_name, COUNT(*) AS count FROM " +
      "( SELECT floor(Average/45.00)*45 AS bucket_floor, floor(Average/45.00)*45 + 45 AS bucket_ceiling FROM AverageDealerResponseTime) a GROUP BY 1, 2 ORDER BY 1")
    histogram.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").save("/Users/sudhakar/Downloads/Eclipse_Output/Histogram")


    // Global Chart Data statistics
    val std = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Mean, MIN(Average) as MinValue, MAX(Average) as MaxValue FROM AverageDealerResponseTime")
    std.coalesce(1).write.mode("Overwrite").json("/Users/sudhakar/Downloads/Eclipse_Output/GlobalChartData")
    //std.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").save("/Users/sudhakar/Downloads/Output/GlobalChartData")


    // Filter possible (positive tail) outlier
    val maxValue = spark.sql("SELECT Average as max FROM AverageDealerResponseTime order by Average desc limit 1")
    maxValue.createOrReplaceTempView("MaxValue")
    val dfWithoutLast = spark.sql("SELECT Dealer, Average FROM AverageDealerResponseTime WHERE Average NOT IN (SELECT max FROM MaxValue)")
    dfWithoutLast.createOrReplaceTempView("AverageDealerResponseTimeWithoutLast")
    val stdMinusLast = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Mean, MIN(Average) as MinValue, MAX(Average) as MaxValue FROM AverageDealerResponseTimeWithoutLast")
    stdMinusLast.coalesce(1).write.mode("Overwrite").json("/Users/sudhakar/Downloads/Eclipse_Output/AllDealerDataStd")


    // User Averages
    val UserAvgTime = spark.sql("SELECT First(_c1) as User, AVG(_c2) as Average, First(_c0) as Dealer FROM DealerUserRespTime GROUP BY _c1")
    UserAvgTime.coalesce(1).write.mode("Overwrite").json("/Users/sudhakar/Downloads/Eclipse_Output/UserAverages")
    //UserAvgTime.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").save("/Users/sudhakar/Downloads/Output/UserAverages")
    UserAvgTime.createOrReplaceTempView("DealerUserUserAvg")


    // Dealer specific statistics
    val DealerSTD = spark.sql("SELECT STD(Average) StandardDeviation, AVG(Average) Mean, Min(Average) Minimum, Max(Average) Maximum, Dealer FROM DealerUserUserAvg GROUP BY Dealer")
    DealerSTD.coalesce(1).write.mode("Overwrite").json("/Users/sudhakar/Downloads/Eclipse_Output/DealerSpecificData")
    //DealerSTD.coalesce(1).write.mode("Overwrite").format("com.databricks.spark.csv").save("/Users/sudhakar/Downloads/Output/DealerSpecificData")

  }
}
