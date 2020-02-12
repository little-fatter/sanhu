using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Workflow
{
	public class WorkflowActionResult
	{
	

		public bool IsProjectComplete
		{
			get;
			set;
		}

		public bool IsReturnToStart
		{
			get;
			set;
		}

		public WorkflowActionResult()
		{
			
			
			IsProjectComplete = false;
			IsReturnToStart = false;
		}

		public WorkflowActionResult(bool isProjectComplete)
		{
			
			
			IsProjectComplete = isProjectComplete;
		}
	}
}
