using FastDev.Common;
using System.Collections;
using System.Collections.Generic;
using FastDev.Common.Extensions;

namespace FastDev.DevDB
{
	public class FilterHelper
	{
		public static string PrevFilter(string value)
		{
			
			FilterGroup2 filterGroup = JsonHelper.DeserializeJsonToObject<FilterGroup2>(value);
			PrevGroup(filterGroup);
			return JsonHelper.SerializeObject(filterGroup);
		}

		public static void PrevGroup(FilterGroup2 group)
		{
			foreach (Dictionary<string, object> rule in group.rules)
			{
				object obj = rule["value"];
				if (obj is IList)
				{
					rule["field"] = rule["field"].ToStr() + "ID";
					List<string> list = new List<string>();
					foreach (object item in (IList)obj)
					{
						list.Add(((IList)item)[0].ToStr());
					}
					rule["value"] = string.Join(";", list);
				}
			}
			foreach (FilterGroup2 group2 in group.groups)
			{
				PrevGroup(group2);
			}
		}

		public FilterHelper()
		{
			
			
		}
	}
}
