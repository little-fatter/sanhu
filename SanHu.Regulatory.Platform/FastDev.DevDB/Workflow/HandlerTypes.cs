namespace FastDev.DevDB.Workflow
{
	public class HandlerTypes
	{
		public static string GetText(string handlerType)
		{
			if (handlerType == "1")
			{
				return "抢先";
			}
			if (handlerType == "2")
			{
				return "顺序";
			}
			if (handlerType == "3")
			{
				return "同时";
			}
			if (handlerType == "4")
			{
				return "会签";
			}
			return "";
		}

		public HandlerTypes()
		{
			
			
		}
	}
}
