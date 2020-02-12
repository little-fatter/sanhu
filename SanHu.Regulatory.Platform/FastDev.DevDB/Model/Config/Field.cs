using System.Runtime.CompilerServices;
using System.Xml.Serialization;

namespace FastDev.DevDB.Model.Config
{
	public class Field
	{
		

		[XmlAttribute]
		public string name
		{
			get;
			set;
		}

		[XmlAttribute]
		public string dbName
		{
			get;
			set;
		}

		[XmlAttribute]
		public string title
		{
			get;
			set;
		}

		[XmlAttribute]
		public string type
		{
			get;
			set;
		}

		[XmlAttribute]
		public string length
		{
			get;
			set;
		}

		[XmlAttribute]
		public string relationModel
		{
			get;
			set;
		}

		[XmlAttribute]
		public string relationField
		{
			get;
			set;
		}

		[XmlAttribute]
		public string enabledSearch
		{
			get;
			set;
		}

		[XmlAttribute]
		public string fieldSelection
		{
			get;
			set;
		}

		[XmlAttribute]
		public string isPK
		{
			get;
			set;
		}

		[XmlAttribute]
		public string isRequired
		{
			get;
			set;
		}

		[XmlAttribute]
		public string sourceFilter
		{
			get;
			set;
		}

		public Field()
		{
			
			
		}
	}
}
