using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Workflow
{
	public class ExecuteNode
	{
		

		public string NodeId
		{
			get;
			set;
		}

		public List<List<string>> Executors
		{
			get;
			set;
		}

		public ExecuteNode()
		{
			
			
		}
	}
}
