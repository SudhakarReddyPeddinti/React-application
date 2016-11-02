import java.io.File

import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.mllib.tree.DecisionTree
import org.apache.spark.mllib.regression.LabeledPoint
import org.apache.spark.mllib.linalg.Vectors
import org.apache.spark.mllib.tree.configuration.Algo._
import org.apache.spark.mllib.tree.impurity.Gini
/**
  * Created by Sudhakar on 17-Oct-16.
  */
object FeaturePredictor {

  def main(args: Array[String]) {
    val conf = new SparkConf().setMaster("local[*]").setAppName("FeaturePredictor")
      .set("spark.executor.memory", "2g")

    val sc = new SparkContext(conf)

    //val data = sc.textFile("data/2015ActiveSold_DataSet_20161001.csv")
     val data = sc.textFile("data/TrainData.txt")
    //val data = sc.textFile("/Users/sudhakar/Documents/Gits/VinAdvisor2.0/VinAdvisor/SalesPredictionData/DT-Train.txt")

    val parsedData = data.map { line =>
      val parts = line.split(',').map(_.toDouble)
      LabeledPoint(parts(23), Vectors.dense(parts(1),parts(2),parts(3),parts(4),parts(5),parts(6),parts(7),parts(8),parts(9),parts(11),parts(12)))
    }

    // Run training algorithm to build the model
    val numClasses = 2
    val impurity = "gini"
    val maxDepth = 5
    val maxBins = 7000
    val model = DecisionTree.train(parsedData, Classification, Gini, maxDepth, maxBins)
    model.save(sc, "model/DecisionTree")

    // Evaluate model on training examples and compute training error
    val labelAndPreds = parsedData.map { point =>
      val prediction = model.predict(point.features)
      println("Point Label "+point.label+" Prediction "+prediction);
      (point.label, prediction)
    }
    val trainErr = labelAndPreds.filter(r => r._1 != r._2).count.toDouble / parsedData.count
    println("Training Error = " + trainErr)

  }
}

