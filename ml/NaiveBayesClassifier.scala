import org.apache.spark.mllib.classification.{NaiveBayes, NaiveBayesModel}
import org.apache.spark.mllib.util.MLUtils
import org.apache.spark.mllib.evaluation.MulticlassMetrics

// Load and parse the data file.
val data = MLUtils.loadLibSVMFile(sc, "s3://sce.umkc.ml/sample_libsvm_data.txt")

// Split data into training (60%) and test (40%).
val Array(training, test) = data.randomSplit(Array(0.6, 0.4))

val model = NaiveBayes.train(training, lambda = 1.0, modelType = "multinomial")

val predictionAndLabel = test.map(p => (model.predict(p.features), p.label))
val accuracy = 1.0 * predictionAndLabel.filter(x => x._1 == x._2).count() / test.count()


// Save and load model
model.save(sc, "s3://sce.umkc.ml/models/myNaiveBayesModel.model")
val sameModel = NaiveBayesModel.load(sc, "s3://sce.umkc.ml/models/myNaiveBayesModel.model")

val metrics = new MulticlassMetrics(predictionAndLabel)


println("Confusion matrix:")
println(metrics.confusionMatrix)