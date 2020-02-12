using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	public class PagedData
	{
		
		public IList Records
		{
			get;
			set;
		}

		public long Total
		{
			get;
			set;
		}

		public PagedData(IList records, long total)
		{
			
			
			Records = records;
			Total = total;
		}
	}
	public class PagedData<TEntity>
	{
		
		public IEnumerable<TEntity> Rows
		{
			get;
			set;
		}

		public long Total
		{
			get;
			set;
		}

		public PagedData()
		{
			
			
		}
	}
}
