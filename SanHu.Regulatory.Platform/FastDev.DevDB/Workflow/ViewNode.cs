using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Workflow
{
	public class ViewNode
	{
		


		public string nodeType
		{
			get;
			set;
		}

		public string x
		{
			get;
			set;
		}

		public string y
		{
			get;
			set;
		}

		public int width
		{
			get;
			set;
		}

		public string id
		{
			get;
			set;
		}

		public Dictionary<string, object> properties
		{
			get;
			set;
		}

		public Dictionary<string, string> events
		{
			get;
			set;
		}

		public IList<ViewEndpoint> endpoints
		{
			get;
			set;
		}

		public string status
		{
			get;
			set;
		}

		public string[] endpointIds
		{
			get
			{
				if (endpoints == null)
				{
					return null;
				}
				List<string> list = new List<string>();
				foreach (ViewEndpoint endpoint in endpoints)
				{
					list.Add(endpoint.uuid);
				}
				return list.ToArray();
			}
		}

		public ViewNode()
		{
			
			
		}
	}
}
