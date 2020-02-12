using System.Collections;
using System.Collections.Generic;
using System.Dynamic;

namespace FastDev.Common.Extensions
{
	public static class IDictionaryExtension
	{
		public static ExpandoObject ToExpando(this IDictionary<string, object> dictionary)
		{
			ExpandoObject expandoObject = new ExpandoObject();
			IDictionary<string, object> dictionary2 = expandoObject;
			foreach (KeyValuePair<string, object> item2 in dictionary)
			{
				if (item2.Value is IDictionary<string, object>)
				{
					ExpandoObject value = ((IDictionary<string, object>)item2.Value).ToExpando();
					dictionary2.Add(item2.Key, value);
				}
				else if (item2.Value is ICollection)
				{
					List<object> list = new List<object>();
					foreach (object item3 in (ICollection)item2.Value)
					{
						if (item3 is IDictionary<string, object>)
						{
							ExpandoObject item = ((IDictionary<string, object>)item3).ToExpando();
							list.Add(item);
						}
						else
						{
							list.Add(item3);
						}
					}
					dictionary2.Add(item2.Key, list);
				}
				else
				{
					dictionary2.Add(item2);
				}
			}
			return expandoObject;
		}
	}
}
