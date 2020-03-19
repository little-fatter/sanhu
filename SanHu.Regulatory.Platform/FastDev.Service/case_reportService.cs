using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.IServices;
using FastDev.Model.Entity;
using FD.Model.Dto;
using FD.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    public class case_reportService : ServiceBase, IService
    {
        public case_reportService()
        {
            OnGetAPIHandler += case_reportService_OnGetAPIHandler;
        }

        private SHBaseService _sHBaseService;
        private Func<APIContext, object> case_reportService_OnGetAPIHandler(string id)
        {
            _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
            switch (id)
            {
                case "ChangeState":
                    return UpdateStatus;
                case "FINISH":
                    return Handle;
                default:
                    return Handle;
            }
        }
        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<case_reportFinishReq>(context.Data);
            if (data.CaseReport == null) throw new Exception("没有主体数据");
            data.CaseReport.TaskId = data.SourceTaskId;
            data.CaseReport.EventInfoId = data.EventInfoId;
            QueryDb.BeginTransaction();
            try
            {
                #region 发起钉钉的审批 并将其返回的ID写入Task内
                if (data.oapiProcessinstanceCreateRequest != null)
                {
                    //填值
                    var UsrService = SysContext.GetService<IUserServices>();
                    var loginClientInfo = SysContext.GetService<WanJiang.Framework.Infrastructure.Logging.ClientInfo>();

                    //ServiceConfig userServiceConfig = ServiceHelper.GetServiceConfig("user");
                    //var OTDB = SysContext.GetOtherDB(userServiceConfig.model.dbName);
                    //var deptId = OTDB.FirstOrDefault<long>(@"SELECT org.id FROM organization org 
                    //                        inner join organizationuser ou on ou.OrganizationId = org.Id
                    //                        inner join user usr on usr.Id = ou.UserId
                    //                        where usr.AccountId = @0", loginClientInfo.AccountId);
                    ////
                    //if (deptId == null)
                    //    throw new Exception("无组织部门");

                    var usrDetail = UsrService.GetUserDetails(loginClientInfo.UserId);
                    var ddService = SysContext.GetService<IDingDingServices>();
                    if (usrDetail.Result.Organizations == null || usrDetail.Result.Organizations.Count <= 0)
                        throw new Exception("无组织部门");
                    var deptId = usrDetail.Result.Organizations[0].Id;

                    data.oapiProcessinstanceCreateRequest.DeptId = deptId;
                    data.oapiProcessinstanceCreateRequest.OriginatorUserId = loginClientInfo.AccountId;

                    var result = ddService.ProcessInstaceCreateAsync(data.oapiProcessinstanceCreateRequest);
                    var test = result.Result;
                    if (result.Result.Errcode != 0)
                        throw new Exception("发起审核流失败" + result.Result.ErrMsg);

                    data.CaseReport.ProcessInstanceId = result.Result.ProcessInstanceId;
                    //更新该Report上的信息
                    //var targetId = result.Result.ProcessInstanceId;
                    //if (data.CaseReport.TaskId == null || data.CaseReport.TaskId == "")
                    //    throw new Exception("Task为空");
                    //var taskObj = QueryDb.FirstOrDefault<work_task>("where TaskID =@0", data.CaseReport.TaskId);
                    //if (taskObj == null)
                    //    throw new Exception("该Task不存在");
                    ////更新值
                    //taskObj.processInstanceId = result.Result.ProcessInstanceId;
                    //data.CaseReport.FormState = "待审批";
                    ////data.CaseReport.
                    //QueryDb.Update(taskObj);
                    //ServiceHelper.GetService("work_task").Update(taskObj);
                }
                #endregion
                CreateInfo(data.CaseReport);
                if (!string.IsNullOrEmpty(data.CaseReport.CaseId))
                {
                    var caseinfo = QueryDb.FirstOrDefault<case_Info>("select * from case_Info where Id=@0", data.CaseReport.CaseId);
                    if (caseinfo == null)
                        throw new Exception("没有案件信息");
                    caseinfo.CaseStatus = "完成处罚";
                    QueryDb.Update(caseinfo);
                }
                else
                {
                    throw new Exception("没有案件信息");
                }
                _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
                _sHBaseService.UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.Close);//关闭任务

                //打印预生成
                var PDFSerivce = ServiceHelper.GetService("form_printPDFService") as form_printPDFService;
                PDFSerivce.AsposeToPdf(new APIContext() { Data = @"{""formId"":""" + data.CaseReport.ID + @""",""formType"":""case_report""}" });
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw e;
            }
            QueryDb.CompleteTransaction();
            return true;
        }

        /// <summary>
        /// 创建表单
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        private void CreateInfo(case_report caserport)
        {
            var CaseInfoSource = base.Create(caserport) as string;
            ///更新案件信息
            caserport.ID = CaseInfoSource;
            //var tasknow = ServiceHelper.GetService("work_task").GetDetailData(caserport.TaskId, null);
            //if (tasknow != null)
            //{
            //    var caseid = (string)tasknow["CaseID"];
            //    if (string.IsNullOrEmpty(caseid))
            //    {
            //        var caseinfo = QueryDb.FirstOrDefault<case_Info>("where CaseId=@0", caseid);
            //        if (caseinfo != null)
            //        {
            //            caseinfo.CaseStatus = "已结案";
            //            QueryDb.Update(caseinfo);
            //        }
            //    }
            //}

        }
        private object UpdateStatus(APIContext ctx)
        {
            var data = JsonHelper.DeserializeJsonToObject<Case_Report_StateChange>(ctx.Data);
            UpdateFormState<case_report>(data.InstaceId, data.FormState);
            return "更新成功";
        }

        /// <summary>
        /// 传入instance_id来更改业务表上的数据上的审批状态
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="instance_id"></param>
        /// <param name="FormState"></param>
        private void UpdateFormState<T>(string instance_id, string FormState)
        {
            QueryDb.BeginTransaction();
            try
            {
                if (!QueryDb.Exists<T>("where processInstanceId = @0", instance_id))
                {
                    throw new Exception("该instanceID不存在");
                }
                QueryDb.Update<T>("set FormState = @0 where processInstanceId = @1", FormState, instance_id);
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw e;
            }
            QueryDb.OnEndTransaction();
        }

        //根据表单去查询是否有案件 若没有案件关联 而是通过事件过来 需要将此事件关联的案件关闭且此事件也关闭
        private void JudgeFormState(string EventId)
        {
            //查询eventId 查看case_info关联的数据

        }

    }
}
