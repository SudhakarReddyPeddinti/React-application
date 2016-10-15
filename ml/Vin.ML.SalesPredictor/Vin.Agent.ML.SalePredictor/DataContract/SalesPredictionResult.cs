using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vin.Agent.ML.SalePredictor.DataContract
{
    public class SalesPredictionResult
    {
        public long AutoLeadID { get; set; }
        public string Predicted { get; set; }
        public double Confidence { get; set; }
    }
}
