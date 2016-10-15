import sbt.Keys._

lazy val root = (project in file(".")).
  settings(
    name := "SalesPrediction",
    version := "1.0",
    scalaVersion := "2.11.8",
    mainClass in Compile := Some("SalesPrediction")

  )

exportJars := true

assemblyJarName := "SalesPrediction.jar"

val meta = """META.INF(.)*""".r

assemblyMergeStrategy in assembly := {
  case PathList("javax", "servlet", xs@_*) => MergeStrategy.first
  case PathList(ps@_*) if ps.last endsWith ".html" => MergeStrategy.first
  case n if n.startsWith("reference.conf") => MergeStrategy.concat
  case n if n.endsWith(".conf") => MergeStrategy.concat
  case meta(_) => MergeStrategy.discard
  case x => MergeStrategy.first
}

// additional libraries
libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % "2.0.0",// % "provided",
  "org.apache.spark" %% "spark-mllib" % "2.0.0",// % "provided"
  "com.databricks" % "spark-csv_2.10" % "0.1",
  "com.github.seratch" % "awscala_2.11" % "0.5.7"
)


pomExtra := {
  <url>https://github.com/imapi/spark-sqs-receiver</url>
    <licenses>
      <license>
        <name>Apache 2</name>
        <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
      </license>
    </licenses>
    <scm>
      <connection>scm:git:github.com/imapi/spark-sqs-receiver.git</connection>
      <developerConnection>scm:git:git@github.com:imapi/spark-sqs-receiver.git</developerConnection>
      <url>https://github.com/imapi/spark-sqs-receiver</url>
    </scm>
    <developers>
      <developer>
        <id>imapi</id>
        <name>Ivan Bondarenko</name>
        <url>https://github.com/imapi</url>
      </developer>
    </developers>
}