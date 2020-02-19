using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	/// <summary>
	/// 过滤规则
	/// </summary>
	public class FilterRule
	{
		/// <summary>
		/// 字段
		/// </summary>
		public string field
		{
			get;
			set;
		}
		/// <summary>
		/// 值
		/// </summary>
		public object value
		{
			get;
			set;
		}
		/// <summary>
		/// 对比条件 
		/// </summary>
		public string op
		{
			get;
			set;
		}
		/// <summary>
		/// 类型
		/// </summary>
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
