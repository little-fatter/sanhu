using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FD.Common.ActionValue
{
    public class DateTimeConverter : JsonConverter<DateTime>
    {
        /// <summary>
                    /// 获取或设置DateTime格式
                    /// <para>默认为: yyyy-MM-dd HH:mm:ss</para>
                    /// </summary>
        public string DateTimeFormat { get; set; } = "yyyy-MM-dd HH:mm:ss";

        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)//=> DateTime.Parse(reader.GetString());
        {
            //return DateTime.Parse(reader.GetString());
            if (reader.TokenType == JsonTokenType.String)
            {
                if (DateTime.TryParse(reader.GetString(), out DateTime date))
                    return date;
            }
            return reader.GetDateTime();
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        //=> writer.WriteStringValue(value.ToString(this.DateTimeFormat));
        {
            writer.WriteStringValue(value.ToString(this.DateTimeFormat));
        }
    }

    public class DateTimeNullConverter : JsonConverter<DateTime?>
    {
        /// <summary>
                    /// 获取或设置DateTime格式
                    /// <para>默认为: yyyy-MM-dd HH:mm:ss</para>
                    /// </summary>
        public string DateTimeFormat { get; set; } = "yyyy-MM-dd HH:mm:ss";

        public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        //   => string.IsNullOrEmpty(reader.GetString()) ? default(DateTime?) : DateTime.Parse(reader.GetString());
        {
            return string.IsNullOrEmpty(reader.GetString()) ? default(DateTime?) : DateTime.Parse(reader.GetString());
        }

        public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value?.ToString(this.DateTimeFormat));
        }
    }
}
