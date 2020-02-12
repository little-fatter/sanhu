using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Workflow
{
	public class BranchNode : NodeBase
	{
		

		public FilterGroup conditionRule
		{
			get;
			set;
		}

		public IList<string> trueFlowNode
		{
			get;
			set;
		}

		public IList<string> falseFlowNode
		{
			get;
			set;
		}

		public BranchNode()
		{
			
			
		}
	}
}
