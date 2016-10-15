using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Topshelf;
using Vin.Agent.ML.SalePredictor.Jobs;
using Vin.Agent.ML.SalePredictor.Schedules;

namespace Vin.Agent.ML.SalePredictor
{
    public class Startup
    {
        public static string GetAssemlyAttribute<T>() where T : Attribute
        {
            var attribute = Assembly.GetEntryAssembly().GetCustomAttribute(typeof(T));
            if (attribute == null)
            {
                throw new Exception(string.Format("Assembly Attribute '{0}' is not present.  Please update the AssemblyInfo and ensure {0} is entered", typeof(T).ToString()));
            }

            var prop = attribute.GetType().GetProperties().FirstOrDefault();
            if (prop == null)
            {
                throw new Exception(string.Format("Assembly Attribute '{0}' does not have a property to get the value of", typeof(T).ToString()));
            }

            string value = prop.GetValue(attribute).ToString();

            if (String.IsNullOrWhiteSpace(value))
            {
                throw new Exception(string.Format("AssemblyAttribute '{0}' is empty.  Please update the AssemblyInfo and ensure {0} is entered", typeof(T).ToString()));
            }

            return value;
        }

        public static void Main(string[] args)
        {
            InitializeScheduler();

            HostFactory.Run(topshelf =>
            {
                topshelf.RunAsLocalSystem();

                topshelf.SetServiceName(GetAssemlyAttribute<AssemblyTitleAttribute>());
                topshelf.SetInstanceName(GetAssemlyAttribute<AssemblyTitleAttribute>());

                topshelf.SetDisplayName(GetAssemlyAttribute<AssemblyTitleAttribute>());
                topshelf.SetDescription(GetAssemlyAttribute<AssemblyDescriptionAttribute>());

                topshelf.StartAutomaticallyDelayed();

                topshelf.EnableServiceRecovery(rc =>
                {
                    rc.RestartService(5);
                });

                topshelf.Service<Startup>(hostSetting =>
                {
                    hostSetting.ConstructUsing(() => new Startup());
                    hostSetting.WhenStarted(startup => startup.Start());
                    hostSetting.WhenStopped(startup => startup.Stop());
                    hostSetting.WhenPaused(startup => startup.Pause());
                    hostSetting.WhenContinued(startup => startup.Continue());
                    hostSetting.WhenShutdown(startup => startup.Shutdown());
                });
            });
        }



        private static IScheduler m_scheduler;

        private static void InitializeScheduler()
        {
            var sf = new StdSchedulerFactory();
            m_scheduler = sf.GetScheduler();

            /*
             Quartz cron config details: 
                *   *    *    *    *    *   (year optional)
                ┬   ┬    ┬    ┬    ┬    ┬
                │   │    │    │    │    │
                │   │    │    │    │    │
                │   │    │    │    │    └───── day of week (0 - 7) (0 or 7 is Sun, or use names)
                │   │    │    │    └────────── month (1 - 12)
                │   │    │    └─────────────── day of month (1 - 31)
                │   │    └──────────────────── hour (0 - 23)
                │   └───────────────────────── min (0 - 59)
                └─────────────────────────      seconds             
             */
            new JobSchedule().Setup<SalesPredictionRequestJob>(m_scheduler, "* * * * * ?");
            new JobSchedule().Setup<SalesPredictionReceiveJob>(m_scheduler, "* * * * * ?");

            //var job = JobBuilder
            //               .Create<SalesPredictionReceiveJob>()
            //               .StoreDurably(true)
            //               .WithIdentity("ReceiveAppointmentJob")
            //               .RequestRecovery()
            //               .Build();

            //ITrigger trigger = TriggerBuilder
            //                    .Create()
            //                    .WithIdentity("ReceiveAppointmentJob")
            //                    .ForJob(job)
            //                    .StartAt(DateTimeOffset.Now)
            //                    .WithSimpleSchedule(sched => sched
            //                            .WithInterval(TimeSpan.FromMilliseconds(1))
            //                            .RepeatForever()
            //                            .WithMisfireHandlingInstructionFireNow())
            //                    .Build();

            //m_scheduler.ScheduleJob(job, trigger);
        }

        public void Start()
        {
            m_scheduler.Start();
        }

        public void Stop()
        {
            m_scheduler.Shutdown(true);

        }
        public void Pause()
        {
            m_scheduler.PauseAll();
        }

        public void Continue()
        {
            m_scheduler.ResumeAll();
        }

        public void Shutdown()
        {
            m_scheduler.Shutdown(false);
        }

    }

}
