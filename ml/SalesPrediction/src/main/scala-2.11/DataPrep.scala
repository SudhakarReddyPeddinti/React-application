package vin.analytics.ml.sales.data

import org.apache.spark.sql._
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._


/**
  * Created by mali on 9/24/2016.
  */
object DataPrep {

  val HDFS = "c:///tmp"
  //val HDFS = "s3://sce.umkc.ml/"

  val variables = Array(
    StructField("autoleadid", LongType, true),
    StructField("leadcreationmonth", IntegerType, true),
    StructField("leadcreationday", IntegerType, true),
    StructField("actionableminute", IntegerType, true),
    StructField("attemptedcontactminute", IntegerType, true),
    StructField("adjustedattemptedcontactminute", IntegerType, true),
    StructField("actualcontactminute", IntegerType, true),
    StructField("firstappointmentday", IntegerType, true),
    StructField("firstappointmentconfirmationday", IntegerType, true),
    StructField("appointments", IntegerType, true),
    StructField("leadage", IntegerType, true),
    StructField("hasSalesRepEmail", IntegerType, true),
    StructField("hasSalesRepCall", IntegerType, true),
    StructField("hasCustomerReplyEmail", IntegerType, true),
    StructField("hasAutoResponderEmail", IntegerType, true),
    StructField("firstsalesrepemailday", IntegerType, true),
    StructField("firstsalesrepcallday", IntegerType, true),
    StructField("visits", IntegerType, true),
    StructField("firstvisitday", IntegerType, true),
    StructField("lastvisitday", IntegerType, true),
    StructField("pricechanges", IntegerType, true),
    StructField("firstpricechangeday", IntegerType, true),
    StructField("lastpricechangeday", IntegerType, true),
    StructField("Sold", StringType, true)
  )

  val trainSchema = StructType(variables)
  val testSchema = StructType(variables.filter(p => p.name != "Sold"))

  def addLabel(trainDF: DataFrame, testDF: DataFrame) = {

//    //add a label and populate from sold
//    val newTrainDF = trainDF
//      .withColumn("SoldString", trainDF("Sold").cast(StringType))

    //add a label and populate with zeros
    val newTestDF = testDF
       .withColumn("Sold", lit("0").cast(StringType))


    (trainDF, newTestDF)
  }

  def getTrainingDF(
                sqlContext: SQLContext,
                withLabel: Boolean
              ): (DataFrame, DataFrame) = {




    val trainDF = sqlContext.read
      .format("com.databricks.spark.csv")
      .option("header", "true")
      .schema(trainSchema)
      .load(HDFS + "/training/")

    val testDF = sqlContext.read
      .format("com.databricks.spark.csv")
      .option("header", "true")
      .schema(testSchema)
      .load(HDFS + "/test/")


    //trainDF.na.drop()
    //testDF.na.drop()

    if (withLabel)
      addLabel(trainDF, testDF)
    else
      (trainDF, testDF)
  }

  def getTestDF(
                     sqlContext: SQLContext
                   ): DataFrame = {


    val testSchema = StructType(variables.filter(p => p.name != "Sold"))

    val testDF = sqlContext.read
      .format("com.databricks.spark.csv")
      .option("header", "true")
      .schema(testSchema)
      .load(HDFS + "/test/")


    //trainDF.na.drop()
    //testDF.na.drop()


    testDF
  }
}
