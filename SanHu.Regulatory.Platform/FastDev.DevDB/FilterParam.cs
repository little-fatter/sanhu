using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	public class FilterParam
	{
		
		public string Name
		{
			get;
			set;
		}

		public object Value
		{
			get;
			set;
		}

		public FilterParam(string name, object value)
		{
			
			
			Name = name;
			Value = value;
		}
	}
}
