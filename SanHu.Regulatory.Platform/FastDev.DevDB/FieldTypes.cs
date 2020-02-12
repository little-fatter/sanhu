namespace FastDev.DevDB
{
	public class FieldTypes
	{
		public static string Many2many;

		public static string One2many;

		public static string Many2one;

		public static string Datetime;

		public static string Boolean;

		public static string Float;

		public static string Integer;

		public static string String;

		public static string Text;

		public FieldTypes()
		{
			
			
		}

		static FieldTypes()
		{
			
			Many2many = "many2many";
			One2many = "one2many";
			Many2one = "many2one";
			Datetime = "datetime";
			Boolean = "boolean";
			Float = "float";
			Integer = "integer";
			String = "string";
			Text = "text";
		}
	}
}
