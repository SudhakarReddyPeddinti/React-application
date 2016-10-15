using Amazon.SQS;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using Amazon.SQS.Model;
using ServiceStack.Text;

using Vin.Agent.ML.SalePredictor.DataContract;

namespace Vin.Agent.ML.SalePredictor.Jobs
{
    [DisallowConcurrentExecution]
    public class SalesPredictionReceiveJob : IJob
    {

        static readonly string queue = ConfigurationManager.AppSettings["ResultQueueURL"];

        static readonly AmazonSQSClient client = new AmazonSQSClient();

        public void Execute(IJobExecutionContext context)
        {             

            Console.WriteLine("SalesPredictionReceiveJob");


            var response = client.ReceiveMessage(queue);

            if (response.Messages.Count > 0)
            {
                Console.WriteLine(string.Format("Received {0} messages", response.Messages.Count));

                List<SalesPredictionResult> result;
                foreach (var msg in response.Messages)
                {
                    Console.WriteLine("Message: " + msg.Body);

                    result = CsvSerializer.DeserializeFromString<List<SalesPredictionResult>>(msg.Body.Insert(0, "AutoLeadID,Predicted,Confidence\r\n"));


                    AcknowledgeReceipt(msg.ReceiptHandle);
                }

            }
            else
            {
                Console.WriteLine("No messages available.");
            }

        }

        private void AcknowledgeReceipt(string receiptHandle)
        {
            var request = new DeleteMessageRequest()
            {
                QueueUrl = queue,
                ReceiptHandle = receiptHandle
            };
            var response = client.DeleteMessage(request);
        }
    }
}
