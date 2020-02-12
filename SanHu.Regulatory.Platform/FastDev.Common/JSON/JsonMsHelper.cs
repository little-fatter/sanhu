using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace FastDev.Common.JSON
{
	public sealed class JsonMsHelper
	{
		private static MsJSONSerializer objSerializer = new MsJSONSerializer();

		public static string DataTableToJson(DataTable dt)
		{
			if (dt == null)
			{
				return "[]";
			}
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.Append("[");
			if (dt.Rows.Count > 0)
			{
				for (int i = 0; i < dt.Rows.Count; i++)
				{
					stringBuilder.Append("{");
					for (int j = 0; j < dt.Columns.Count; j++)
					{
						stringBuilder.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + objSerializer.Serialize(dt.Rows[i][j]));
						if (j < dt.Columns.Count - 1)
						{
							stringBuilder.Append(",");
						}
					}
					stringBuilder.Append("}");
					if (i < dt.Rows.Count - 1)
					{
						stringBuilder.Append(",");
					}
				}
			}
			stringBuilder.Append("]");
			return stringBuilder.ToString();
		}

		public static string ToJson(object t)
		{
			return JsonHelper.SerializeObject(t);
		}

		public static T FromJson<T>(string strJson) where T : class
		{
			return JsonHelper.DeserializeJsonToObject<T>(strJson);
		}

		public static string GetArrayJSON(IList<Hashtable> list, string id, string pid)
		{
			object t = ArrayToTreeData(list, id, pid);
			return ToJson(t);
		}

		public static object ArrayToTreeData(IList<Hashtable> list, string id, string pid)
		{
			Hashtable hashtable = new Hashtable();
			List<Hashtable> list2 = new List<Hashtable>();
			foreach (Hashtable item in list)
			{
				if (item.ContainsKey(id))
				{
					hashtable[item[id].ToString()] = item;
				}
			}
			foreach (Hashtable item2 in list)
			{
				if (item2.ContainsKey(id))
				{
					if (!item2.ContainsKey(pid) || item2[pid] == null || !hashtable.ContainsKey(item2[pid].ToString()))
					{
						list2.Add(item2);
					}
					else
					{
						Hashtable hashtable2 = hashtable[item2[pid].ToString()] as Hashtable;
						if (!hashtable2.ContainsKey("children"))
						{
							hashtable2["children"] = new List<Hashtable>();
						}
						List<Hashtable> list3 = hashtable2["children"] as List<Hashtable>;
						list3.Add(item2);
					}
				}
			}
			return list2;
		}

		private static List<Hashtable> DbReaderToHash(IDataReader reader)
		{
			List<Hashtable> list = new List<Hashtable>();
			while (reader.Read())
			{
				Hashtable hashtable = new Hashtable();
				for (int i = 0; i < reader.FieldCount; i++)
				{
					string name = reader.GetName(i);
					object obj2 = hashtable[name] = reader[i];
				}
				list.Add(hashtable);
			}
			return list;
		}
	}
}
