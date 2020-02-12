using System.Data;

namespace FastDev.Common.JSON
{
	public class DataSetJSONSerializer : IJSONSerializer
	{
		public string Serialize(object o)
		{
			return JsonMsHelper.DataTableToJson(((DataSet)o).Tables[0]);
		}
	}
}
