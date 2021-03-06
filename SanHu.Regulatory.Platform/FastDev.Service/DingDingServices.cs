﻿using FastDev.IServices;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using FD.Common.Extensions;
using System.Threading.Tasks;
using FastDev.DevDB.Common;
using DingTalk.Api.Response;
using DingTalk.Api.Request;
using FastDev.Common.Extensions;
using Microsoft.Extensions.Options;
using FD.Model.Configs;

namespace FastDev.Service
{
    public class DingDingServices : ApplicationServices, IDingDingServices
    {
        /// <summary>
        /// httpclient工厂
        /// </summary>
        private readonly IHttpClientFactory _clientFactory;
        readonly ServerNameConfigModel _serverNameConfig;
        public DingDingServices(IOptionsSnapshot<ServerNameConfigModel> appsettingsModel, IHttpClientFactory clientFactory)
        {
            _serverNameConfig = appsettingsModel.Value;
            _clientFactory = clientFactory;
        }

        public Task<OapiWorkrecordAddResponse> WorkrecordAdd(OapiWorkrecordAddRequest oapiWorkrecordAddRequest)
        {
            var url = "api/dingding/workrecordadd?" + GetAgentIDString();

            return PostFrameWork<OapiWorkrecordAddResponse>(url, oapiWorkrecordAddRequest);
        }
        public async Task<bool> WorkrecordUpdate(string userId, string record_id)
        {
            var oapiWorkrecordAddRequest = new OapiWorkrecordUpdateRequest() { };
            var url = "api/dingding/WorkrecordUpdate?" + GetAgentIDString();

            var result = await PostFrameWork<OapiWorkrecordUpdateResponse>(url, oapiWorkrecordAddRequest);
            if (result.Errcode == 0)
            {
                return result.Result;
            }
            return false;
        }
        public string CreateWorkrecor(string userId, string title, string url, Dictionary<string, string> formInfo)
        {
            OapiWorkrecordAddRequest oapiWorkrecordAddRequest = new OapiWorkrecordAddRequest()
            {
                Userid = userId.ToString(),//user的accountID
                CreateTime = DateTime.Now.GetTimeStampM(),
                Title = title,//待办事项的标题
                Url = url,//"https://oa.dingtalk.com",//待办事项的跳转链接   
            };

            var formItemList_ = new List<OapiWorkrecordAddRequest.FormItemVoDomain>();
            foreach (var item in formInfo)
            {
                formItemList_.Add(new OapiWorkrecordAddRequest.FormItemVoDomain()
                {
                    Title = item.Key,
                    Content = item.Value
                }); ;
            }
            oapiWorkrecordAddRequest.FormItemList_ = formItemList_;

            //返回待办id
            return WorkrecordAdd(oapiWorkrecordAddRequest).Result.RecordId;
        }

        public async Task<string> GetProcess(string OriUserId, string OriDeptId, string taskUserId, string OpeUserId, int pageIndex = 0, int pageSize = 50)
        {
            var url = $"api/Process/GetProcess?OriUserId={OriUserId}&OriDeptId={OriDeptId}&taskUserId={taskUserId}&OpeUserId={OpeUserId}&pageIndex={pageIndex}&pageSize={pageSize}";

            var client = _clientFactory.CreateClient(HostData.FrameWorkSeverName);
            return await client.GetAsync(url).Result.Content.ReadAsStringAsync();
        }

        /// <summary>
        /// 发起审核流
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public Task<OapiProcessinstanceCreateResponse> ProcessInstaceCreateAsync(OapiProcessinstanceCreateRequest request)
        {
            var url = "api/dingding/ProcessInstanceCreate?" + GetAgentIDString();

            request.AgentId = long.Parse(_serverNameConfig.AgentId);

            //TODO fill up the list property
            //request.OriginatorUserId = "AccountId";//框架User表中AccountId
            //request.DeptId = long.MinValue; //user表中的deptId是GUID
            return PostFrameWork<OapiProcessinstanceCreateResponse>(url, request);
        }

        /// <summary>
        /// 框架post数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="apiurl"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private async Task<T> PostFrameWork<T>(string apiurl, object data)
        {
            var client = _clientFactory.CreateClient(HostData.FrameWorkSeverName);
            return await client.PostAsync<T>(apiurl, data);
        }
        private string GetAgentIDString()
        {
            return $"agentId={_serverNameConfig.AgentId}";
        }
    }
}
