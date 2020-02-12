using System.Runtime.CompilerServices;

namespace FD.Common.ActionValue
{
	public class ListPostDataDescriptor<T> : IPostDataDescriptor
	{
	
		public string model
		{
			get;
			set;
		}

		public ListPostDataDescriptorData<T> data
		{
			get;
			set;
		}

		public ListPostDataDescriptor()
		{
			
			
		}
	}
}
