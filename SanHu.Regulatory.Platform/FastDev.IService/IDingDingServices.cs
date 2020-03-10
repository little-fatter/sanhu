using DingTalk.Api.Request;
using DingTalk.Api.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FastDev.IServices
{
    public interface IDingDingServices : IApplicationServices
    {
        /// <summary>
        /// 新增待办
        /// </summary>
        Task<OapiWorkrecordAddResponse> WorkrecordAdd(OapiWorkrecordAddRequest oapiWorkrecordAddRequest);
        /// <summary>
        /// 更新取消待办
        /// </summary>
        /// <param name="oapiWorkrecordAddRequest"></param>
        /// <returns></returns>
        Task<bool> WorkrecordUpdate(string userId, string record_id);

        /// <summary>
        /// 新增待办
        /// </summary>
        string CreateWorkrecor(string userId, string title, string url, Dictionary<string, string> formInfo);
        /// <summary>
        /// 获取审批信息
        /// </summary>
        /// <param name="OriUserId">发起人id</param>
        /// <param name="OriDeptId">发起部门</param>
        /// <param name="taskUserId">处理人</param>
        /// <param name="OpeUserId">操作人</param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<string> GetProcess(string OriUserId, string OriDeptId, string taskUserId, string OpeUserId, int pageIndex = 0, int pageSize = 50);
    }
}
