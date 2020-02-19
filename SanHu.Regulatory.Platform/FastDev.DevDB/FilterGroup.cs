using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	/// <summary>
	/// ��������ģ��
	/// </summary>
	public class FilterGroup
	{
		/// <summary>
		/// ��������
		/// </summary>
		public IList<FilterRule> rules
		{
			get;
			set;
		}
		/// <summary>
		/// 
		/// </summary>
		public string op
		{
			get;
			set;
		}

		public IList<FilterGroup> groups
		{
			get;
			set;
		}

		public FilterGroup()
		{
			
			
			rules = new List<FilterRule>();
			groups = new List<FilterGroup>();
			op = "and";
		}

		public bool HasRule()
		{
			foreach (FilterRule rule in rules)
			{
				if (rule != null && !string.IsNullOrEmpty(rule.field))
				{
					return true;
				}
			}
			foreach (FilterGroup group in groups)
			{
				if (group.HasRule())
				{
					return true;
				}
			}
			return false;
		}
	}
}
