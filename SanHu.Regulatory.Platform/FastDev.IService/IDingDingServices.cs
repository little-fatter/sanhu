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
        /// 更新待办
        /// </summary>
        /// <param name="oapiWorkrecordAddRequest"></param>
        /// <returns></returns>
        Task<OapiWorkrecordUpdateResponse> WorkrecordUpdate(OapiWorkrecordUpdateRequest oapiWorkrecordAddRequest);

        /// <summary>
        /// 新增待办
        /// </summary>
        void  CreateWorkrecor(string userId, string title, string url, string formTitle, string fromContent);
    }
}
