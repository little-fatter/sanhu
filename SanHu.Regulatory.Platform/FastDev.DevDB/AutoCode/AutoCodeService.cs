using FastDev.DevDB.Model;
using PetaPoco;
using System;
using System.Text;

namespace FastDev.DevDB.AutoCode
{
    /// <summary>
    /// ×Ô¶¯±àÂë
    /// </summary>
	public class AutoCodeService
	{
		private Database DBMain=null;

		private core_autoCode autoCode=null;

		public AutoCodeService(Database db, core_autoCode rule)
		{
            DBMain = db;
			autoCode = rule;
		}

		public string GetNewAutoCode()
		{
			core_autoCode core_autoCode = autoCode;
			if (core_autoCode == null)
			{
				return null;
			}
			string value = Code4Databse(core_autoCode);
			StringBuilder stringBuilder = new StringBuilder();
			if (!string.IsNullOrEmpty(core_autoCode.Prefix))
			{
				stringBuilder.Append(core_autoCode.Prefix);
			}
			stringBuilder.Append(Code2String(core_autoCode));
			if (!string.IsNullOrEmpty(core_autoCode.Infix))
			{
				stringBuilder.Append(core_autoCode.Infix);
			}
			stringBuilder.Append(value);
			if (!string.IsNullOrEmpty(core_autoCode.Suffix))
			{
				stringBuilder.Append(core_autoCode.Suffix);
			}
			return stringBuilder.ToString();
		}

		private string Code2String(core_autoCode data)
		{
			string text = DateTime.Now.Year.ToString();
			string text2 = DateTime.Now.Month.ToString();
			string text3 = DateTime.Now.Day.ToString();
			if (string.Compare(data.DatePart, "null", true) == 0)
			{
				return "";
			}
			if (string.Compare(data.DatePart, "y", true) == 0)
			{
				return text;
			}
			if (string.Compare(data.DatePart, "ym", true) == 0)
			{
				return text + ((text2.Length < 2) ? ("0" + text2) : text2);
			}
			if (string.Compare(data.DatePart, "ymd", true) == 0)
			{
				return text + ((text2.Length < 2) ? ("0" + text2) : text2) + ((text3.Length < 2) ? ("0" + text3) : text3);
			}
			return "";
		}

		private string Code4Databse(core_autoCode data)
		{
			int year = DateTime.Now.Year;
			int month = DateTime.Now.Month;
			int day = DateTime.Now.Day;
			string rev = null;
			core_autoCodeInfo core_autoCodeInfo = null;
			if (string.Compare(data.DatePart, "null", true) == 0)
			{
				core_autoCodeInfo = DBMain.FirstOrDefault<core_autoCodeInfo>("where AutoCodeID = @0 and Year is null and Month is null and Day is null", new object[1]
				{
					data.ID
				});
			}
			else if (string.Compare(data.DatePart, "y", true) == 0)
			{
				core_autoCodeInfo = DBMain.FirstOrDefault<core_autoCodeInfo>("where AutoCodeID = @0 and Year = @1 and Month is null and Day is null", new object[2]
				{
					data.ID,
					year
				});
			}
			else if (string.Compare(data.DatePart, "ym", true) == 0)
			{
				core_autoCodeInfo = DBMain.FirstOrDefault<core_autoCodeInfo>("where AutoCodeID = @0 and Year = @1 and Month = @2 and Day is null", new object[3]
				{
					data.ID,
					year,
					month
				});
			}
			else if (string.Compare(data.DatePart, "ymd", true) == 0)
			{
				core_autoCodeInfo = DBMain.FirstOrDefault<core_autoCodeInfo>("where AutoCodeID = @0 and Year = @1 and Month = @2 and Day = @3", new object[4]
				{
					data.ID,
					year,
					month,
					day
				});
			}
			if (core_autoCodeInfo == null)
			{
				core_autoCodeInfo = new core_autoCodeInfo();
				core_autoCodeInfo.CreateDate = DateTime.Now;
				core_autoCodeInfo.CreateUserID = SysContext.CurrentUserID;
				core_autoCodeInfo.ModifyDate = DateTime.Now;
				core_autoCodeInfo.ModifyUserID = SysContext.CurrentUserID;
				core_autoCodeInfo.ID = Guid.NewGuid().ToString();
				core_autoCodeInfo.AutoCodeID = data.ID;
				core_autoCodeInfo.SerialNumber = ((!data.SerialNumberStart.HasValue) ? 1 : data.SerialNumberStart.Value);
				rev = Convert.ToInt32(core_autoCodeInfo.SerialNumber).ToString();
				if (data.DatePart.StartsWith("y"))
				{
					core_autoCodeInfo.Year = year;
				}
				if (data.DatePart.StartsWith("ym"))
				{
					core_autoCodeInfo.Month = month;
				}
				if (string.Compare(data.DatePart, "ymd", true) == 0)
				{
					core_autoCodeInfo.Day = day;
				}
				DBMain.Insert("core_autoCodeInfo", "ID", false, core_autoCodeInfo);
			}
			else
			{
				core_autoCodeInfo core_autoCodeInfo2 = core_autoCodeInfo;
				core_autoCodeInfo2.SerialNumber += (decimal?)((!data.SerialNumberStep.HasValue) ? 1 : data.SerialNumberStep.Value);
				core_autoCodeInfo.ModifyDate = DateTime.Now;
				core_autoCodeInfo.ModifyUserID = SysContext.CurrentUserID;
				DBMain.Update("core_autoCodeInfo", "ID", core_autoCodeInfo, core_autoCodeInfo.ID);
				rev = Convert.ToInt32(core_autoCodeInfo.SerialNumber).ToString();
			}
			if (data.SerialNumberLenght.HasValue)
			{
				int value = data.SerialNumberLenght.Value;
				while (rev.Length < value)
				{
					rev = "0" + rev;
				}
			}
			return rev;
		}
	}
}
