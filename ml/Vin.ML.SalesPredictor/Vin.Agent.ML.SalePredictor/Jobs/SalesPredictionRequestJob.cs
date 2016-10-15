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
    public class SalesPredictionRequestJob : IJob
    {

        static readonly string queue = ConfigurationManager.AppSettings["RequestQueueURL"];

        static readonly AmazonSQSClient client = new AmazonSQSClient();

        public void Execute(IJobExecutionContext context)
        {
             

            Console.WriteLine("SalesPredictionRequestJob");

            
            //List<SalesPredictionRequest> predictionRequests = new List<SalesPredictionRequest>
            //{
            //    new SalesPredictionRequest
            //    {
            //        AutoLeadID = DateTime.Now.Ticks,
            //        lastpricechangeday=8
                    
            //    },
            //     new SalesPredictionRequest
            //    {
            //        AutoLeadID = DateTime.Now.Ticks+10
            //    },
            //      new SalesPredictionRequest
            //    {
            //        AutoLeadID = DateTime.Now.Ticks+20
            //    },
            //};

            var predictionRequests = VSCore.Data.SqlHelper.VinManager.GetRecords<SalesPredictionRequest>(@"SELECT TOP 100
	al.AutoLeadID
	,DATEPART(MONTH, al.CreatedUTC) leadcreationmonth
	,DATEPART(DAY, al.CreatedUTC) leadcreationday
	,DATEDIFF(MINUTE, al.CreatedUTC, ISNULL(alr.DealerActionableDateTimeUTC, GETUTCDATE())) actionableminute
	,DATEDIFF(MINUTE, al.CreatedUTC, ISNULL(alr.FirstAttemptedContactUTC, GETUTCDATE())) attemptedcontactminute
	,ISNULL(DATEDIFF(MINUTE, alr.DealerActionableDateTimeUTC, ISNULL(alr.FirstAttemptedContactUTC, GETUTCDATE())),0) adjustedattemptedcontactminute
	,DATEDIFF(MINUTE, al.CreatedUTC, COALESCE(alr.FirstContacted, GETUTCDATE())) actualcontactminute
	,DATEDIFF(DAY, al.CreatedUTC, COALESCE(gca.FirstAppointmentStartTimeUTC, al.CreatedUTC)) firstappointmentday
	,DATEDIFF(DAY, al.CreatedUTC, COALESCE(gca.FirstConfirmedUTC, al.CreatedUTC)) firstappointmentconfirmationday
	,ISNULL(gca.appointments, 0) appointments
	,DATEDIFF(DAY, al.CreatedUTC, COALESCE(alr.SoldDateUTC, GETUTCDATE())) leadage
	,CASE WHEN al.CoBuyerGlobalCustomerID > 0 THEN 1 ELSE 0 END hasCobuyer
	,CASE WHEN pc.SalesRepEmails >0 THEN 1 ELSE 0 END hasSalesRepEmail
	,CASE WHEN pc.SalesRepCalls >0 THEN 1 ELSE 0 END hasSalesRepCall
	,CASE WHEN pc.CustomerReplyEmails >0 THEN 1 ELSE 0 END hasCustomerReplyEmail
	,CASE WHEN pc.AutoResponderEmails >0 THEN 1 ELSE 0 END  hasAutoResponderEmail
	,DATEDIFF(MINUTE, al.CreatedUTC, ISNULL(pc.FirstSalesRepEmailUTC, al.CreatedUTC)) firstsalesrepemailday
	,DATEDIFF(MINUTE, al.CreatedUTC, ISNULL(pc.FirstSalesRepCallUTC, al.CreatedUTC)) firstsalesrepcallday
	,ISNULL(alv.visits, 0) visits
	,DATEDIFF(DAY, al.CreatedUTC, ISNULL(alv.FirstVisitStartTimeUTC, al.CreatedUTC)) firstvisitday
	,DATEDIFF(DAY, al.CreatedUTC, ISNULL(alv.LastVisitStartTimeUTC, al.CreatedUTC)) lastvisitday
	,ISNULL(pc.pricechanges, 0) pricechanges
	,DATEDIFF(DAY, al.CreatedUTC, ISNULL(pc.FirstPriceChangeUTC, al.CreatedUTC)) firstpricechangeday
	,DATEDIFF(DAY, al.CreatedUTC, ISNULL(pc.LastPriceChangeUTC, al.CreatedUTC)) lastpricechangeday
	, CASE WHEN ls.LeadStatusTypeID = 2 THEN 'Sold' ELSE 'Active' END Sold
FROM AutoLead al WITH (NOLOCK)
JOIN view_AutoLead_Reporting alr WITH (NOLOCK)
	ON al.AutoLeadID = alr.AutoLeadID and al.Flags & 128 = 0
JOIN LeadStatus ls WITH(NOLOCK) on ls.LeadStatusID=al.LeadStatusID and LeadTypeID=1
LEFT JOIN (SELECT
		alv.AutoLeadID
		,COUNT(*) visits
		,MIN(alv.VisitStartTimeUTC) FirstVisitStartTimeUTC
		,MAX(alv.VisitStartTimeUTC) LastVisitStartTimeUTC
	FROM AutoLeadVisit alv WITH (NOLOCK)
	GROUP BY alv.AutoLeadID) alv
	ON al.AutoLeadID = alv.AutoLeadID
LEFT JOIN (SELECT
		gca.GlobalCustomerID
		,COUNT(*) appointments
		,MIN(gca.StartTimeUTC) FirstAppointmentStartTimeUTC
		,MAX(gca.StartTimeUTC) LastAppointmentStartTimeUTC
		,MIN(gca.ConfirmedUTC) FirstConfirmedUTC
	FROM GlobalCustomerAppointment gca WITH (NOLOCK)
	GROUP BY gca.GlobalCustomerID) gca
	ON al.GlobalCustomerID = gca.GlobalCustomerID
LEFT JOIN (SELECT
		alm.AutoLeadID
		,SUM(CASE WHEN alm.LeadMessageTypeID=19 THEN 1 ELSE 0 END) pricechanges
		,MIN(alm.MessageTimeUTC) FirstPriceChangeUTC
		,MAX(alm.MessageTimeUTC) LastPriceChangeUTC
		,SUM(CASE WHEN alm.LeadMessageTypeID=3 THEN 1 ELSE 0 END) SalesRepEmails
		,MIN(CASE WHEN alm.LeadMessageTypeID=3 THEN alm.MessageTimeUTC ELSE NULL END) FirstSalesRepEmailUTC
		,SUM(CASE WHEN alm.LeadMessageTypeID=6 THEN 1 ELSE 0 END) SalesRepCalls
		,MIN(CASE WHEN alm.LeadMessageTypeID=6 THEN alm.MessageTimeUTC ELSE NULL END) FirstSalesRepCallUTC
		,SUM(CASE WHEN alm.LeadMessageTypeID=12 THEN 1 ELSE 0 END) CustomerReplyEmails
		,SUM(CASE WHEN alm.LeadMessageTypeID = 8 THEN 1 ELSE 0 END) AutoResponderEmails
	FROM AutoLeadMessage alm WITH (NOLOCK)
	WHERE alm.LeadMessageTypeID IN (3, 12, 6, 8, 19)
	GROUP BY alm.AutoLeadID) pc
	ON al.AutoLeadID = pc.AutoLeadID");

            var csvRequest = CsvSerializer.SerializeToCsv(predictionRequests);

            csvRequest = csvRequest.Substring(csvRequest.IndexOf("\r\n") + 2);

            client.SendMessage(queue, csvRequest);
            
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
