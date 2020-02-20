using Jurassic;
using FastDev.Common;
using FastDev.DevDB.AutoCode;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using FastDev.DevDB.Rights;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Threading;
using ObEx = FastDev.Common.Extensions.ObjectExtensions;
using Newtonsoft.Json.Linq;

namespace FastDev.DevDB
{
    public class ServiceBase : IService
    {
        private DeleteDelegate deleteDelegate_OnDelete;

        private DeleteDelegate deleteDelegate_OnBeforeDelete;

        private DeleteDelegate deleteDelegate_OnAfterDelete;

        private DeleteDelegate deleteDelegate_OnDeleteDetail;

        private SaveDelegate saveDelegate_OnSave;

        private SaveDelegate saveDelegate_OnBeforeSave;

        private SaveDelegate saveDelegate_OnAfterSave;

        private SaveDelegate saveDelegate_OnSaveDetail;

        private SaveDelegate saveDelegate_OnSavedDetail;

        private GetDataDelegate getDataDelegate_OnGetPagedData;

        private GetDataDelegate getDataDelegate_OnGetListData;

        private GetDataDelegate getDataDelegate_OnGetNameData;

        private AfterGetDataDelegate afterGetDataDelegate_OnAfterGetDetailData;

        private AfterGetDataDelegate afterGetDataDelegate_OnAfterGetPagedData;

        private AfterGetDataDelegate afterGetDataDelegate_OnAfterGetListData;

        private AfterGetDataDelegate afterGetDataDelegate_OnAfterGetNameData;

        private GetAPIHandler _OnGetAPIHandler;

        private WorkflowExecute workflowExecute_0;

        private object objCurrentModelData;

        private string objCurrentModelId;

        private bool _enable_right;

        protected Dictionary<string, object> _modelConfigCache;

        private static List<string> RealDeleteTable = null;

        protected string ModelName
        {
            get;
            set;
        }

        protected string ViewName
        {
            get;
            set;
        }
        private DbContext _maindb = null;
        /// <summary>
        /// core_表格所在的数据库的db
        /// </summary>
        protected DbContext MainDb
        {
            get
            {
                if (_maindb == null)
                {
                    if (!(SysContext.IsDev))
                    {
                        _maindb = SysContext.GetRunDb();
                    }
                    else
                    {
                        _maindb = SysContext.GetDevDb(SysContext.AppId);
                    }
                }
                return _maindb;
            }
            set
            {
                _maindb = value;
            }
        }
        /// <summary>
        /// 临时
        /// </summary>
        protected DbContext QueryDb
        {
            get;
            set;
        }
        public bool EnabledRights
        {
            get
            {
                return _enable_right;
            }
            set
            {
                _enable_right = value;
            }
        }

        public virtual object ServiceData
        {
            get
            {
                return null;
            }
        }

        public virtual string ServiceParm
        {
            set
            {
            }
        }

        public event DeleteDelegate OnDelete
        {
            add
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnDelete;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Combine(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnDelete, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
            remove
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnDelete;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Remove(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnDelete, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
        }

        public event DeleteDelegate OnBeforeDelete
        {
            add
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnBeforeDelete;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Combine(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnBeforeDelete, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
            remove
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnBeforeDelete;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Remove(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnBeforeDelete, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
        }

        public event DeleteDelegate OnAfterDelete
        {
            add
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnAfterDelete;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Combine(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnAfterDelete, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
            remove
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnAfterDelete;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Remove(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnAfterDelete, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
        }

        public event DeleteDelegate OnDeleteDetail
        {
            add
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnDeleteDetail;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Combine(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnDeleteDetail, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
            remove
            {
                DeleteDelegate deleteDelegate = deleteDelegate_OnDeleteDetail;
                DeleteDelegate deleteDelegate2;
                do
                {
                    deleteDelegate2 = deleteDelegate;
                    DeleteDelegate value2 = (DeleteDelegate)Delegate.Remove(deleteDelegate2, value);
                    deleteDelegate = Interlocked.CompareExchange(ref deleteDelegate_OnDeleteDetail, value2, deleteDelegate2);
                }
                while ((object)deleteDelegate != deleteDelegate2);
            }
        }

        public event SaveDelegate OnSave
        {
            add
            {
                SaveDelegate saveDelegate = saveDelegate_OnSave;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Combine(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnSave, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
            remove
            {
                SaveDelegate saveDelegate = saveDelegate_OnSave;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Remove(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnSave, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
        }

        public event SaveDelegate OnBeforeSave
        {
            add
            {
                SaveDelegate saveDelegate = saveDelegate_OnBeforeSave;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Combine(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnBeforeSave, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
            remove
            {
                SaveDelegate saveDelegate = saveDelegate_OnBeforeSave;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Remove(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnBeforeSave, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
        }

        public event SaveDelegate OnAfterSave
        {
            add
            {
                SaveDelegate saveDelegate = saveDelegate_OnAfterSave;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Combine(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnAfterSave, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
            remove
            {
                SaveDelegate saveDelegate = saveDelegate_OnAfterSave;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Remove(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnAfterSave, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
        }

        public event SaveDelegate OnSaveDetail
        {
            add
            {
                SaveDelegate saveDelegate = saveDelegate_OnSaveDetail;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Combine(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnSaveDetail, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
            remove
            {
                SaveDelegate saveDelegate = saveDelegate_OnSaveDetail;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Remove(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnSaveDetail, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
        }

        public event SaveDelegate OnSavedDetail
        {
            add
            {
                SaveDelegate saveDelegate = saveDelegate_OnSavedDetail;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Combine(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnSavedDetail, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
            remove
            {
                SaveDelegate saveDelegate = saveDelegate_OnSavedDetail;
                SaveDelegate saveDelegate2;
                do
                {
                    saveDelegate2 = saveDelegate;
                    SaveDelegate value2 = (SaveDelegate)Delegate.Remove(saveDelegate2, value);
                    saveDelegate = Interlocked.CompareExchange(ref saveDelegate_OnSavedDetail, value2, saveDelegate2);
                }
                while ((object)saveDelegate != saveDelegate2);
            }
        }

        public event GetDataDelegate OnGetPagedData
        {
            add
            {
                GetDataDelegate getDataDelegate = getDataDelegate_OnGetPagedData;
                GetDataDelegate getDataDelegate2;
                do
                {
                    getDataDelegate2 = getDataDelegate;
                    GetDataDelegate value2 = (GetDataDelegate)Delegate.Combine(getDataDelegate2, value);
                    getDataDelegate = Interlocked.CompareExchange(ref getDataDelegate_OnGetPagedData, value2, getDataDelegate2);
                }
                while ((object)getDataDelegate != getDataDelegate2);
            }
            remove
            {
                GetDataDelegate getDataDelegate = getDataDelegate_OnGetPagedData;
                GetDataDelegate getDataDelegate2;
                do
                {
                    getDataDelegate2 = getDataDelegate;
                    GetDataDelegate value2 = (GetDataDelegate)Delegate.Remove(getDataDelegate2, value);
                    getDataDelegate = Interlocked.CompareExchange(ref getDataDelegate_OnGetPagedData, value2, getDataDelegate2);
                }
                while ((object)getDataDelegate != getDataDelegate2);
            }
        }

        public event GetDataDelegate OnGetListData
        {
            add
            {
                GetDataDelegate getDataDelegate = getDataDelegate_OnGetListData;
                GetDataDelegate getDataDelegate2;
                do
                {
                    getDataDelegate2 = getDataDelegate;
                    GetDataDelegate value2 = (GetDataDelegate)Delegate.Combine(getDataDelegate2, value);
                    getDataDelegate = Interlocked.CompareExchange(ref getDataDelegate_OnGetListData, value2, getDataDelegate2);
                }
                while ((object)getDataDelegate != getDataDelegate2);
            }
            remove
            {
                GetDataDelegate getDataDelegate = getDataDelegate_OnGetListData;
                GetDataDelegate getDataDelegate2;
                do
                {
                    getDataDelegate2 = getDataDelegate;
                    GetDataDelegate value2 = (GetDataDelegate)Delegate.Remove(getDataDelegate2, value);
                    getDataDelegate = Interlocked.CompareExchange(ref getDataDelegate_OnGetListData, value2, getDataDelegate2);
                }
                while ((object)getDataDelegate != getDataDelegate2);
            }
        }

        public event GetDataDelegate OnGetNameData
        {
            add
            {
                GetDataDelegate getDataDelegate = getDataDelegate_OnGetNameData;
                GetDataDelegate getDataDelegate2;
                do
                {
                    getDataDelegate2 = getDataDelegate;
                    GetDataDelegate value2 = (GetDataDelegate)Delegate.Combine(getDataDelegate2, value);
                    getDataDelegate = Interlocked.CompareExchange(ref getDataDelegate_OnGetNameData, value2, getDataDelegate2);
                }
                while ((object)getDataDelegate != getDataDelegate2);
            }
            remove
            {
                GetDataDelegate getDataDelegate = getDataDelegate_OnGetNameData;
                GetDataDelegate getDataDelegate2;
                do
                {
                    getDataDelegate2 = getDataDelegate;
                    GetDataDelegate value2 = (GetDataDelegate)Delegate.Remove(getDataDelegate2, value);
                    getDataDelegate = Interlocked.CompareExchange(ref getDataDelegate_OnGetNameData, value2, getDataDelegate2);
                }
                while ((object)getDataDelegate != getDataDelegate2);
            }
        }

        public event AfterGetDataDelegate OnAfterGetDetailData
        {
            add
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetDetailData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Combine(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetDetailData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
            remove
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetDetailData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Remove(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetDetailData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
        }

        public event AfterGetDataDelegate OnAfterGetPagedData
        {
            add
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetPagedData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Combine(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetPagedData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
            remove
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetPagedData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Remove(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetPagedData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
        }

        public event AfterGetDataDelegate OnAfterGetListData
        {
            add
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetListData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Combine(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetListData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
            remove
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetListData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Remove(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetListData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
        }

        public event AfterGetDataDelegate OnAfterGetNameData
        {
            add
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetNameData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Combine(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetNameData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
            remove
            {
                AfterGetDataDelegate afterGetDataDelegate = afterGetDataDelegate_OnAfterGetNameData;
                AfterGetDataDelegate afterGetDataDelegate2;
                do
                {
                    afterGetDataDelegate2 = afterGetDataDelegate;
                    AfterGetDataDelegate value2 = (AfterGetDataDelegate)Delegate.Remove(afterGetDataDelegate2, value);
                    afterGetDataDelegate = Interlocked.CompareExchange(ref afterGetDataDelegate_OnAfterGetNameData, value2, afterGetDataDelegate2);
                }
                while ((object)afterGetDataDelegate != afterGetDataDelegate2);
            }
        }

        public event GetAPIHandler OnGetAPIHandler
        {
            add
            {
                GetAPIHandler getAPIHandler = _OnGetAPIHandler;
                GetAPIHandler getAPIHandler2;
                do
                {
                    getAPIHandler2 = getAPIHandler;
                    GetAPIHandler value2 = (GetAPIHandler)Delegate.Combine(getAPIHandler2, value);
                    getAPIHandler = Interlocked.CompareExchange(ref _OnGetAPIHandler, value2, getAPIHandler2);
                }
                while ((object)getAPIHandler != getAPIHandler2);
            }
            remove
            {
                GetAPIHandler getAPIHandler = _OnGetAPIHandler;
                GetAPIHandler getAPIHandler2;
                do
                {
                    getAPIHandler2 = getAPIHandler;
                    GetAPIHandler value2 = (GetAPIHandler)Delegate.Remove(getAPIHandler2, value);
                    getAPIHandler = Interlocked.CompareExchange(ref _OnGetAPIHandler, value2, getAPIHandler2);
                }
                while ((object)getAPIHandler != getAPIHandler2);
            }
        }

        public event WorkflowExecute OnWorkflowExecute
        {
            add
            {
                WorkflowExecute workflowExecute = workflowExecute_0;
                WorkflowExecute workflowExecute2;
                do
                {
                    workflowExecute2 = workflowExecute;
                    WorkflowExecute value2 = (WorkflowExecute)Delegate.Combine(workflowExecute2, value);
                    workflowExecute = Interlocked.CompareExchange(ref workflowExecute_0, value2, workflowExecute2);
                }
                while ((object)workflowExecute != workflowExecute2);
            }
            remove
            {
                WorkflowExecute workflowExecute = workflowExecute_0;
                WorkflowExecute workflowExecute2;
                do
                {
                    workflowExecute2 = workflowExecute;
                    WorkflowExecute value2 = (WorkflowExecute)Delegate.Remove(workflowExecute2, value);
                    workflowExecute = Interlocked.CompareExchange(ref workflowExecute_0, value2, workflowExecute2);
                }
                while ((object)workflowExecute != workflowExecute2);
            }
        }

        public virtual void Init(string model)
        {
            ModelName = model;
            QueryDb = GetConfigDB();
        }

        private DbContext GetConfigDB()
        {
            return GetConfigDB(ModelName);
        }
        private DbContext GetConfigDB(string refModelName)
        {
            if (refModelName == ModelName) return MainDb;
            ServiceConfig serviceConfig = GetServiceConfig(refModelName);
            if (serviceConfig != null && !string.IsNullOrEmpty(serviceConfig.model.dbName))
            {
                //根据数据库连接名称，查询数据，获取连接字符串，生成链接
                return SysContext.GetOtherDB(serviceConfig.model.dbName);
            }
            return MainDb;
        }
        public void SetDb(DbContext db)
        {
            QueryDb = db;
        }

        protected virtual ServiceConfig GetServiceConfig(string model)
        {
            if (string.IsNullOrEmpty(model))
            {
                return null;
            }
            if (!_modelConfigCache.ContainsKey(model) || _modelConfigCache[model] == null)
            {
                _modelConfigCache[model] = ServiceHelper.GetServiceConfig(model);
            }
            return _modelConfigCache[model] as ServiceConfig;
        }

        public virtual void ExecuteWorkflow(WorkflowExecuteParm data)
        {
            workflowExecute_0?.Invoke(data);
        }

        public virtual object Create(object postdata)
        {
            ServiceHelper.Log("【新增】" + ModelName, "");
            return CreateUpdateData(postdata, true);
        }

        public virtual object Update(object postdata)
        {
            ServiceHelper.Log("【更新】" + ModelName, "");
            return CreateUpdateData(postdata, false);
        }

        public virtual object SaveList(object postdata)
        {
            DbContext db = QueryDb;
            saveDelegate_OnSave?.Invoke(null, postdata, false);
            IList lstAdd = DataHelper.GetPropertyValue(postdata.GetType(), postdata, "add") as IList;
            IList lstUpdate = DataHelper.GetPropertyValue(postdata.GetType(), postdata, "update") as IList;
            IList lstDel = DataHelper.GetPropertyValue(postdata.GetType(), postdata, "del") as IList;
            ServiceConfig serviceConfig = GetServiceConfig(ModelName);
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            List<object> list4 = new List<object>();
            List<object> list5 = new List<object>();
            List<object> list6 = new List<object>();
            db.BeginTransaction();
            if (lstAdd != null)
            {
                foreach (object item in lstAdd)
                {
                    list4.Add(PrepareModel(db, ModelName, true, item));
                }
            }
            if (lstUpdate != null)
            {
                foreach (object item2 in lstUpdate)
                {
                    list5.Add(PrepareModel(db, ModelName, false, item2));
                }
            }
            if (lstDel != null)
            {
                foreach (object item3 in lstDel)
                {
                    list6.Add(DataHelper.GetPropertyValue(item3.GetType(), item3, serviceConfig.PKName));
                }
                if (list6.Any())
                {
                    DeleteModelFormula(db, ModelName, list6.ToArray());
                }
            }
            dictionary["add"] = list4;
            dictionary["update"] = list5;
            dictionary["del"] = list6;
            saveDelegate_OnBeforeSave?.Invoke(objCurrentModelData, postdata, false);
            db.CompleteTransaction();
            saveDelegate_OnAfterSave?.Invoke(objCurrentModelData, postdata, false);
            return dictionary;
        }
        /// <summary>
        /// 用汉字命令来比较两个数字的大小
        /// </summary>
        /// <param name="strCmd"></param>
        /// <param name="iOne"></param>
        /// <param name="iTow"></param>
        /// <returns></returns>
        private bool ValueCompare(string strCmd, int iOne, int iTow)
        {
            if (strCmd == "大于等于")
            {
                return iTow >= iOne;
            }
            if (strCmd == "大于")
            {
                return iTow > iOne;
            }
            if (strCmd == "等于")
            {
                return iTow == iOne;
            }
            if (strCmd == "小于等于")
            {
                return iTow <= iOne;
            }
            if (strCmd == "小于")
            {
                return iTow < iOne;
            }
            return false;
        }

        public List<core_formula> GetActions(string sql, params object[] args)
        {
            try
            {
                DbContext dbContext = GetConfigDB();
                return dbContext.Fetch<core_formula>("where model = @0 and (type = 'C1' or type = 'D1') and (isStop is null or isStop = 0)", new object[1]
                {
                    ModelName
                });
            }
            catch
            {
                return new List<core_formula>();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objData"></param>
        /// <param name="isAdd">是否是新增</param>
        /// <returns></returns>
        private object CreateUpdateData(object objData, bool isAdd)
        {
            //IL_013c: Unknown result type (might be due to invalid IL or missing references)
            object obj = null;
            DbContext dbContext = GetConfigDB();
            try
            {

                List<core_formula> actions = GetActions("where model = @0 and (type = 'C1' or type = 'D1') and (isStop is null or isStop = 0)", ModelName);
                Dictionary<string, object> dics = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(JsonHelper.SerializeObject(objData));
                foreach (core_formula item in actions)
                {
                    if (item.type == "C1")
                    {
                        Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(item.content);
                        if ((isAdd && ObEx.ToStr(dictionary["enabledCondtion"]).Contains("新增")) || (!isAdd && ObEx.ToStr(dictionary["enabledCondtion"]).Contains("修改")))
                        {
                            int int_ = ExecuteContentSql(dbContext, dics, ObEx.ToStr(dictionary["sql"]), true);
                            if (ValueCompare(ObEx.ToStr(dictionary["op"]), ObEx.ToInt(dictionary["value"]), int_))
                            {
                                throw new UserException(ObEx.ToStr(dictionary["message"]));
                            }
                        }
                    }
                }
                saveDelegate_OnSave?.Invoke(null, objData, isAdd);
                dbContext.BeginTransaction();
                obj = PrepareModel(dbContext, ModelName, isAdd, objData);
                dics = DataAccessHelper.GetDetailData(dbContext, ModelName, objCurrentModelId);
                foreach (core_formula item2 in actions)
                {
                    if (item2.type == "D1")
                    {
                        Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(item2.content);
                        if ((isAdd && ObEx.ToStr(dictionary["enabledCondtion"]).Contains("新增")) || (!isAdd && ObEx.ToStr(dictionary["enabledCondtion"]).Contains("修改")))
                        {
                            int int_ = ExecuteContentSql(dbContext, dics, ObEx.ToStr(dictionary["sqlCondition"]), true);
                            if (ValueCompare(ObEx.ToStr(dictionary["op"]), ObEx.ToInt(dictionary["value"]), int_))
                            {
                                ExecuteContentSql(dbContext, dics, ObEx.ToStr(dictionary["sql"]), false);
                            }
                        }
                    }
                }
                saveDelegate_OnBeforeSave?.Invoke(objCurrentModelData, objData, isAdd);
                dbContext.CompleteTransaction();
                saveDelegate_OnAfterSave?.Invoke(objCurrentModelData, objData, isAdd);
            }
            catch (Exception ex)
            {
                try
                {
                    dbContext.AbortTransaction();
                }
                catch
                {
                }
                throw ex;
            }
            return obj;
        }

        public virtual object Delete(object[] args)
        {
            object obj = null;
            try
            {
                deleteDelegate_OnDelete?.Invoke(args);
                QueryDb.BeginTransaction();
                ServiceHelper.Log("【删除】" + ModelName, "");
                obj = DeleteModelFormula(QueryDb, ModelName, args);
                deleteDelegate_OnBeforeDelete?.Invoke(args);
                QueryDb.CompleteTransaction();
                deleteDelegate_OnAfterDelete?.Invoke(args);
            }
            catch (Exception ex)
            {
                QueryDb.AbortTransaction();
                throw ex;
            }
            return obj;
        }

        public virtual Dictionary<string, object> GetDetailData(string id, FilterGroup filter, bool loadOne2many = true)
        {
            if (string.IsNullOrEmpty(id) && filter != null)
            {
                List<Dictionary<string, object>> listData = GetListData(filter, "");
                if (listData != null && listData.Any())
                {
                    return listData[0];
                }
            }
            Dictionary<string, object> viewData = GetViewData(QueryDb, ModelName, id, null, loadOne2many);
            afterGetDataDelegate_OnAfterGetDetailData?.Invoke(id, viewData);
            return viewData;
        }

        public FilterGroup PrevFilter(FilterGroup filter,string modelName)
        {
            try
            {
                if (!GetIsLogicDelete(modelName))
                {
                    return filter;
                }
                if (filter == null)
                {
                    filter = new FilterGroup();
                }
                FilterGroup filterGroup = new FilterGroup();
                filterGroup.op = "or";
                filterGroup.rules = new List<FilterRule>
                {
                    new FilterRule("status", null, "isnull"),
                    new FilterRule("status", RecordStatus.Deleted, "notequal")
                };
                FilterGroup item = filterGroup;
                FilterGroup filterGroup2 = new FilterGroup();
                filterGroup2.op = "and";
                filterGroup2.groups = new List<FilterGroup>
                {
                    filter,
                    item
                };
                return filterGroup2;
            }
            catch
            {
                return filter;
            }
        }

        public virtual object GetPageData(QueryDescriptor descriptor)
        {
            DbContext db = QueryDb;
            getDataDelegate_OnGetPagedData?.Invoke(descriptor.Condition);
            if (EnabledRights)
            {
                descriptor.Condition = new RightsServer(MainDb).AppendDataFilter(ModelName, descriptor.Condition);
            }
            descriptor.Condition = PrevFilter(descriptor.Condition,ModelName);
            PagedData pageData = DataAccessHelper.GetPageData(QueryDb, ModelName, descriptor);
            if (pageData == null || pageData.Records == null || pageData.Records.Count == 0)
            {
                return pageData;
            }
            ServiceConfig serviceConfig = GetServiceConfig(ModelName);
            List<Field> field = serviceConfig.fields;
            List<string> lstDisable = new List<string>();
            if (EnabledRights)
            {
                lstDisable = new RightsServer(MainDb).GetDisabledFields(ModelName);
            }
            pageData.Records = GetRelatedListData(db, pageData.Records, ModelName, serviceConfig, lstDisable, true);
            afterGetDataDelegate_OnAfterGetPagedData?.Invoke(descriptor.Condition, pageData);
            return pageData;
        }

        public virtual object GetTreeData(FilterTree filterTree)
        {
            DbContext db = QueryDb;
            if (EnabledRights)
            {
                filterTree.filter = new RightsServer(MainDb).AppendDataFilter(filterTree.sourceModel, filterTree.filter);
                filterTree.filter = PrevFilter(filterTree.filter, filterTree.sourceModel);
                filterTree.filter2 = new RightsServer(MainDb).AppendDataFilter(filterTree.sourceModel2, filterTree.filter2);
                filterTree.filter2 = PrevFilter(filterTree.filter2,filterTree.sourceModel2);
            }
            return DataAccessHelper.GetTreeData(db, filterTree);
        }

        public virtual FilterGroup GetTreeCondition(Dictionary<string, object> treeNode)
        {
            return null;
        }

        public virtual List<Dictionary<string, object>> GetListData(FilterGroup filter)
        {
            return GetListData(filter, "");
        }

        public virtual List<Dictionary<string, object>> GetListData(FilterGroup filter, string orderby)
        {
            DbContext db = QueryDb;
            getDataDelegate_OnGetListData?.Invoke(filter);
            if (EnabledRights)
            {
                filter = new RightsServer(MainDb).AppendDataFilter(ModelName, filter);
            }
            filter = PrevFilter(filter,ModelName);
            IList listData = DataAccessHelper.GetListData(QueryDb, ModelName, filter, orderby);
            if (listData == null || listData.Count == 0)
            {
                return new List<Dictionary<string, object>>();
            }
            ServiceConfig serviceConfig = GetServiceConfig(ModelName);
            List<Field> field = serviceConfig.fields;
            List<string> lstFileds = new List<string>();
            if (EnabledRights)
            {
                lstFileds = new RightsServer(MainDb).GetDisabledFields(ModelName);
            }
            List<Dictionary<string, object>> result = GetRelatedListData(db, listData, ModelName, serviceConfig, lstFileds);
            afterGetDataDelegate_OnAfterGetListData?.Invoke(filter, listData);
            return result;
        }

        public virtual object GetNameData(FilterGroup filter)
        {
            getDataDelegate_OnGetNameData?.Invoke(filter);
            DbContext db = QueryDb;
            if (EnabledRights)
            {
                filter = new RightsServer(MainDb).AppendDataFilter(ModelName, filter);
            }
            filter = PrevFilter(filter,ModelName);
            IList listData = DataAccessHelper.GetListData(QueryDb, ModelName, filter, null, "Name");
            afterGetDataDelegate_OnAfterGetNameData?.Invoke(filter, listData);
            return listData;
        }

        public virtual Dictionary<string, object> GetViewContext(string viewname, string context)
        {
            return null;
        }


        private void InitRealDeleteTable()
        {
            if (RealDeleteTable == null)
            {
                RealDeleteTable = new List<string>();
                string delModel = MainDb.ExecuteScalar<string>("select SettingValue from core_setting where SettingKey = @0", new object[1]
              {
                    "DataDeleteMode"
              }).ToLower();
                RealDeleteTable.Add(delModel);

                string noSys = MainDb.ExecuteScalar<string>("select SettingValue from core_setting where SettingKey = @0", new object[1]
              {
                    "NoSysTable"
              }).ToLower();
                string[] tabs = noSys.Split(new char[] { ',', '，' });
                RealDeleteTable.AddRange(tabs);
            }
        }
        /// <summary>
        /// 获取是否含有系统字段，如果没有在 core_setting NoSysTable配置的都默认含有 系统字段 运行假删除
        /// </summary>
        /// <param name="modelName"></param>
        /// <returns></returns>
        private bool GetIsLogicDelete(string modelName)
        {
            try
            {
                if (RealDeleteTable == null)
                {
                    InitRealDeleteTable();
                }
                if (RealDeleteTable.Contains(modelName.ToLower())) return false;//不含有系统字段的，默认不允许逻辑删除

                if (RealDeleteTable[0] == "flag")
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        private int DeleteModelFormula(DbContext dbContext, string modelName, object[] object_1)
        {
            int num = 0;
            if (object_1 != null && object_1.Any())
            {
                List<core_formula> actions = GetActions("where model = @0 and (type = 'C1' or type = 'D1')  and (isStop is null or isStop = 0)", modelName);

                ServiceConfig serviceConfig = GetServiceConfig(modelName);
                if (EnabledRights)
                {
                    RightsServer rightsServer = new RightsServer(dbContext);
                    if (!rightsServer.CheckFun(modelName, "enabledDel"))
                    {
                        throw new UserException("没有权限！");
                    }
                }
                Type entityType = DataAccessHelper.GetEntityType(modelName);
                IDbContextHelper helper = dbContext.GetHelper(entityType);
                FilterTranslator filterTranslator = new FilterTranslator();
                filterTranslator.Group = new FilterGroup();
                foreach (object obj in object_1)
                {
                    filterTranslator.Group.rules.Add(new FilterRule
                    {
                        field = serviceConfig.PKName,
                        op = "equal",
                        value = obj
                    });
                    Dictionary<string, object> detailData = DataAccessHelper.GetDetailData(dbContext, modelName, ObEx.ToStr(obj));
                    foreach (core_formula item in actions)
                    {
                        if (item.type == "C1" || item.type == "D1")
                        {
                            Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(item.content);
                            if (ObEx.ToStr(dictionary["enabledCondtion"]).Contains("删除"))
                            {
                                int int_ = ExecuteContentSql(dbContext, detailData, ObEx.ToStr(dictionary["sql"]), (item.type == "C1") ? true : false);
                                if (item.type == "C1" && ValueCompare(ObEx.ToStr(dictionary["op"]), ObEx.ToInt(dictionary["value"]), int_))
                                {
                                    throw new UserException(ObEx.ToStr(dictionary["message"]));
                                }
                            }
                        }
                    }
                    if (GetIsLogicDelete(modelName))
                    {
                        num += dbContext.Execute("update " + modelName + " set status = @0 , modifydate = @1 , ModifyUserID = @2 where ID = @3", new object[4]
                        {
                            RecordStatus.Deleted,
                            DateTime.Now,
                            SysContext.CurrentUserID,
                            obj
                        });
                    }
                    DataAccessHelper.ClearModelEntityText(dbContext, modelName, ObEx.ToStr(obj));
                }
                filterTranslator.Group.op = "or";
                filterTranslator.Translate();
                if (!GetIsLogicDelete(modelName))
                {
                    num += helper.Delete("where " + filterTranslator.CommandText, filterTranslator.Parms.ToArray());
                    List<Field> fields = serviceConfig.fields;
                    foreach (Field item2 in fields)
                    {
                        if (item2.type == "many2many")
                        {
                            string dbName = item2.dbName;
                            string arg = modelName.Replace("_", "") + "ID";
                            Type entityType2 = DataAccessHelper.GetEntityType(dbName);
                            IDbContextHelper helper2 = dbContext.GetHelper(entityType2);
                            foreach (object obj in object_1)
                            {
                                num += helper2.Delete(string.Format("where {0} = @0", arg), obj);
                            }
                        }
                        else if (item2.type == "one2many")
                        {
                            string relationModel = item2.relationModel;
                            string relationField = item2.relationField;
                            Type entityType3 = DataAccessHelper.GetEntityType(relationModel);
                            IDbContextHelper helper3 = dbContext.GetHelper(entityType3);
                            foreach (object obj in object_1)
                            {
                                num += helper3.Delete(string.Format("where {0} = @0", relationField), obj);
                            }
                        }
                    }
                }
            }
            return num;
        }
        /// <summary>
        /// 执行文件中的sql
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="dics"></param>
        /// <param name="strContent"></param>
        /// <param name="isGetValue">是否有指定的查询值 true ExecuteScalar false Execute</param>
        /// <returns></returns>
        private int ExecuteContentSql(DbContext dbContext, Dictionary<string, object> dics, string strContent, bool isGetValue)
        {
            try
            {
                Regex regex = new Regex("#(.*?)#");
                int num = 0;
                List<object> list = new List<object>();
                MatchCollection matchCollection = regex.Matches(strContent);
                for (int num2 = matchCollection.Count - 1; num2 >= 0; num2--)
                {
                    Match match = matchCollection[num2];
                    string value = match.Groups[1].Value;
                    string item = DoJsFunction(dics, value);
                    string str = "@" + num;
                    list.Add(item);
                    num++;
                    strContent = strContent.Substring(0, match.Index) + str + strContent.Substring(match.Index + match.Value.Length);
                }
                if (isGetValue)
                {
                    return dbContext.ExecuteScalar<int>(strContent, list.ToArray());
                }
                return dbContext.Execute(strContent, list.ToArray());
            }
            catch
            {
                return 0;
            }
        }

        private string DoJsFunction(Dictionary<string, object> dics, string uiType)
        {
            if (uiType == "GUID")
            {
                return ObEx.ToStr((object)Guid.NewGuid());
            }

            ScriptEngine scriptEngine = new ScriptEngine();
            string code = "\r\n                function getResult()\r\n                { \r\n                    var data = #data#;\r\n                    return #exp#;\r\n                }\r\n            ".Replace("#data#", JsonHelper.SerializeObject(dics)).Replace("#exp#", uiType);
            scriptEngine.Execute(code);
            return scriptEngine.CallGlobalFunction<string>("getResult", new object[0]);
        }
        /// <summary>
        /// 在执行查找 对model做准备
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="modelName"></param>
        /// <param name="isAdd"></param>
        /// <param name="objData"></param>
        /// <param name="isUseDefault"></param>
        /// <returns></returns>
        private object PrepareModel(DbContext dbContext, string modelName, bool isAdd, object objData, bool isUseDefault = true)
        {
            Type entityType = DataAccessHelper.GetEntityType(modelName);
            ServiceConfig modelConfig = GetServiceConfig(modelName);

            List<string> igFields = new List<string>();
            object obj = FillDefaultValue(dbContext, modelName, isAdd, objData, ref igFields);
            object propertyValue = DataHelper.GetPropertyValue(entityType, obj, modelConfig.PKName);
            if (isUseDefault)
            {
                objCurrentModelId = ObEx.ToStr(propertyValue);
                objCurrentModelData = obj;
            }
            List<Field> fields = modelConfig.fields;
            List<Field> list = fields.Where(f => f.type == "one2many").ToList();
            List<Field> list2 = fields.Where(f => f.type == "many2many").ToList();
            List<core_formula> actions = GetActions("where model = @0 and (type = 'E1')  and (isStop is null or isStop = 0)", ModelName);
            foreach (Field item in list2)
            {
                object propertyValue2 = DataHelper.GetPropertyValue(objData.GetType(), objData, item.name);
                IList<IList<string>> list3 = propertyValue2 as IList<IList<string>>;
                if (list3 != null && list3.Any())
                {
                    string dbName = item.dbName;
                    string text = modelName.Replace("_", "") + "ID";
                    string text2 = item.relationModel.Replace("_", "") + "ID";
                    Type entityType2 = DataAccessHelper.GetEntityType(dbName);
                    IDbContextHelper helper = dbContext.GetHelper(entityType2);
                    if (!isAdd)
                    {
                        helper.Delete(string.Format("where {0} = @0", text), propertyValue);
                    }
                    foreach (IList<string> item2 in list3)
                    {
                        if (!string.IsNullOrEmpty(item2[0]))
                        {
                            object obj2 = entityType2.Assembly.CreateInstance(entityType2.FullName);
                            DataHelper.SetPropertyValue(entityType2, obj2, "ID", (object)Guid.NewGuid().ToString());
                            DataHelper.SetPropertyValue(entityType2, obj2, text, propertyValue);
                            DataHelper.SetPropertyValue(entityType2, obj2, text2, (object)item2[0]);
                            dbContext.Insert(obj2);
                        }
                    }
                }
            }
            foreach (Field item3 in list)
            {
                string relationModel = item3.relationModel;
                string refModeField = item3.relationField;
                Type entityType3 = DataAccessHelper.GetEntityType(relationModel);
                IDbContextHelper helper2 = dbContext.GetHelper(entityType3);
                ServiceConfig serviceConfig = GetServiceConfig(relationModel);
                object propertyValue2 = DataHelper.GetPropertyValue(objData.GetType(), objData, item3.name);
                ICollection collection = propertyValue2 as ICollection;
                if (collection != null)
                {
                    new List<string>();
                    FilterTranslator filterTranslator = new FilterTranslator();
                    filterTranslator.Group = new FilterGroup();
                    filterTranslator.Group.op = "or";
                    foreach (object item4 in collection)
                    {
                        Type type = item4.GetType();
                        object propertyValue3 = DataHelper.GetPropertyValue(type, item4, modelConfig.PKName);
                        object propertyValue4 = DataHelper.GetPropertyValue(type, item4, "Status");
                        bool flag;
                        if (ObEx.ToStr(propertyValue4) == "deleted" && propertyValue3 != null && !string.IsNullOrEmpty(ObEx.ToStr(propertyValue3)))
                        {
                            filterTranslator.Group.rules.Add(new FilterRule
                            {
                                field = serviceConfig.PKName,
                                value = propertyValue3,
                                op = "equal"
                            });
                            Dictionary<string, object> detailData = DataAccessHelper.GetDetailData(dbContext, relationModel, ObEx.ToStr(propertyValue3));
                            foreach (core_formula item5 in actions)
                            {
                                Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(item5.content);
                                if (ObEx.ToStr(dictionary["enabledCondtion"]).Contains("删除") && ObEx.ToStr(dictionary["detailField"]) == item3.name)
                                {
                                    int int_ = ExecuteContentSql(dbContext, detailData, ObEx.ToStr(dictionary["sqlCondition"]), true);
                                    if (ValueCompare(ObEx.ToStr(dictionary["op"]), ObEx.ToInt(dictionary["value"]), int_))
                                    {
                                        ExecuteContentSql(dbContext, detailData, ObEx.ToStr(dictionary["sql"]), false);
                                    }
                                }
                            }
                        }
                        else if (!(ObEx.ToStr(propertyValue4) == "deleted") && ((flag = (isAdd || propertyValue3 == null || string.IsNullOrEmpty(propertyValue3.ToString()))) || dbContext.ExecuteScalar<int>(string.Format("select count(*) from {0} where " + serviceConfig.PKName + " = @0", relationModel), new object[1]
                        {
                            propertyValue3
                        }) != 0))
                        {
                            ServiceConfig serviceConfig2 = GetServiceConfig(relationModel);
                            Field field = (from a in serviceConfig2.fields
                                           where a.dbName == refModeField
                                           select a).FirstOrDefault();
                            DataHelper.SetPropertyValue(type, item4, field.dbName, propertyValue);
                            object obj3 = PrepareModel(dbContext, relationModel, flag, item4, false);
                            Dictionary<string, object> detailData2 = DataAccessHelper.GetDetailData(dbContext, relationModel, ObEx.ToStr(obj3));
                            foreach (core_formula item6 in actions)
                            {
                                Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(item6.content);
                                if (ObEx.ToStr(dictionary["enabledCondtion"]).Contains(flag ? "新增" : "修改") && ObEx.ToStr(dictionary["detailField"]) == item3.name)
                                {
                                    int int_ = ExecuteContentSql(dbContext, detailData2, ObEx.ToStr(dictionary["sqlCondition"]), true);
                                    if (ValueCompare(ObEx.ToStr(dictionary["op"]), ObEx.ToInt(dictionary["value"]), int_))
                                    {
                                        ExecuteContentSql(dbContext, detailData2, ObEx.ToStr(dictionary["sql"]), false);
                                    }
                                }
                            }
                        }
                    }
                    if (filterTranslator.Group.rules.Any() && !isAdd)
                    {
                        filterTranslator.Translate();
                        List<string> list4 = dbContext.Fetch<string>(string.Format("select " + serviceConfig.PKName + " from {0} where {1}", relationModel, filterTranslator.CommandText), filterTranslator.Parms.ToArray());
                        helper2.Delete(string.Format("where {0}", filterTranslator.CommandText), filterTranslator.Parms.ToArray());
                        if (deleteDelegate_OnDeleteDetail != null && list4.Any())
                        {
                            deleteDelegate_OnDeleteDetail(list4.ToArray());
                        }
                    }
                }
            }
            if (!isUseDefault && saveDelegate_OnSaveDetail != null)
            {
                saveDelegate_OnSaveDetail(obj, objData, isAdd);
            }
            if (isAdd)
            {
                object obj4 = dbContext.Insert(modelName, modelConfig.PKName, modelConfig.IsAutoIncrementPk, obj);
                if (modelConfig.IsAutoIncrementPk)
                {
                    objCurrentModelId = ObEx.ToStr(obj4);
                }
            }
            else
            {
                List<string> list5 = (from a in fields
                                      where a.type != null && !a.type.EndsWith("2many") && !igFields.Contains(a.dbName)
                                      select a).Select(f => f.dbName).ToList();
                if (modelConfig.model.notIncludeSysFields != "Y")
                {
                    list5.AddRange(new string[2]
                    {
                        "ModifyDate",
                        "ModifyUserID"
                    });
                }
                if (modelConfig.IsAutoIncrementPk && list5.Any((string a) => a == modelConfig.PKName))
                {
                    list5.Remove(modelConfig.PKName);
                }
                if (!list5.Any())
                {
                    return propertyValue;
                }
                if (modelConfig.IsAutoIncrementPk)
                {
                    dbContext.Update(modelName, modelConfig.PKName, obj, DataHelper.GetPropertyValue(obj.GetType(), obj, modelConfig.PKName), (IEnumerable<string>)list5);
                }
                else
                {
                    dbContext.Update(modelName, modelConfig.PKName, obj, (IEnumerable<string>)list5);
                }
                DataAccessHelper.ClearModelEntityText(dbContext, modelName, ObEx.ToStr(propertyValue));
            }
            if (!isUseDefault && saveDelegate_OnSavedDetail != null)
            {
                saveDelegate_OnSavedDetail(obj, objData, isAdd);
            }
            return propertyValue;
        }

        private object FillDefaultValue(DbContext db, string modelName, bool isAdd, object objData, ref List<string> lstFileds)
        {
            Type entityType = DataAccessHelper.GetEntityType(modelName);
            Type type = objData.GetType();
            object obj = null;
            object obj2 = null;
            PropertyInfo[] properties = entityType.GetProperties();
            List<string> entityProNames = properties.Select(p => p.Name).ToList();
            PropertyInfo[] properties2 = type.GetProperties();
            List<string> viewProNames = properties2.Select(p => p.Name).ToList();
            Action<object, object[]> action = DataHelper.CreateSetProperties(properties);
            Func<object, object[]> func = DataHelper.CreateGetProperties(properties);
            DataHelper.CreateSetProperties(properties2);
            Func<object, object[]> func2 = DataHelper.CreateGetProperties(properties2);
            ServiceConfig serviceConfig = GetServiceConfig(modelName);
            object[] viewValues = func2(objData);
            object[] entityValues = new object[properties.Length];
            object[] array = null;
            Func<string, object> findValue = delegate (string name)
            {
                int num3 = GetItemIndex(viewProNames, name);
                if (num3 == -1)
                {
                    return null;
                }
                if (num3 >= viewValues.Length)
                {
                    return null;
                }
                return viewValues[num3];
            };
            Action<string, object> SetValue = delegate (string name, object value)
            {
                int num2 = GetItemIndex(entityProNames, name);
                if (num2 > -1 && num2 < entityValues.Length)
                {
                    entityValues[num2] = value;
                }
            };
            object obj3 = findValue(serviceConfig.PKName);
            List<string> list = new List<string>();
            if (EnabledRights)
            {
                list = new RightsServer(MainDb).GetDisabledFields(modelName);
            }
            if (obj3 == null)
            {
                isAdd = true;
            }
            string text = isAdd ? Guid.NewGuid().ToString() : obj3.ToString();
            if (isAdd)
            {
                obj = entityType.Assembly.CreateInstance(entityType.FullName);
                if (!serviceConfig.IsGuidPk && !serviceConfig.IsAutoIncrementPk)
                {
                    text = ObEx.ToStr(findValue(serviceConfig.PKName));
                }
                SetValue(serviceConfig.PKName, text);
                SetValue("CreateDate", DateTime.Now);
                SetValue("CreateUserID", SysContext.CurrentUserID);
            }
            else
            {
                obj = (obj2 = db.GetHelper(entityType).FirstOrDefault("where " + serviceConfig.PKName + " = @0", text));
                array = func(obj2);
                entityValues = func(obj);
            }
            SetValue("ModifyDate", DateTime.Now);
            SetValue("ModifyUserID", SysContext.CurrentUserID);
            object obj4 = findValue("Status");
            if (obj4 == null)
            {
                SetValue("Status", obj4);
            }
            else
            {
                SetValue("Status", RecordStatus.Active);
            }
            List<core_autoCode> source = new List<core_autoCode>();
            try
            {
                source = (isAdd ? db.Fetch<core_autoCode>("where ModelName = @0", new object[1]
                {
                    modelName
                }) : new List<core_autoCode>());
            }
            catch
            {
            }
            List<string> list2 = new List<string>();
            foreach (Field field in serviceConfig.fields)
            {
                if (!list.Contains(field.name))
                {
                    if (isAdd)
                    {
                        core_autoCode core_autoCode = source.FirstOrDefault((core_autoCode a) => a.FieldName == field.name);
                        if (core_autoCode != null)
                        {
                            string newAutoCode = new AutoCodeService(db, core_autoCode).GetNewAutoCode();
                            SetValue(field.name, newAutoCode);
                            continue;
                        }
                        if (field.type == "guid" && field.name != serviceConfig.PKName)
                        {
                            SetValue(field.name, Guid.NewGuid().ToString());
                            continue;
                        }
                    }
                    if (!(field.name == serviceConfig.PKName) && field.type != null)
                    {
                        object obj6 = findValue(field.name);
                        if (!field.type.Contains("2"))
                        {
                            SetValue(field.name, obj6);
                            if (array != null)
                            {
                                int num = GetItemIndex(entityProNames, field.name);
                                if (num > -1)
                                {
                                    object obj7 = array[num];
                                    if (ObEx.ToStr(obj6) == ObEx.ToStr(obj7))
                                    {
                                        lstFileds.Add(field.name);
                                    }
                                }
                            }
                        }
                        else if (field.type == FieldTypes.Many2one)
                        {
                            IList<string> list3 = obj6 as IList<string>;
                            if (list3 != null && list3.Any())
                            {
                                string value2 = list3[0];
                                if (string.IsNullOrEmpty(value2))
                                {
                                    SetValue(field.dbName, null);
                                    list2.Add(field.dbName);
                                }
                                else
                                {
                                    SetValue(field.dbName, list3[0]);
                                }
                            }
                            else
                            {
                                obj6 = findValue(field.dbName);
                                if (obj6 != null && obj6.GetType() == typeof(string))
                                {
                                    SetValue(field.dbName, obj6);
                                }
                            }
                        }
                    }
                }
            }
            action(obj, entityValues);
            if (list2.Any())
            {
                foreach (string item in list2)
                {
                    DataHelper.SetPropertyValue(entityType, obj, item, (object)null);
                }
            }
            return obj;
        }

        private int GetItemIndex(List<string> lst, string strToFind)
        {
            int i = 0;
            while (true)
            {
                if (i >= lst.Count)
                {
                    return -1;
                }
                string a = lst[i];
                if (a == strToFind)
                {
                    break;
                }
                i++;
            }
            return i;
        }

        protected Dictionary<string, object> GetViewData(DbContext db, string model, string id, string refField, bool loadOne2many = true)
        {
            Type entityType = DataAccessHelper.GetEntityType(model);
            PropertyInfo[] properties = entityType.GetProperties();
            List<string> entityProNames = properties.Select(p => p.Name).ToList();
            DataHelper.CreateSetProperties(properties);
            Func<object, object[]> func = DataHelper.CreateGetProperties(properties);
            ServiceConfig serviceConfig = GetServiceConfig(model);
            string text = serviceConfig.PKName;
            object obj = db.GetHelper(entityType).FirstOrDefault("where " + text + " = @0", id);
            if (obj == null)
            {
                obj = db.GetHelper(entityType).FirstOrDefault("where ID = @0", id);
                if (obj == null)
                {
                    return null;
                }
                text = "ID";
            }
            object[] entityValues = func(obj);
            Dictionary<string, object> viewData = new Dictionary<string, object>();
            Func<string, object> func2 = delegate (string name)
            {
                int num = GetItemIndex(entityProNames, name);
                if (num == -1)
                {
                    return null;
                }
                return entityValues[num];
            };
            Action<string, object> action = delegate (string name, object value)
            {
                if (name == "ViewData")
                {//ViewData 是一个json对象，需要转换一下
                    viewData[name] = JsonHelper.ToDictionary(JObject.Parse(value.ToString()));
                }
                else
                {
                    viewData[name] = value;
                }
            };
            List<Field> fields = serviceConfig.fields;
            List<string> disabledFields = new List<string>();
            if (EnabledRights)
            {
                disabledFields = new RightsServer(MainDb).GetDisabledFields(model);
            }
            fields = (from a in fields
                      where !disabledFields.Contains(a.name)
                      select a).ToList();
            action(text, id);
            if (string.IsNullOrEmpty(refField)&&serviceConfig.model.notIncludeSysFields!="Y")
            {
                try
                {
                    string text2 = ObEx.ToStr(func2("CreateUserID"));
                    string item = db.ExecuteScalar<string>("select RealName from core_user where ID = @0", new object[1]
                    {
                        text2
                    });
                    string text3 = ObEx.ToStr(func2("ModifyUserID"));
                    string item2 = db.ExecuteScalar<string>("select RealName from core_user where ID = @0", new object[1]
                    {
                        text3
                    });
                    action("CreateDate", func2("CreateDate"));
                    action("CreateUser", new List<string>
                    {
                        text2,
                        item
                    });
                    action("ModifyDate", func2("ModifyDate"));
                    action("ModifyUser", new List<string>
                    {
                        text3,
                        item2
                    });
                    action("Status", func2("Status"));
                }
                catch
                {
                }
            }
            foreach (Field item3 in fields)
            {
                if ((string.IsNullOrEmpty(refField) || !(item3.dbName == refField)) && item3.type != null)
                {
                    if (!item3.type.Contains("2"))
                    {
                        action(arg2: (!(item3.dbName != item3.name)) ? func2(item3.name) : func2(item3.dbName), arg1: item3.name);
                    }
                    else
                    {
                        if (item3.type == "many2one")
                        {
                            object obj3 = func2(item3.dbName);
                            if (obj3 == null || ObEx.ToStr(obj3) == "")
                            {
                                action(item3.name, new List<string>
                                {
                                    "",
                                    ""
                                });
                            }
                            else
                            {
                                string modeEntityText = DataAccessHelper.GetModeEntityText(db, item3.relationModel, ObEx.ToStr(obj3));
                                action(item3.name, new List<string>
                                {
                                    ObEx.ToStr(obj3),
                                    modeEntityText
                                });
                            }
                        }
                        else if (item3.type == "many2many")
                        {
                            string dbName = item3.dbName;
                            string arg2 = model.Replace("_", "") + "ID";
                            string arg3 = item3.relationModel.Replace("_", "") + "ID";
                            List<string> list = db.Fetch<string>(string.Format("select {0} from {1} where {2} = @0", arg3, dbName, arg2), new object[1]
                            {
                                id
                            });
                            List<List<string>> list2 = new List<List<string>>();
                            if (list != null && list.Any())
                            {
                                foreach (string item4 in list)
                                {
                                    string modeEntityText = DataAccessHelper.GetModeEntityText(db, item3.relationModel, item4);
                                    list2.Add(new List<string>
                                    {
                                        item4,
                                        modeEntityText
                                    });
                                }
                            }
                            action(item3.name, list2);
                        }
                        else if (item3.type == "one2many" && loadOne2many)
                        {
                            string relationModel = item3.relationModel;
                            string relationField = item3.relationField;
                            Type entityType2 = DataAccessHelper.GetEntityType(relationModel);
                            db.GetHelper(entityType2);
                            List<Dictionary<string, object>> list3 = new List<Dictionary<string, object>>();
                            FilterGroup filterGroup = new FilterGroup();
                            filterGroup.rules = new List<FilterRule>();
                            filterGroup.rules.Add(new FilterRule
                            {
                                field = relationField,
                                value = id,
                                op = "equal"
                            });
                            if (EnabledRights)
                            {
                                filterGroup = new RightsServer(MainDb).AppendDataFilter(relationModel, filterGroup);
                            }
                            FilterTranslator filterTranslator = new FilterTranslator();
                            filterTranslator.Group = filterGroup;
                            filterTranslator.Translate();
                            string commandText = filterTranslator.CommandText;
                            commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
                            commandText += " order by CreateDate asc";
                            List<string> list4 = db.Fetch<string>("select " + text + " from " + relationModel + " " + commandText, filterTranslator.Parms.ToArray());
                            if (list4 != null && list4.Any())
                            {
                                foreach (string item5 in list4)
                                {
                                    list3.Add(GetViewData(db, relationModel, item5, relationField));
                                }
                            }
                            action(item3.name, list3);
                        }
                    }
                }
            }
            return viewData;
        }

        private List<Dictionary<string, object>> GetRelatedListData(DbContext dbContext, IList pageDatas, string modelName, ServiceConfig serviceCfg, List<string> lstFileds, bool isFromPagedData = false)
        {
            List<Field> fields = serviceCfg.fields;
            if (pageDatas == null || pageDatas.Count == 0)
            {
                return new List<Dictionary<string, object>>();
            }
            Type type = pageDatas[0].GetType();
            PropertyInfo[] properties = type.GetProperties();
            List<string> recordProNames = properties.Select(p => p.Name).ToList();
            Func<object, object[]> func = DataHelper.CreateGetProperties(properties);
            List<Dictionary<string, object>> lstRev = new List<Dictionary<string, object>>();
            foreach (object item in pageDatas)
            {
                object[] recordValues = func(item);
                Func<string, object> func2 = delegate (string name)
                {
                    int num = GetItemIndex(recordProNames, name);
                    if (num == -1)
                    {
                        return null;
                    }
                    return recordValues[num];
                };
                Dictionary<string, object> dictionary = new Dictionary<string, object>();
                foreach (string item2 in recordProNames)
                {
                    if (!lstFileds.Contains(item2))
                    {
                        dictionary[item2] = func2(item2);
                    }
                }
                lstRev.Add(dictionary);
            }
            foreach (Field f in fields)
            {
                if (!lstFileds.Contains(f.name))
                {
                    if (f.type == "many2one")
                    {
                        if (isFromPagedData)
                        {
                            if (string.IsNullOrEmpty(serviceCfg.getpageddata.many2one))
                            {
                                continue;
                            }
                            if (serviceCfg.getpageddata.many2one != "*")
                            {
                                string[] source = serviceCfg.getpageddata.many2one.Split(',');
                                if (!source.Contains(f.name))
                                {
                                    continue;
                                }
                            }
                        }
                        else
                        {
                            if (string.IsNullOrEmpty(serviceCfg.getlist.many2one))
                            {
                                continue;
                            }
                            if (serviceCfg.getlist.many2one != "*")
                            {
                                string[] source = serviceCfg.getlist.many2one.Split(',');
                                if (!source.Contains(f.name))
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    else if (f.type == "many2many")
                    {
                        if (isFromPagedData)
                        {
                            if (string.IsNullOrEmpty(serviceCfg.getpageddata.many2many))
                            {
                                continue;
                            }
                            if (serviceCfg.getpageddata.many2many != "*")
                            {
                                string[] source = serviceCfg.getpageddata.many2many.Split(',');
                                if (!source.Contains(f.name))
                                {
                                    continue;
                                }
                            }
                        }
                        else
                        {
                            if (string.IsNullOrEmpty(serviceCfg.getlist.many2many))
                            {
                                continue;
                            }
                            if (serviceCfg.getlist.many2many != "*")
                            {
                                string[] source = serviceCfg.getlist.many2many.Split(',');
                                if (!source.Contains(f.name))
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    else if (f.type == "one2many")
                    {
                        if (isFromPagedData)
                        {
                            if (string.IsNullOrEmpty(serviceCfg.getpageddata.one2many))
                            {
                                continue;
                            }
                            if (serviceCfg.getpageddata.one2many != "*")
                            {
                                string[] source = serviceCfg.getpageddata.one2many.Split(',');
                                if (!source.Contains(f.name))
                                {
                                    continue;
                                }
                            }
                        }
                        else
                        {
                            if (string.IsNullOrEmpty(serviceCfg.getlist.one2many))
                            {
                                continue;
                            }
                            if (serviceCfg.getlist.one2many != "*")
                            {
                                string[] source = serviceCfg.getlist.one2many.Split(',');
                                if (!source.Contains(f.name))
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    foreach (Dictionary<string, object> itm in lstRev)
                    {
                        if (f.type == "many2one")
                        {
                            if (itm.ContainsKey(f.dbName))
                            {
                                object obj = itm[f.dbName];
                                if (obj == null || ObEx.ToStr(obj) == "")
                                {
                                    itm[f.name] = new List<string>
                                    {
                                        "",
                                        ""
                                    };
                                }
                                else
                                {
                                    DbContext relationDB = GetConfigDB(f.relationModel);
                                    string modeEntityText = DataAccessHelper.GetModeEntityText(relationDB, f.relationModel, ObEx.ToStr(obj));
                                    itm[f.name] = new List<string>
                                    {
                                        ObEx.ToStr(obj),
                                        modeEntityText
                                    };
                                }
                            }
                        }
                        else if (f.type == "many2many" && itm.ContainsKey(serviceCfg.PKName))
                        {
                            string pkValue = ObEx.ToStr(itm[serviceCfg.PKName]);
                            string dbName = f.dbName;
                            string filterField = modelName.Replace("_", "") + "ID";
                            string selField = f.relationModel.Replace("_", "") + "ID";
                            List<string> list2 = dbContext.Fetch<string>(string.Format("select {0} from {1} where {2} = @0", selField, dbName, filterField), new object[1]
                            {
                                pkValue
                            });
                            List<List<string>> list3 = new List<List<string>>();
                            if (list2 != null && list2.Any())
                            {
                                DbContext relationDB = GetConfigDB(f.relationModel);
                                foreach (string item5 in list2)
                                {
                                    string modeEntityText = DataAccessHelper.GetModeEntityText(relationDB, f.relationModel, item5);
                                    list3.Add(new List<string>
                                    {
                                        item5,
                                        modeEntityText
                                    });
                                }
                            }
                            itm[f.name] = list3;
                        }
                        else if (f.type == "one2many" && itm.ContainsKey(serviceCfg.PKName))
                        {
                            string text = ObEx.ToStr(itm[serviceCfg.PKName]);
                            string relationModel = f.relationModel;
                            string relationField = f.relationField;
                            Type entityType = DataAccessHelper.GetEntityType(relationModel);
                            dbContext.GetHelper(entityType);
                            List<Dictionary<string, object>> list4 = new List<Dictionary<string, object>>();
                            DbContext relationDB = GetConfigDB(f.relationModel);
                            List<string> list5 = relationDB.Fetch<string>(string.Format("select {0} from {1} where {2} = @0 order by CreateDate asc", "ID", relationModel, relationField), new object[1]
                            {
                                text
                            });
                            if (list5 != null && list5.Any())
                            {
                                foreach (string item6 in list5)
                                {
                                    list4.Add(GetViewData(dbContext, relationModel, item6, relationField));
                                }
                            }
                            itm[f.name] = list4;
                        }
                    }
                }
            }
            return lstRev;
        }

        public Func<APIContext, object> GetAPIHandler(string id)
        {
            if (_OnGetAPIHandler != null)
            {
                return _OnGetAPIHandler(id);
            }
            return null;
        }

        public Dictionary<string, object> GetViewContext(string viewname)
        {
            return null;
        }

        public ServiceBase()
        {

            objCurrentModelData = null;
            objCurrentModelId = null;
            _enable_right = true;//开发环境是false,真实环境是true
            _modelConfigCache = new Dictionary<string, object>();

        }








    }
}
