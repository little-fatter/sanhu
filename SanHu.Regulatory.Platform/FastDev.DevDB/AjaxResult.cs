using System.Runtime.CompilerServices;

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

		public AjaxResult()
		{
			
			
		}
	}
}
