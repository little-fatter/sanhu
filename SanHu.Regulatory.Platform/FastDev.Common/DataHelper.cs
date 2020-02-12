using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Reflection.Emit;
using System.Runtime.Serialization.Formatters.Binary;

namespace FastDev.Common
{
	public class DataHelper
	{
		public static object Clone(object obj)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				BinaryFormatter binaryFormatter = new BinaryFormatter();
				binaryFormatter.Serialize(memoryStream, obj);
				memoryStream.Position = 0L;
				return binaryFormatter.Deserialize(memoryStream);
			}
		}

		public static IEnumerable<TTarget> ConvertList<TSource, TTarget>(List<TSource> list)
		{
			List<TTarget> list2 = new List<TTarget>();
			foreach (TSource item in list)
			{
				list2.Add((TTarget)ConvertValue(typeof(TTarget), item));
			}
			return list2;
		}

		public static IEnumerable ListDataToEnumerable<TSource>(List<TSource> list, Type targetType)
		{
			if (targetType == typeof(int))
			{
				return ConvertList<TSource, int>(list);
			}
			if (targetType == typeof(double))
			{
				return ConvertList<TSource, double>(list);
			}
			if (targetType == typeof(decimal))
			{
				return ConvertList<TSource, decimal>(list);
			}
			if (targetType == typeof(string))
			{
				return ConvertList<TSource, string>(list);
			}
			if (targetType == typeof(byte[]))
			{
				return ConvertList<TSource, byte[]>(list);
			}
			return ConvertList<TSource, object>(list);
		}

		private static bool CheckStruct(Type type)
		{
			return type.IsValueType && !type.IsEnum && !type.IsPrimitive && !type.IsSerializable;
		}

		public static object ConvertValue(Type type, object value)
		{
			if (Convert.IsDBNull(value) || value == null)
			{
				return null;
			}
			if (CheckStruct(type))
			{
				string data = value.ToString();
				return SerializationManager.Deserialize(type, data);
			}
			Type type2 = value.GetType();
			if (type == type2)
			{
				return value;
			}
			if ((type == typeof(Guid) || type == typeof(Guid?)) && type2 == typeof(string))
			{
				if (string.IsNullOrEmpty(value.ToString()))
				{
					return null;
				}
				return new Guid(value.ToString());
			}
			if ((type == typeof(DateTime) || type == typeof(DateTime?)) && type2 == typeof(string))
			{
				if (string.IsNullOrEmpty(value.ToString()))
				{
					return null;
				}
				return Convert.ToDateTime(value);
			}
			if (type.IsEnum)
			{
				try
				{
					return Enum.Parse(type, value.ToString(), true);
				}
				catch
				{
					return Enum.ToObject(type, value);
				}
			}
			if (type == typeof(bool) || type == typeof(bool?))
			{
				bool result = false;
				if (bool.TryParse(value.ToString(), out result))
				{
					return result;
				}
				if (string.IsNullOrEmpty(value.ToString()))
				{
					return false;
				}
				return true;
			}
			if (type.IsGenericType)
			{
				type = type.GetGenericArguments()[0];
			}
			return Convert.ChangeType(value, type);
		}

		public static TResult ConvertValue<TResult>(object value)
		{
			if (Convert.IsDBNull(value) || value == null)
			{
				return default(TResult);
			}
			object obj = ConvertValue(typeof(TResult), value);
			if (obj == null)
			{
				return default(TResult);
			}
			return (TResult)obj;
		}

		public static void SetPropertyValue(Type type, object obj, string name, object value)
		{
			PropertyInfo property = type.GetProperty(name, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
			if (property != null)
			{
				property.SetValue(obj, value, null);
			}
		}

		public static object GetPropertyValue(Type type, object obj, string name)
		{
			PropertyInfo property = type.GetProperty(name, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
			if (property != null)
			{
				return property.GetValue(obj, null);
			}
			return null;
		}

		public static Action<object, object[]> CreateSetProperties(PropertyInfo[] infos)
		{
			Type classTypeByProperty = GetClassTypeByProperty(infos);
			DynamicMethod dynamicMethod = new DynamicMethod("", null, new Type[2]
			{
				typeof(object),
				typeof(object[])
			}, true);
			ILGenerator iLGenerator = dynamicMethod.GetILGenerator();
			LocalBuilder localBuilder = iLGenerator.DeclareLocal(classTypeByProperty);
			iLGenerator.Emit(OpCodes.Ldarg_0);
			iLGenerator.Emit(OpCodes.Unbox_Any, classTypeByProperty);
			iLGenerator.Emit(OpCodes.Stloc_0);
			for (int i = 0; i < infos.Length; i++)
			{
				Label label = iLGenerator.DefineLabel();
				Type propertyType = infos[i].PropertyType;
				iLGenerator.Emit(OpCodes.Ldarg_1);
				Ldc(iLGenerator, i);
				iLGenerator.Emit(OpCodes.Ldelem_Ref);
				iLGenerator.Emit(OpCodes.Ldnull);
				iLGenerator.Emit(OpCodes.Ceq);
				iLGenerator.Emit(OpCodes.Brtrue_S, label);
				iLGenerator.Emit(OpCodes.Ldloc_0);
				iLGenerator.Emit(OpCodes.Ldarg_1);
				Ldc(iLGenerator, i);
				iLGenerator.Emit(OpCodes.Ldelem_Ref);
				iLGenerator.Emit(OpCodes.Unbox_Any, propertyType);
				iLGenerator.Emit(OpCodes.Callvirt, infos[i].GetSetMethod());
				iLGenerator.MarkLabel(label);
			}
			iLGenerator.Emit(OpCodes.Ret);
			return dynamicMethod.CreateDelegate(typeof(Action<object, object[]>)) as Action<object, object[]>;
		}

		public static Func<object, object[]> CreateGetProperties(PropertyInfo[] infos)
		{
			Type classTypeByProperty = GetClassTypeByProperty(infos);
			DynamicMethod dynamicMethod = new DynamicMethod("", typeof(object[]), new Type[1]
			{
				typeof(object)
			}, true);
			ILGenerator iLGenerator = dynamicMethod.GetILGenerator();
			LocalBuilder local = iLGenerator.DeclareLocal(typeof(object));
			LocalBuilder local2 = iLGenerator.DeclareLocal(typeof(object[]));
			LocalBuilder local3 = iLGenerator.DeclareLocal(classTypeByProperty);
			iLGenerator.Emit(OpCodes.Ldarg_0);
			iLGenerator.Emit(OpCodes.Unbox_Any, classTypeByProperty);
			iLGenerator.Emit(OpCodes.Stloc, local3);
			Ldc(iLGenerator, infos.Length);
			iLGenerator.Emit(OpCodes.Newarr, typeof(object));
			iLGenerator.Emit(OpCodes.Stloc, local2);
			for (int i = 0; i < infos.Length; i++)
			{
				iLGenerator.Emit(OpCodes.Ldloc, local3);
				iLGenerator.Emit(OpCodes.Callvirt, infos[i].GetGetMethod());
				if (infos[i].PropertyType.IsValueType)
				{
					iLGenerator.Emit(OpCodes.Box, infos[i].PropertyType);
				}
				iLGenerator.Emit(OpCodes.Stloc, local);
				iLGenerator.Emit(OpCodes.Ldloc, local2);
				Ldc(iLGenerator, i);
				iLGenerator.Emit(OpCodes.Ldloc, local);
				iLGenerator.Emit(OpCodes.Stelem_Ref);
			}
			iLGenerator.Emit(OpCodes.Ldloc, local2);
			iLGenerator.Emit(OpCodes.Ret);
			return dynamicMethod.CreateDelegate(typeof(Func<object, object[]>)) as Func<object, object[]>;
		}

		private static Type GetClassTypeByProperty(PropertyInfo[] infos)
		{
			if (infos == null || infos.Length <= 0)
			{
				throw new ArgumentNullException("infos");
			}
			return infos[0].ReflectedType;
		}

		private static void Ldc(ILGenerator il, int value)
		{
			switch (value)
			{
			case -1:
				il.Emit(OpCodes.Ldc_I4_M1);
				break;
			case 0:
				il.Emit(OpCodes.Ldc_I4_0);
				break;
			case 1:
				il.Emit(OpCodes.Ldc_I4_1);
				break;
			case 2:
				il.Emit(OpCodes.Ldc_I4_2);
				break;
			case 3:
				il.Emit(OpCodes.Ldc_I4_3);
				break;
			case 4:
				il.Emit(OpCodes.Ldc_I4_4);
				break;
			case 5:
				il.Emit(OpCodes.Ldc_I4_5);
				break;
			case 6:
				il.Emit(OpCodes.Ldc_I4_6);
				break;
			case 7:
				il.Emit(OpCodes.Ldc_I4_7);
				break;
			case 8:
				il.Emit(OpCodes.Ldc_I4_8);
				break;
			default:
				if (value > -129 && value < 128)
				{
					il.Emit(OpCodes.Ldc_I4_S, (sbyte)value);
				}
				else
				{
					il.Emit(OpCodes.Ldc_I4, value);
				}
				break;
			}
		}
	}
}
