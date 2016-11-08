//import awscala._
//import awscala.sqs.{Queue, SQS}
//import com.amazonaws.auth.PropertiesCredentials
//import com.amazonaws.regions.Regions
//import org.apache.spark.storage.StorageLevel
//import org.apache.spark.streaming.receiver.Receiver
//
//import scala.annotation.tailrec
//
//
///**
//  * Created by mali on 9/28/2016.
//  * adopted from: https://github.com/imapi/spark-sqs-receiver
//  */
//
//case class SQSReceiver(name: String) extends Receiver[String](StorageLevel.MEMORY_AND_DISK_2) {
//
//  private var region: Regions = Regions.DEFAULT_REGION
//  private var timeout: Int = 1000
//
//
//  def at(region: Regions): SQSReceiver = {
//    this.region = region
//    this
//  }
//
//  def withTimeout(seconds: Int) = {
//    this.timeout = seconds * 1000
//    this
//  }
//
//  def onStart() {
//    new Thread("SQS Receiver") {
//      override def run() {
//        try {
//
//          implicit val sqs = SQS.apply().at(Region.apply(region))
//
//          val queue: Queue = sqs.queue(name) match {
//            case Some(q) => q
//            case None => throw new IllegalArgumentException(s"No queue with the name $name found")
//          }
//
//          @tailrec
//          def poll(): Unit = {
//            if (!isStopped()) {
//              queue.messages.foreach(msg => {
//                store(msg.body)
//                queue.remove(msg)
//              })
//              Thread.sleep(timeout)
//              poll()
//            }
//          }
//          poll()
//
//        } catch {
//          case e: IllegalArgumentException => restart(e.getMessage, e, 5000)
//          case t: Throwable => restart("Connection error", t)
//        }
//      }
//    }.start()
//  }
//
//
//  def onStop() {
//
//  }
//
//
//}
