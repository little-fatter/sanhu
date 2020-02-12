using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	public class FilterGroup2
	{
	

		public IList<Dictionary<string, object>> rules
		{
			get;
			set;
		}

		public string op
		{
			get;
			set;
		}

		public IList<FilterGroup2> groups
		{
			get;
			set;
		}

		public FilterGroup2()
		{
			
			
			rules = new List<Dictionary<string, object>>();
			groups = new List<FilterGroup2>();
			op = "and";
		}
	}
}
