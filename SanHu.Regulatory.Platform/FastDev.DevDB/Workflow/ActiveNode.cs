using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB.Workflow
{
	public class ActiveNode : NodeBase
	{
		
		/// <summary>
		/// 1 抢占
		/// 2 3 同时
		/// 4   会签
		/// </summary>
		public string handlerType
		{
			get;
			set;
		}

		public string backType
		{
			get;
			set;
		}

		public byte? oneByone
		{
			get;
			set;
		}

		public byte? nextConfirm
		{
			get;
			set;
		}

		public byte? backIsReturn
		{
			get;
			set;
		}

		public byte? allowSetExecutor
		{
			get;
			set;
		}

		public string toDoTitleRule
		{
			get;
			set;
		}

		public IList<IList<string>> backNodes
		{
			get;
			set;
		}

		public IList<IList<string>> executorDepartment
		{
			get;
			set;
		}

		public IList<IList<string>> executorRole
		{
			get;
			set;
		}

		public IList<IList<string>> executorUser
		{
			get;
			set;
		}

		public byte? sampleRole
		{
			get;
			set;
		}

		public byte? sampleDepartment
		{
			get;
			set;
		}

		public ActiveNode()
		{
			
			
		}
	}
}
