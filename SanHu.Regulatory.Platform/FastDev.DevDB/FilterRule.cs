using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	public class FilterRule
	{
		public string field
		{
			get;
			set;
		}

		public object value
		{
			get;
			set;
		}

		public string op
		{
			get;
			set;
		}

		public string type
		{
			get;
			set;
		}

		public FilterRule()
		{
			
			
		}

		public FilterRule(string field, object value):this(field, value, "equal")
		{
			
		}

		public FilterRule(string field, object value, string op)
		{
			
			
			this.field = field;
			this.value = value;
			this.op = op;
		}

		public FilterRule Copy()
		{
			FilterRule filterRule = new FilterRule();
			filterRule.value = value;
			filterRule.type = type;
			filterRule.field = field;
			filterRule.op = op;
			return filterRule;
		}
	}
}
