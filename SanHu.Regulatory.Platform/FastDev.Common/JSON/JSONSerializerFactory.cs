using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace FastDev.Common.JSON
{
	public class JSONSerializerFactory
	{
		private readonly IDictionary<RuntimeTypeHandle, Func<IJSONSerializer>> regFactories;

		private readonly IDictionary<RuntimeTypeHandle, Func<IJSONSerializer>> factories;

		public JSONSerializerFactory()
		{
			regFactories = new Dictionary<RuntimeTypeHandle, Func<IJSONSerializer>>();
			factories = GetDefaultFactories();
		}

		public JSONSerializerFactory Register<TService>(object serializer)
		{
			return Register<TService>(() => serializer as IJSONSerializer);
		}

		public JSONSerializerFactory Register<TService>(Func<IJSONSerializer> func)
		{
			RuntimeTypeHandle typeHandle = typeof(TService).TypeHandle;
			Func<IJSONSerializer> value = null;
			if (!regFactories.TryGetValue(typeHandle, out value) && value == null)
			{
				regFactories[typeHandle] = func;
			}
			return this;
		}

		private IDictionary<RuntimeTypeHandle, Func<IJSONSerializer>> GetDefaultFactories()
		{
			Dictionary<RuntimeTypeHandle, Func<IJSONSerializer>> dictionary = new Dictionary<RuntimeTypeHandle, Func<IJSONSerializer>>();
			dictionary.Add(typeof(DataSet).TypeHandle, () => new DataSetJSONSerializer());
			dictionary.Add(typeof(DataTable).TypeHandle, () => new DataSetJSONSerializer());
			dictionary.Add(typeof(ArrayList).TypeHandle, () => new MsJSONSerializer());
			dictionary.Add(typeof(Array).TypeHandle, () => new MsJSONSerializer());
			dictionary.Add(typeof(Hashtable).TypeHandle, () => new MsJSONSerializer());
			return dictionary;
		}

		public IJSONSerializer Create(RuntimeTypeHandle typeHandle)
		{
			Func<IJSONSerializer> value = null;
			regFactories.TryGetValue(typeHandle, out value);
			if (value == null)
			{
				factories.TryGetValue(typeHandle, out value);
			}
			if (value == null)
			{
				return new MsJSONSerializer();
			}
			IJSONSerializer iJSONSerializer = value();
			if (iJSONSerializer == null)
			{
				return new MsJSONSerializer();
			}
			return iJSONSerializer;
		}
	}
}
