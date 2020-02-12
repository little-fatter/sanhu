using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Workflow
{
	public class ViewModel
	{
		

		public IList<ViewNode> nodes
		{
			get;
			set;
		}

		public IList<ViewConnection> connections
		{
			get;
			set;
		}

		public ViewModel()
		{
			
			
		}
	}
}
