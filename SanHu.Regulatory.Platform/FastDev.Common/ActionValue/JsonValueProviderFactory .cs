using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Threading.Tasks;

namespace FastDev.Common.ActionValue
{
    public class JsonValueProviderFactory : IValueProviderFactory
    {
        public Task CreateValueProviderAsync(ValueProviderFactoryContext context)
        {
            context.ValueProviders.Add(new JsonKeyValueProvider(context.ActionContext));
            return Task.CompletedTask;
        }

    }
}
