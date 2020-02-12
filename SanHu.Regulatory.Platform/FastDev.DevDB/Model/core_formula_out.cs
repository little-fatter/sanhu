using PetaPoco;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Model
{
	[TableName("core_formula")]
	public class core_formula_out
	{
		

		public string model
		{
			get;
			set;
		}

		public string viewname
		{
			get;
			set;
		}

		public string type
		{
			get;
			set;
		}

		public string title
		{
			get;
			set;
		}

		public string content
		{
			get;
			set;
		}

		public core_formula_out()
		{
			
			
		}
	}
}
