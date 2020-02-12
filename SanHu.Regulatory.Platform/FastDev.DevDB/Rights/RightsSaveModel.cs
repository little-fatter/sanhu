using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Rights
{
	public class RightsSaveModel
	{
		


		public string menuRights
		{
			get;
			set;
		}

		public List<RightsDataSaveModel> funRights
		{
			get;
			set;
		}

		public List<RightsDataSaveModel> dataRights
		{
			get;
			set;
		}

		public List<RightsDataSaveModel> fieldRights
		{
			get;
			set;
		}

		public RightsSaveModel()
		{
			
			
			funRights = new List<RightsDataSaveModel>();
			dataRights = new List<RightsDataSaveModel>();
			fieldRights = new List<RightsDataSaveModel>();
		}
	}
}
