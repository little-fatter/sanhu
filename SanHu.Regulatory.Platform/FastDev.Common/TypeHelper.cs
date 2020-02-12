using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace FastDev.Common
{
	public static class TypeHelper
	{
		public static Type FindIEnumerable(Type seqType)
		{
			if (seqType == null || seqType == typeof(string))
			{
				return null;
			}
			if (seqType.IsArray)
			{
				return typeof(IEnumerable<>).MakeGenericType(seqType.GetElementType());
			}
			if (seqType.IsGenericType)
			{
				Type[] genericArguments = seqType.GetGenericArguments();
				foreach (Type type in genericArguments)
				{
					Type type2 = typeof(IEnumerable<>).MakeGenericType(type);
					if (type2.IsAssignableFrom(seqType))
					{
						return type2;
					}
				}
			}
			Type[] interfaces = seqType.GetInterfaces();
			if (interfaces != null && interfaces.Length > 0)
			{
				Type[] genericArguments = interfaces;
				foreach (Type seqType2 in genericArguments)
				{
					Type type2 = FindIEnumerable(seqType2);
					if (type2 != null)
					{
						return type2;
					}
				}
			}
			if (seqType.BaseType != null && seqType.BaseType != typeof(object))
			{
				return FindIEnumerable(seqType.BaseType);
			}
			return null;
		}

		public static Type GetSequenceType(Type elementType)
		{
			return typeof(IEnumerable<>).MakeGenericType(elementType);
		}

		public static Type GetElementType(Type seqType)
		{
			Type type = FindIEnumerable(seqType);
			if (type == null)
			{
				return seqType;
			}
			return type.GetGenericArguments()[0];
		}

		public static bool IsNullableType(Type type)
		{
			return type != null && type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>);
		}

		public static bool IsNullAssignable(Type type)
		{
			return !type.IsValueType || IsNullableType(type);
		}

		public static Type GetNonNullableType(Type type)
		{
			if (IsNullableType(type))
			{
				return type.GetGenericArguments()[0];
			}
			return type;
		}

		public static Type GetNullAssignableType(Type type)
		{
			if (!IsNullAssignable(type))
			{
				return typeof(Nullable<>).MakeGenericType(type);
			}
			return type;
		}

		public static ConstantExpression GetNullConstant(Type type)
		{
			return Expression.Constant(null, GetNullAssignableType(type));
		}

		public static Type GetMemberType(MemberInfo mi)
		{
			FieldInfo fieldInfo = mi as FieldInfo;
			if (fieldInfo != null)
			{
				return fieldInfo.FieldType;
			}
			PropertyInfo propertyInfo = mi as PropertyInfo;
			if (propertyInfo != null)
			{
				return propertyInfo.PropertyType;
			}
			EventInfo eventInfo = mi as EventInfo;
			if (eventInfo != null)
			{
				return eventInfo.EventHandlerType;
			}
			MethodInfo methodInfo = mi as MethodInfo;
			if (methodInfo != null)
			{
				return methodInfo.ReturnType;
			}
			return null;
		}

		public static object GetDefault(Type type)
		{
			if (type.IsValueType && !IsNullableType(type))
			{
				return Activator.CreateInstance(type);
			}
			return null;
		}

		public static bool IsReadOnly(MemberInfo member)
		{
			switch (member.MemberType)
			{
			case MemberTypes.Field:
				return (((FieldInfo)member).Attributes & FieldAttributes.InitOnly) != FieldAttributes.PrivateScope;
			case MemberTypes.Property:
			{
				PropertyInfo propertyInfo = (PropertyInfo)member;
				return !propertyInfo.CanWrite || propertyInfo.GetSetMethod() == null;
			}
			default:
				return true;
			}
		}

		public static bool IsInteger(Type type)
		{
			Type nonNullableType = GetNonNullableType(type);
			switch (Type.GetTypeCode(type))
			{
			case TypeCode.SByte:
			case TypeCode.Byte:
			case TypeCode.Int16:
			case TypeCode.UInt16:
			case TypeCode.Int32:
			case TypeCode.UInt32:
			case TypeCode.Int64:
			case TypeCode.UInt64:
				return true;
			default:
				return false;
			}
		}

		public static bool IsNumber(Type type)
		{
			Type nonNullableType = GetNonNullableType(type);
			switch (Type.GetTypeCode(nonNullableType))
			{
			case TypeCode.SByte:
			case TypeCode.Byte:
			case TypeCode.Int16:
			case TypeCode.UInt16:
			case TypeCode.Int32:
			case TypeCode.UInt32:
			case TypeCode.Int64:
			case TypeCode.UInt64:
			case TypeCode.Double:
			case TypeCode.Decimal:
				return true;
			default:
				return false;
			}
		}

		public static bool IsSimpleType(Type type)
		{
			return type.IsPrimitive || type == typeof(string) || type == typeof(decimal) || type == typeof(DateTime);
		}

		public static void SetValue(MemberInfo mi, object obj, object value)
		{
			FieldInfo fieldInfo = mi as FieldInfo;
			if (fieldInfo != null)
			{
				fieldInfo.SetValue(obj, value);
			}
			PropertyInfo propertyInfo = mi as PropertyInfo;
			if (propertyInfo != null)
			{
				propertyInfo.SetValue(obj, value, null);
			}
		}

		public static bool IsFieldOrProperty(MemberInfo mi)
		{
			FieldInfo left = mi as FieldInfo;
			if (left != null)
			{
				return true;
			}
			PropertyInfo left2 = mi as PropertyInfo;
			if (left2 != null)
			{
				return true;
			}
			return false;
		}
	}
}
