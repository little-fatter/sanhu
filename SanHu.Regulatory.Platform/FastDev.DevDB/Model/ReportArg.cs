using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Model
{
	public class ReportArg
	{
		

		public byte? legendIncludeDataOnly
		{
			get;
			set;
		}

		public string legendField
		{
			get;
			set;
		}

		public string legendType
		{
			get;
			set;
		}

		public FilterGroup dataFilter
		{
			get;
			set;
		}

		public string legendFieldType
		{
			get;
			set;
		}

		public FilterGroup legendFieldFilter
		{
			get;
			set;
		}

		public string legendFieldRefTextField
		{
			get;
			set;
		}

		public byte? axisIncludeDataOnly
		{
			get;
			set;
		}

		public string axisField
		{
			get;
			set;
		}

		public string axisFieldType
		{
			get;
			set;
		}

		public string axisFieldRefTextField
		{
			get;
			set;
		}

		public string valueField
		{
			get;
			set;
		}

		public string valueFieldType
		{
			get;
			set;
		}

		public ReportArg()
		{
			
			
		}
	}
}
