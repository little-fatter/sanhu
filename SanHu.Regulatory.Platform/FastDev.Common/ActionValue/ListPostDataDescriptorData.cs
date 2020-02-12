using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FD.Common.ActionValue
{
	public class ListPostDataDescriptorData<T>
	{
		
	
		public List<T> add
		{
			get;
			set;
		}

		public List<T> update
		{
			get;
			set;
		}

		public List<T> del
		{
			get;
			set;
		}

		public ListPostDataDescriptorData()
		{
			
			
		}
	}
}
