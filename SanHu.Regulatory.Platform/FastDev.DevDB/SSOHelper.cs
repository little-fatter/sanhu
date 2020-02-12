using FastDev.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Web;

namespace FastDev.DevDB
{
	public static class SSOHelper
	{
		public const string cookie_user = "user_token";

		public const string key_user = "eeeeeasy";

		public const string iv_user = "eeeeeas";

		public const string key_password = "eeeeeasy";

		public const string iv_password = "eeeeeas";

		public static SSOContext GetContext(HttpRequest request, DbContext db = null)
		{
            string cookieValue = "";
            request.Cookies.TryGetValue("user_token", out cookieValue);
            HttpCookie httpCookie_ = new HttpCookie("user_token", cookieValue);
			return smethod_0(httpCookie_, db);
		}


		private static SSOContext smethod_0(HttpCookie httpCookie_0, DbContext dbContext_0 = null)
		{
			SSOContext sSOContext = new SSOContext();
			if (httpCookie_0 != null && !string.IsNullOrEmpty(httpCookie_0.Value) && httpCookie_0.Value.Contains("|"))
			{
				sSOContext.username = httpCookie_0.Value.Split('|')[0];
				sSOContext.password = httpCookie_0.Value.Split('|')[1];
				try
				{
					sSOContext.username = DESHelper.Decode("eeeeeasy", "eeeeeas", sSOContext.username);
				}
				catch (Exception)
				{
					sSOContext.username = null;
				}
				if (dbContext_0 != null)
				{
					try
					{
						string text = dbContext_0.ExecuteScalar<string>("select UserNo from platform_user where LoginName = @0", new object[1]
						{
							sSOContext.username
						});
						if (text == null)
						{
							sSOContext.password = null;
						}
						else
						{
							string kEY = "eeeeeasy".ToString() + text;
							sSOContext.password = DESHelper.Decode(kEY, "eeeeeas", sSOContext.password);
						}
					}
					catch (Exception)
					{
						sSOContext.password = null;
					}
				}
			}
			return sSOContext;
		}

		public static string CreateContextValue(string name, string password)
		{
			string str = DESHelper.Encode("eeeeeasy", "eeeeeas", name);
			string str2 = DESHelper.Encode("eeeeeasy", "eeeeeas", password);
			return str + "|" + str2;
		}
	}
}
