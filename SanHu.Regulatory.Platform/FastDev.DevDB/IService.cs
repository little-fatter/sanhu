using System;
using System.Collections.Generic;

namespace FastDev.DevDB
{
    public interface IService
    {
        object ServiceData
        {
            get;
        }

        string ServiceParm
        {
            set;
        }

        bool EnabledRights
        {
            get;
            set;
        }

        void Init(string model);

        void SetDb(DbContext db);

        object Create(object postdata);


        object Update(object postdata);

        object SaveList(object postdata);

        object Delete(object[] ids);

        Dictionary<string, object> GetDetailData(string id, FilterGroup filter, bool loadOne2many = true);

        object GetPageData(QueryDescriptor descriptor);

        object GetTreeData(FilterTree filterTree);

        FilterGroup GetTreeCondition(Dictionary<string, object> treeNode);

        List<Dictionary<string, object>> GetListData(FilterGroup filter);

        List<Dictionary<string, object>> GetListData(FilterGroup filter, string orderby);

        void ExecuteWorkflow(WorkflowExecuteParm data);

        object GetNameData(FilterGroup filter);

        Func<APIContext, object> GetAPIHandler(string id);

        Dictionary<string, object> GetViewContext(string viewname, string context);
    }
}
