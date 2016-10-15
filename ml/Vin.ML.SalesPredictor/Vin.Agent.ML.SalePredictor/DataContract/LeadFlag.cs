using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vin.Agent.ML.SalePredictor.DataContract
{
    [Flags]
    public enum AutoLeadFlags
    {
       PredictionRequest = 64,
       PredictionResult = 128
    }

}
