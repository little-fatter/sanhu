
namespace FastDev.Common.JSON
{
	public class MsJSONSerializer : IJSONSerializer
	{
		public string Serialize(object o)
		{
			return JsonHelper.SerializeObject(o);
		}
	}
}
