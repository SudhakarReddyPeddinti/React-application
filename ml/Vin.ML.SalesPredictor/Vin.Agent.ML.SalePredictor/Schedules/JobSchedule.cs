using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vin.Agent.ML.SalePredictor.Schedules
{
    public class JobSchedule
    {
        public void Setup<T>(IScheduler scheduler, string cron, string name = null, string group = null) where T : IJob
        {
            name = string.IsNullOrWhiteSpace(name) ? typeof(T).ToString() : name;
            group = group ?? name;
            var job = JobBuilder.Create<T>()
                  .WithIdentity(name, group)
                  .Build();
            var trigger = TriggerBuilder.Create()
                .WithIdentity(name, group)
                .WithCronSchedule(cron)
                .StartNow()
                .Build();

            scheduler.ScheduleJob(job, trigger);
        }
    }
}
