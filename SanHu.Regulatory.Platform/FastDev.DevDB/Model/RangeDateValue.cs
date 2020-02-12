using System;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Model
{
	public class RangeDateValue
	{

        public DateTime Min
		{
			get;
			set;
		}

		public DateTime Max
		{
			get;
			set;
		}

		public RangeDateValue(DateTime min, DateTime max)
		{
			
			
			Min = min;
			Max = max;
		}
	}
}
