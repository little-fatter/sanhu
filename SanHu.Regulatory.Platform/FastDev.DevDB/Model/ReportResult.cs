using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Model
{
	public class ReportResult
	{
		
		public string legendName
		{
			get;
			set;
		}

		public IList<object> legend
		{
			get;
			set;
		}

		public IList<object> axis
		{
			get;
			set;
		}

		public IList<object> series
		{
			get;
			set;
		}

		public ReportResult()
		{
			
			
			legend = new List<object>();
			axis = new List<object>();
			series = new List<object>();
		}
	}
}
