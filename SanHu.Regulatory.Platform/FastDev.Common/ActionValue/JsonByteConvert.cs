using Newtonsoft.Json;
using System;

namespace FD.Common.ActionValue
{
    public class JsonByteConvert : JsonConverter
    {
        private string[] arrBString { get; set; }

        public JsonByteConvert()
        {
            arrBString = "true,false,True,False".Split(',');
        }


        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            bool isNullable = IsNullableType(objectType);
            Type t = isNullable ? Nullable.GetUnderlyingType(objectType) : objectType;

            if (reader.TokenType == JsonToken.Null)
            {
                if (!IsNullableType(objectType))
                {
                    throw new Exception(string.Format("不能转换null value to {0}.", objectType));
                }
                return null;
            }

            try
            {
                if (reader.TokenType == JsonToken.String)
                {
                    string boolText = reader.Value.ToString();
                    if (boolText.Equals(arrBString[0], StringComparison.OrdinalIgnoreCase))
                    {
                        return (byte)1;
                    }
                    else if (boolText.Equals(arrBString[1], StringComparison.OrdinalIgnoreCase))
                    {
                        return (byte)0;
                    }
                    else if (boolText.Equals(arrBString[3], StringComparison.OrdinalIgnoreCase))
                    {
                        return (byte)1;
                    }
                    else if (boolText.Equals(arrBString[4], StringComparison.OrdinalIgnoreCase))
                    {
                        return (byte)0;
                    }
                }
                if (reader.TokenType == JsonToken.Boolean)
                {
                    return Convert.ToBoolean(reader.Value) ? (byte)1 : (byte)0;
                }
                if (reader.TokenType == JsonToken.Integer)
                {
                    //数值
                    return Convert.ToByte(reader.Value);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(string.Format("Error converting value {0} to type '{1}'", reader.Value, objectType));
            }
            return serializer.Deserialize(reader, objectType);
        }

        /// <summary>
        /// 判断是否为Bool类型
        /// </summary>
        /// <param name="objectType">类型</param>
        /// <returns>为bool类型则可以进行转换</returns>
        public override bool CanConvert(Type objectType)
        {
            if (objectType == typeof(byte) || objectType == typeof(byte?))
                return true;
            return false;
        }


        public bool IsNullableType(Type t)
        {
            if (t == null)
            {
                throw new ArgumentNullException("t");
            }
            return (t.BaseType.FullName == "System.ValueType" && t.GetGenericTypeDefinition() == typeof(Nullable<>));
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            serializer.Serialize(writer, value);
        }
    }
}
