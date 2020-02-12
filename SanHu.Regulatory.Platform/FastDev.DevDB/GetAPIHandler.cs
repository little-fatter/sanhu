using System;

namespace FastDev.DevDB
{
	public delegate Func<APIContext, object> GetAPIHandler(string id);
}
