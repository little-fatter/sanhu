using System.Data;

namespace FastDev.Common.JSON
{
	public class DataTableJSONSerializer : IJSONSerializer
	{
		public string Serialize(object o)
		{
			return JsonMsHelper.DataTableToJson(o as DataTable);
		}
	}
}
