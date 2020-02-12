using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	public class QueryCondition
	{
		
		public string Key
		{
			get;
			set;
		}

		public QueryOperator Operator
		{
			get;
			set;
		}

		public object Value
		{
			get;
			set;
		}

		public string ValueType
		{
			get;
			set;
		}

		public QueryCondition(string key, object value, QueryOperator op)
		{
			
			
			Key = key;
			Value = value;
			Operator = op;
		}

		public QueryCondition(string key, object value):this(key, value, QueryOperator.Contains)
		{
			
		}

		public QueryCondition()
		{
			
			
		}
	}
}
