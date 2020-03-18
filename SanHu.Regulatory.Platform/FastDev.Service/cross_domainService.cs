using FastDev.Common;
using FastDev.DevDB;
using FD.Model.Dto;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace FastDev.Service
{
    class cross_domainService : ServiceBase, IService
    {
        public cross_domainService() 
        {
            OnGetAPIHandler += Cross_domainService_OnGetAPIHandler;
        }

        private Func<APIContext, object> Cross_domainService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "SFAPI":
                    return HandleSF;
            }
            return null;
        }

        object HandleSF(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<SFApiDTO>(context.Data);

            var content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(new { id = data.ObjId }));
            if (data.filter != null && data.ApiType.ToLower() == "law_rule_item_list")
            {
                content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(new { keyWord = data.filter.keyWord, lawRuleFileId = data.filter.lawRuleFileId }));
            }

            var client = new HttpClient();
            
            var response = client.PostAsync(string.Format("http://yuxi.mysinosoft.com/yuxi/api/7FFA47F368D84E1FAD68A57E22975E50/{0}", data.ApiType), content).Result;
            if (response.IsSuccessStatusCode)
            {
                System.Threading.Tasks.Task<string> t = response.Content.ReadAsStringAsync();
                return t.Result;
            }
            return null;
        }
    }
}
