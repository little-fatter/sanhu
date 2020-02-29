using DingTalk.Api.Request;
using DingTalk.Api.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FastDev.IServices
{
    public interface IDingDingServices:IApplicationServices
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
    }
}
