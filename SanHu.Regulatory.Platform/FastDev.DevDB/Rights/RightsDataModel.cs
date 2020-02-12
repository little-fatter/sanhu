using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Rights
{
	public class RightsDataModel
	{


		public string modelName
		{
			get;
			set;
		}

		public string modelTitle
		{
			get;
			set;
		}

		public string moduleName
		{
			get;
			set;
		}

		public string moduleTitle
		{
			get;
			set;
		}

		public List<object> rules
		{
			get;
			set;
		}

		public string rightsValue
		{
			get;
			set;
		}

		public RightsDataModel()
		{
			
			
		}
	}
}
