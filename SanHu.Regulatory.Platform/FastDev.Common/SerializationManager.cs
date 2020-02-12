using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace FastDev.Common
{
	public sealed class SerializationManager
	{
		public delegate string TypeSerializeHandler(object obj);

		public delegate object TypeDeserializeHandler(string data);

		private static Dictionary<Type, KeyValuePair<TypeSerializeHandler, TypeDeserializeHandler>> handlers;

		static SerializationManager()
		{
			handlers = new Dictionary<Type, KeyValuePair<TypeSerializeHandler, TypeDeserializeHandler>>();
			InitDefaultSerializeHandlers();
		}

		public static string Serialize(object obj)
		{
			if (obj == null)
			{
				return null;
			}
			if (handlers.ContainsKey(obj.GetType()))
			{
				return handlers[obj.GetType()].Key(obj);
			}
			StringBuilder stringBuilder = new StringBuilder();
			StringWriter stringWriter = new StringWriter(stringBuilder);
			XmlSerializer xmlSerializer = new XmlSerializer(obj.GetType());
			xmlSerializer.Serialize(stringWriter, obj);
			stringWriter.Close();
			return stringBuilder.ToString();
		}

		public static object Deserialize(Type returnType, string data)
		{
			if (data == null)
			{
				return null;
			}
			if (handlers.ContainsKey(returnType))
			{
				return handlers[returnType].Value(data);
			}
			StringReader stringReader = new StringReader(data);
			XmlSerializer xmlSerializer = new XmlSerializer(returnType);
			object result = xmlSerializer.Deserialize(stringReader);
			stringReader.Close();
			return result;
		}

		public static void RegisterSerializeHandler(Type type, TypeSerializeHandler serializeHandler, TypeDeserializeHandler deserializeHandler)
		{
			lock (handlers)
			{
				if (handlers.ContainsKey(type))
				{
					handlers[type] = new KeyValuePair<TypeSerializeHandler, TypeDeserializeHandler>(serializeHandler, deserializeHandler);
				}
				else
				{
					handlers.Add(type, new KeyValuePair<TypeSerializeHandler, TypeDeserializeHandler>(serializeHandler, deserializeHandler));
				}
			}
		}

		public static void UnregisterSerializeHandler(Type type)
		{
			lock (handlers)
			{
				if (handlers.ContainsKey(type))
				{
					handlers.Remove(type);
				}
			}
		}

		private static void InitDefaultSerializeHandlers()
		{
			RegisterSerializeHandler(typeof(string), ToString, LoadString);
			RegisterSerializeHandler(typeof(int), ToString, LoadInt);
			RegisterSerializeHandler(typeof(long), ToString, LoadLong);
			RegisterSerializeHandler(typeof(short), ToString, LoadShort);
			RegisterSerializeHandler(typeof(byte), ToString, LoadByte);
			RegisterSerializeHandler(typeof(bool), ToString, LoadBool);
			RegisterSerializeHandler(typeof(decimal), ToString, LoadDecimal);
			RegisterSerializeHandler(typeof(char), ToString, LoadChar);
			RegisterSerializeHandler(typeof(sbyte), ToString, LoadSbyte);
			RegisterSerializeHandler(typeof(float), ToString, LoadFloat);
			RegisterSerializeHandler(typeof(double), ToString, LoadDouble);
			RegisterSerializeHandler(typeof(byte[]), ByteArrayToString, LoadByteArray);
			RegisterSerializeHandler(typeof(Guid), ToString, LoadGuid);
			RegisterSerializeHandler(typeof(DateTime), ToString, LoadDateTime);
		}

		private static string ToString(object obj)
		{
			return obj.ToString();
		}

		private static object LoadString(string data)
		{
			return data;
		}

		private static object LoadInt(string data)
		{
			return int.Parse(data);
		}

		private static object LoadLong(string data)
		{
			return long.Parse(data);
		}

		private static object LoadShort(string data)
		{
			return short.Parse(data);
		}

		private static object LoadByte(string data)
		{
			return byte.Parse(data);
		}

		private static object LoadBool(string data)
		{
			return bool.Parse(data);
		}

		private static object LoadDecimal(string data)
		{
			return decimal.Parse(data);
		}

		private static object LoadChar(string data)
		{
			return char.Parse(data);
		}

		private static object LoadSbyte(string data)
		{
			return sbyte.Parse(data);
		}

		private static object LoadFloat(string data)
		{
			return float.Parse(data);
		}

		private static object LoadDouble(string data)
		{
			return double.Parse(data);
		}

		private static string ByteArrayToString(object obj)
		{
			return Convert.ToBase64String((byte[])obj);
		}

		private static object LoadByteArray(string data)
		{
			return Convert.FromBase64String(data);
		}

		private static object LoadGuid(string data)
		{
			return new Guid(data);
		}

		private static object LoadDateTime(string data)
		{
			return DateTime.Parse(data);
		}
	}
}
