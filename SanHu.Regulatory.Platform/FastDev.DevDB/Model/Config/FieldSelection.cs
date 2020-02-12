using System.Runtime.CompilerServices;
using System.Xml.Serialization;

namespace FastDev.DevDB.Model.Config
{
	public class FieldSelection
	{
		

		[XmlAttribute]
		public string base_fields
		{
			get;
			set;
		}

		[XmlAttribute]
		public string base_ignore_fields
		{
			get;
			set;
		}

		[XmlAttribute]
		public string many2one
		{
			get;
			set;
		}

		[XmlAttribute]
		public string one2many
		{
			get;
			set;
		}

		[XmlAttribute]
		public string many2many
        {
			get;
			set;
		}

		public FieldSelection()
		{
			
			
			base_fields = "*";
			base_ignore_fields = "";
			many2one = "*";
			one2many = "";
            many2many = "";
		}
	}
}
