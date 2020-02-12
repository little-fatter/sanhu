using System.Runtime.CompilerServices;

namespace FD.Common.ActionValue
{
	public class PostDataDescriptor<T> : IPostDataDescriptor
	{
		public string model
		{
			get;
			set;
		}

		public string method
		{
			get;
			set;
		}

		public T data
		{
			get;
			set;
		}

		public PostDataDescriptor()
		{
			
			
		}
	}
}
