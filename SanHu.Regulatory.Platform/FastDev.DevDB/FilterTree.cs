using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
	public class FilterTree
	{
		

		public byte? enabled
		{
			get;
			set;
		}

		public string rootText
		{
			get;
			set;
		}

		public string sourceModel
		{
			get;
			set;
		}

		public string parentField
		{
			get;
			set;
		}

		public FilterGroup filter
		{
			get;
			set;
		}

		public string valueField
		{
			get;
			set;
		}

		public string textField
		{
			get;
			set;
		}

		public string fields
		{
			get;
			set;
		}

		public string sourceModel2
		{
			get;
			set;
		}

		public string parentField2
		{
			get;
			set;
		}

		public string valueField2
		{
			get;
			set;
		}

		public string textField2
		{
			get;
			set;
		}

		public FilterGroup filter2
		{
			get;
			set;
		}

		public string fields2
		{
			get;
			set;
		}

		public string refSourceField
		{
			get;
			set;
		}

        public string orderBy
        {
            get;
            set;
        }
        public FilterTree()
		{
			
			
			valueField = "ID";
			valueField2 = "ID";
		}

		public bool IsEnabled()
		{
			int num;
			if (((int?)this.enabled).HasValue)
			{
				byte? enabled = this.enabled;
				num = ((enabled.GetValueOrDefault() != 0 || !enabled.HasValue) ? 1 : 0);
			}
			else
			{
				num = 0;
			}
			if (num == 0)
			{
				return false;
			}
			if (string.IsNullOrEmpty(sourceModel))
			{
				return false;
			}
			return true;
		}
	}
}
