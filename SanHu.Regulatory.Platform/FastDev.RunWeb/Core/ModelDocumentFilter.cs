using FastDev.DevDB;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FastDev.RunWeb
{
    public class ModelDocumentFilter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            RegisterSubClasses(swaggerDoc);
        }
        private static void RegisterSubClasses(OpenApiDocument swaggerDoc)
        {
            var config = ServiceHelper.GetModelsConfig();

            foreach (var m in config.models)
            {
                OpenApiSchema tableschema = new OpenApiSchema()
                {
                    Type = "object",
                    Description = m.title,
                };
                var sc = ServiceHelper.GetServiceConfig(m.name);
                if (sc == null) continue;
                foreach (var f in sc.fields)
                {
                    OpenApiSchema prop = new OpenApiSchema()
                    { 
                        Type = f.type,
                        Description = f.title
                    };
                    switch (f.type)
                    {
                        case "datetime":
                            if (f.type == "datetime")
                            {
                                prop.Format = "date-time";
                            }
                            break;
                        case "integer":
                            prop.Format = "int32";
                            break;
                    }
                    tableschema.Properties.Add(f.name, prop);
                }

                swaggerDoc.Components.Schemas.Add(m.name+(string.IsNullOrWhiteSpace(m.title)?string.Empty:(":"+m.title)), tableschema);
            }
        }
    }
}
