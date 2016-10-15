using KafkaNet;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using KafkaNet.Model;

namespace Vin.Agent.ML.SalePredictor.Jobs
{
    public class SalesPredictionReceiveKafkaJob : IJob
    {

        static readonly KafkaOptions options = new KafkaOptions(new Uri("kc-sce-cs5551-1.kc.umkc.edu"), new Uri("kc-sce-cs5542-1.kc.umkc.edu"));
        static readonly BrokerRouter router = new BrokerRouter(options);
        static readonly Consumer consumer = new Consumer(new ConsumerOptions("SalesPrediction", router));
        
        public void Execute(IJobExecutionContext context)
        {
            Console.WriteLine("SalesPredictionReceiveJob.Execute called");


            var messages = consumer.Consume();

            if (messages.Count() > 0)
            {
                Console.WriteLine(string.Format("Received {0} messages" + messages.Count()));

                //TODO should we delete message here using msg handle?
            }
            else
            {
                Console.WriteLine("No messages available.");
            }
        }
    }
}
