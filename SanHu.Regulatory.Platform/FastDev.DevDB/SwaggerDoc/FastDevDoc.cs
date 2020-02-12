using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.DevDB.SwaggerDoc
{
    public class FastDevDoc
    {
        /// <summary>
        /// 获取swagger json
        /// </summary>
        /// <returns></returns>
        public JObject GetDoc()
        {
            var config = ServiceHelper.GetModelsConfig();
            JObject jroot = new JObject();
            jroot.Add(new JProperty("openapi", "3.0.1"));
            jroot.Add(new JProperty("info", new JObject(
                new JProperty("title", "DataCenter APIs")
                , new JProperty("description", "DataCenter APIs implemented by asp.net core.")
                , new JProperty("version", "v1"))));
            jroot.Add(new JProperty("components", GetComponents(config)));
            return jroot;
        }
        /// <summary>
        /// 获取 components 节点
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        private JObject GetComponents(Model.Config.ModelsConfig config)
        {
            JObject jschemas = new JObject();
            foreach (var m in config.models)
            {
                JObject table = new JObject();
                table.Add(new JProperty("type", "object"));
                table.Add(new JProperty("description", m.title));
                JObject properties = new JObject();
                var sc = ServiceHelper.GetServiceConfig(m.name);
                if (sc == null) continue;
                foreach (var f in sc.fields)
                {
                    JObject oneProp = new JObject();
                    switch (f.type)
                    {
                        case "datetime":
                            oneProp.Add(new JProperty("type", f.type));
                            if (f.type == "datetime")
                            {
                                oneProp.Add(new JProperty("format", "date-time"));
                            }
                            break;
                        case "integer":
                            oneProp.Add(new JProperty("type", f.type));

                            oneProp.Add(new JProperty("format", "int32"));
                            break;
                        default:
                            oneProp.Add(new JProperty("type", f.type));
                            break;
                    }
                    oneProp.Add(new JProperty("description", f.title));
                    properties.Add(new JProperty(f.name, oneProp));
                }
                table.Add(new JProperty("properties", properties));
                JProperty tabProp = new JProperty(m.name, table);
                jschemas.Add(tabProp);
            }
            JObject jComponents = new JObject(new JProperty("schemas", jschemas));
            return jComponents;
        }


        /// <summary>
        /// 获取路径 
        /// </summary>
        /// <returns>只需要生成几个复杂的，关键性的函数的文档</returns>
        //private JObject GetPaths()
        //{

        //}
        private JObject GetResponseNode(string modelName)
        {
            string json = @"{
                              ""200"": {
                                ""description"": ""Success"",
                                ""content"": {
                                  ""text/plain"": {
                                    ""schema"": {
                                      ""$ref"": ""#/components/schemas/" + modelName + @"""
                                    }
                                  },
                                  ""application/json"": {
                                    ""schema"": {
                                      ""$ref"": ""#/components/schemas/" + modelName + @"""
                                    }
                                  },
                                  ""text/json"": {
                                    ""schema"": {
                                      ""$ref"": ""#/components/schemas/" + modelName + @"""
                                    }
                                  }
                                }
                              }
                           }";
            JObject rev = JObject.Parse(json);
            return rev;
        }
        //private JObject GetOneMethod(string path,)
        //{

        //}
    }
}
