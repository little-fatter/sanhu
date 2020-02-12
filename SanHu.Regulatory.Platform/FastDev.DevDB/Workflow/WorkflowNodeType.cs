namespace FastDev.DevDB.Workflow
{
	public class WorkflowNodeType
	{
		public static string Start;

		public static string End;

		public static string Active;

		public static string Branch;

		public WorkflowNodeType()
		{
			
			
		}

		static WorkflowNodeType()
		{
			
			Start = "start";
			End = "end";
			Active = "active";
			Branch = "branch";
		}
	}
}
