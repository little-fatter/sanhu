using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	public class QueryDescriptor
	{
		private IList<OrderByClause> ilstOrders;
		public IList<OrderByClause> OrderBy
		{
			get
			{
				if (ilstOrders == null)
				{
					ilstOrders = new List<OrderByClause>();
					if (!string.IsNullOrEmpty(SortName))
					{
						ilstOrders.Add(new OrderByClause
						{
							Key = SortName,
							Order = ((SortOrder == "desc") ? OrderSequence.DESC : OrderSequence.ASC)
						});
					}
				}
				return ilstOrders;
			}
			set
			{
				ilstOrders = value;
			}
		}

		public FilterGroup Condition
		{
			get;
			set;
		}

		public long? PageSize
		{
			get;
			set;
		}

		public long? PageIndex
		{
			get;
			set;
		}

		public string SortName
		{
			get;
			set;
		}

		public string SortOrder
		{
			get;
			set;
		}

		public bool EnabledPage
		{
			get
			{
				return !string.IsNullOrEmpty(SortName) && PageIndex.HasValue;
			}
		}

		public QueryDescriptor()
		{
			
			ilstOrders = null;
			
			Condition = new FilterGroup();
		}
	}

	public class Query
	{
		public string id { get; set; }
		public string model { get; set; }
		public string key { get; set; }
	}
}
