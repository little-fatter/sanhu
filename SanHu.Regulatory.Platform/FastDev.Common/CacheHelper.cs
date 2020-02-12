using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections;
using System.IO;
using System.Web;

namespace FastDev.Common
{
    public class CacheDependency : Microsoft.Extensions.FileProviders.Physical.PollingFileChangeToken
    {
        public CacheDependency(string filePath) : base(new FileInfo(filePath))
        {

        }
    }
    public class CacheHelper
    {
        public static IMemoryCache _memoryCache = new MemoryCache(new MemoryCacheOptions());

        public static object GetCache(string CacheKey)
        {
            return _memoryCache.Get(CacheKey);
        }

        public static void SetCache(string CacheKey, object objObject)
        {
            _memoryCache.Set(CacheKey, objObject);
        }

        public static void SetCache(string CacheKey, object objObject, TimeSpan Timeout)
        {
            if (objObject == null)
            {
                _memoryCache.Remove(CacheKey);
            }
            else
            {
                _memoryCache.Set(CacheKey, objObject, new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(Timeout)
               );
            }
        }

        public static void SetCache(string CacheKey, object objObject, DateTime absoluteExpiration, TimeSpan slidingExpiration)
        {
            if (objObject == null)
            {
                _memoryCache.Remove(CacheKey);
            }
            else
            {
                _memoryCache.Set(CacheKey, objObject, new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(slidingExpiration));
            }
        }

        public static void SetCache(string CacheKey, object objObject, CacheDependency depend)
        {
            if (objObject == null)
            {
                _memoryCache.Remove(CacheKey);
            }
            else
            {
                MemoryCacheEntryOptions cacheEntityOps = new MemoryCacheEntryOptions();
                cacheEntityOps.AddExpirationToken(depend);
                _memoryCache.Set(CacheKey, objObject, cacheEntityOps);
            }
        }

        public static void RemoveAllCache(string CacheKey)
        {
            _memoryCache.Remove(CacheKey);
        }

        public static void RemoveAllCache()
        {
            _memoryCache.Dispose();
            _memoryCache=new MemoryCache(new MemoryCacheOptions());
        }
    }
}
