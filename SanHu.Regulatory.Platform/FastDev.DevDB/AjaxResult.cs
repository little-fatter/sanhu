using System.Runtime.CompilerServices;
using System.Text;

namespace FastDev.DevDB
{
	public class AjaxResult
	{
		
		public string statusCode
		{
			get;
			set;
		}

		public string message
		{
			get;
			set;
		}

		public object data
		{
			get;
			set;
		}

		public string id
		{
			get;
			set;
		}

		public bool Success
		{
			get
			{
				return statusCode == "1";
			}
			set
			{
				statusCode = (value ? "1" : "3");
			}
		}
		public string ToJsonString(string dataJson)
		{
			StringBuilder sb = new StringBuilder();
			sb.Append("{");
			sb.Append("\"statusCode\":"+statusCode+",");
			sb.Append("\"Success\":" + Success + ",");
			if(!string.IsNullOrEmpty(id))
				sb.Append("\"id\":\"" + id + "\",");
			if (!string.IsNullOrEmpty(message))
				sb.Append("\"message\":\"" + message + "\",");
			sb.Append("\"data\":" + dataJson);
			sb.Append("}");
			return sb.ToString();
		}

		public AjaxResult()
		{
			
			
		}
	}
}
