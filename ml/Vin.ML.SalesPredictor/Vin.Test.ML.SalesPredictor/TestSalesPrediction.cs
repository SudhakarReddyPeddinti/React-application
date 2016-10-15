using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Amazon.SQS;
using Amazon.SQS.Model;
using System.Configuration;

namespace Vin.Test.ML.SalesPredictor
{
    [TestClass]
    public class TestSalesPrediction
    {
        static readonly AmazonSQSClient client = new AmazonSQSClient();

        [TestMethod]
        public void TestSendSQS_ML_Request()
        {

            string testFile = System.IO.File.ReadAllText(@"..\..\2015ActiveSold_DataSet_20161001_Test.csv");
            SendMessageRequest MLrequest = new SendMessageRequest
            {
                QueueUrl = ConfigurationManager.AppSettings["QueueURL"],
                MessageBody = testFile
            };

            var response = client.SendMessage(MLrequest);

            Assert.IsNotNull(response.MessageId);

        }
    }
}
