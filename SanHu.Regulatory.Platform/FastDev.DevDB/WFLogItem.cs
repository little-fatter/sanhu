using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.DevDB
{

    public class WFLogItem
    {

        public string taskId
        {
            get;
            set;
        }

        public string taskTitle
        {
            get;
            set;
        }

        public string taskType
        {
            get;
            set;
        }

        public string handlerType
        {
            get;
            set;
        }

        public List<Dictionary<string, object>> items
        {
            get;
            set;
        }

        public WFLogItem()
        {


        }
    }
}
