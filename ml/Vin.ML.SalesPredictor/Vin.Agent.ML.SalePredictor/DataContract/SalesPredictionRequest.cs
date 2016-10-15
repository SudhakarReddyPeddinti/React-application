using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vin.Agent.ML.SalePredictor.DataContract
{
    public class SalesPredictionRequest
    {
        public long AutoLeadID { get; set; }
        public int leadcreationmonth { get; set; }
        public int leadcreationday { get; set; }
        public int actionableminute { get; set; }
        public int attemptedcontactminute { get; set; }
        public int adjustedattemptedcontactminute { get; set; }
        public int actualcontactminute { get; set; }
        public int firstappointmentday { get; set; }
        public int firstappointmentconfirmationday { get; set; }
        public int appointments { get; set; }
        public int leadage { get; set; }
        public int hasSalesRepEmail { get; set; }
        public int hasSalesRepCall { get; set; }
        public int hasCustomerReplyEmail { get; set; }
        public int hasAutoResponderEmail { get; set; }
        public int firstsalesrepemailday { get; set; }
        public int firstsalesrepcallday { get; set; }
        public int visits { get; set; }
        public int firstvisitday { get; set; }
        public int lastvisitday { get; set; }
        public int pricechanges { get; set; }
        public int firstpricechangeday { get; set; }
        public int lastpricechangeday { get; set; }
        public string Sold { get; set; }

    }
}
