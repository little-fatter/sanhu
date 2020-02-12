using System;

namespace FastDev.Common
{
	public class UserException : Exception
	{
		public UserException()
		{
		}

		public UserException(string message)
			: base(message)
		{
		}
	}
}
