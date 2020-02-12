using FastDev.DevDB.Workflow;

namespace FastDev.DevDB
{
	public interface IWorkflowService
	{
		DbContext DbContext
		{
			set;
		}

		object GetContext(WorkflowContext context);

		void Execute(WorkflowContext context);

		object GetLog(WorkflowContext context);
	}
}
