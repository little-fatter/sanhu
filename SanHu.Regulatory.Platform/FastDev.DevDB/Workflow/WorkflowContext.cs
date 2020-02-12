using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Workflow
{
	public class WorkflowContext
	{
		

		public string Model
		{
			get;
			set;
		}

		public string Context
		{
			get;
			set;
		}

		public string Action
		{
			get;
			set;
		}

		public string TaskID
		{
			get;
			set;
		}

		public string Remark
		{
			get;
			set;
		}

		public byte? Waitting
		{
			get;
			set;
		}

		public byte? SignMode
		{
			get;
			set;
		}

		public IList<ExecuteNode> ExecuteNodes
		{
			get;
			set;
		}

		public WorkflowAction CurrentAction
		{
			get
			{
				if (string.Compare(Action, "Advance", true) == 0)
				{
					return WorkflowAction.Advance;
				}
				if (string.Compare(Action, "Back", true) == 0)
				{
					return WorkflowAction.Back;
				}
				if (string.Compare(Action, "Rejected", true) == 0)
				{
					return WorkflowAction.Rejected;
				}
				if (string.Compare(Action, "Transfer", true) == 0)
				{
					return WorkflowAction.Transfer;
				}
				return WorkflowAction.Advance;
			}
		}

		public WorkflowContext()
		{
			
			
		}
	}
}
