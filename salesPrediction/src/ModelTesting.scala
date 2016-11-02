import org.apache.spark.mllib.linalg.Vectors
import org.apache.spark.mllib.regression.LabeledPoint
import org.apache.spark.mllib.tree.model.DecisionTreeModel
import org.apache.spark.{SparkContext, SparkConf}

/**
  * Created by sudhakar on 11/2/16.
  */
object ModelTesting {
  def main(args: Array[String]) {
    val conf = new SparkConf().setMaster("local[*]").setAppName("FeaturePredictor")
      .set("spark.executor.memory", "2g")

    val sc = new SparkContext(conf)
    val sameModel = DecisionTreeModel.load(sc, "model/DecisionTree")
    println("Tree Depth: "+sameModel.depth)
    println("Tree Nodes: "+sameModel.numNodes)
    println("Top Node: "+sameModel.topNode)

    val TestData = sc.textFile("data/TestData.txt")
    val vectorData = TestData.map(line=>{
      val parts = line.split(',').map(_.toDouble)
      LabeledPoint(parts(23), Vectors.dense(parts(1),parts(2),parts(3),parts(4),parts(5),parts(6),parts(7),parts(8),parts(9),parts(11),parts(12)))
    })

    val labeledAndPredict = vectorData.map(x => {
      val prediction = sameModel.predict(x.features)
      //println("Actual Label "+x.label+" prediction "+ prediction)
      (x.label, prediction)
    })

    val modelError = labeledAndPredict.filter(r => r._1 != r._2).count.toDouble / vectorData.count
    println("Model Error: "+modelError)

  }

}

