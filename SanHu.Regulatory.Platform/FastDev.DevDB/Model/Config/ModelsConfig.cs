using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Xml.Serialization;

namespace FastDev.DevDB.Model.Config
{
	[XmlType("freedesign")]
	public class ModelsConfig
	{
		

		[XmlArrayItem("models")]
		[XmlArray("models")]
		public List<Model> models
		{
			get;
			set;
		}

		public ModelsConfig()
		{
			
			
			models = new List<Model>();
		}
	}
}
