using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Rights
{
	public class RightsModel
	{
		


		public string menuRights
		{
			get;
			set;
		}

		public List<RightsDataModel> funRights
		{
			get;
			set;
		}

		public List<RightsDataModel> dataRights
		{
			get;
			set;
		}

		public List<RightsDataModel> fieldRights
		{
			get;
			set;
		}

		public RightsModel()
		{
			
			
			funRights = new List<RightsDataModel>();
			dataRights = new List<RightsDataModel>();
			fieldRights = new List<RightsDataModel>();
		}
	}
}
