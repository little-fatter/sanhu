using System.Runtime.CompilerServices;
using System.Xml.Serialization;

namespace FastDev.DevDB.Model.Config
{
	public class Model
	{
		

		[XmlAttribute]
		public string name
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
		public string textField
		{
			get;
			set;
		}

		[XmlAttribute]
		public string moduleName
		{
			get;
			set;
		}

		[XmlAttribute]
		public string moduleTitle
		{
			get;
			set;
		}

		[XmlAttribute]
		public string notIncludeSysFields
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

		public string PKName
		{
			get;
			set;
		}
        

        public Model()
		{
			
			
		}
	}
}
