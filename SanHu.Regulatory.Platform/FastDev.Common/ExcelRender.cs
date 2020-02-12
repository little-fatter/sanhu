using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Text;
using System.Web;

namespace FastDev.Common
{
	public class ExcelRender
	{
		public delegate int DBAction(string sql, params IDataParameter[] parameters);

		public static string ABCDEF;

		public static string ToColumnName(int columnIndex)
		{
			string text = "";
			if (columnIndex >= ABCDEF.Length)
			{
				text += ToColumnName(columnIndex / ABCDEF.Length - 1);
			}
			return text + ABCDEF.ToCharArray()[columnIndex % ABCDEF.Length];
		}

		public static int ToColumnIndex(string columnName)
		{
			if (string.IsNullOrEmpty(columnName))
			{
				return -1;
			}
			columnName = columnName.ToUpper();
			if (columnName.Length == 1)
			{
				return ABCDEF.IndexOf(columnName[0]);
			}
			return (ABCDEF.IndexOf(columnName[0]) + 1) * ABCDEF.Length + ABCDEF.IndexOf(columnName[1]);
		}

		public static ICellStyle GetHeaderCellStyle(HSSFWorkbook workbook)
		{
			ICellStyle cellStyle = workbook.CreateCellStyle();
			cellStyle.Alignment = HorizontalAlignment.Center;
			cellStyle.FillPattern = FillPattern.NoFill;
			cellStyle.IsHidden = false;
			cellStyle.IsLocked = false;
			cellStyle.VerticalAlignment = VerticalAlignment.Center;
			cellStyle.BorderBottom = BorderStyle.Thin;
			cellStyle.BorderLeft = BorderStyle.Thin;
			cellStyle.BorderRight = BorderStyle.Thin;
			cellStyle.BorderTop = BorderStyle.Thin;
			cellStyle.FillForegroundColor = 49;
			cellStyle.FillPattern = FillPattern.SolidForeground;
			IFont font = workbook.CreateFont();
			font.Boldweight = 700;
			cellStyle.SetFont(font);
			return cellStyle;
		}

		public static ICellStyle GetExampleHeaderCellStyle(HSSFWorkbook workbook)
		{
			ICellStyle cellStyle = workbook.CreateCellStyle();
			cellStyle.Alignment = HorizontalAlignment.Center;
			cellStyle.FillPattern = FillPattern.NoFill;
			cellStyle.IsHidden = false;
			cellStyle.IsLocked = false;
			cellStyle.VerticalAlignment = VerticalAlignment.Center;
			cellStyle.BorderBottom = BorderStyle.Thin;
			cellStyle.BorderLeft = BorderStyle.Thin;
			cellStyle.BorderRight = BorderStyle.Thin;
			cellStyle.BorderTop = BorderStyle.Thin;
			cellStyle.FillForegroundColor = 22;
			cellStyle.FillPattern = FillPattern.SolidForeground;
			IFont font = workbook.CreateFont();
			font.Boldweight = 700;
			font.Color = 16;
			cellStyle.SetFont(font);
			return cellStyle;
		}

		public static ICellStyle GetCellStyle(HSSFWorkbook workbook)
		{
			ICellStyle cellStyle = workbook.CreateCellStyle();
			cellStyle.Alignment = HorizontalAlignment.Left;
			cellStyle.FillBackgroundColor = HSSFColor.Grey40Percent.Index;
			cellStyle.FillPattern = FillPattern.NoFill;
			cellStyle.IsHidden = false;
			cellStyle.IsLocked = false;
			cellStyle.VerticalAlignment = VerticalAlignment.Center;
			cellStyle.BorderBottom = BorderStyle.Thin;
			cellStyle.BorderLeft = BorderStyle.Thin;
			cellStyle.BorderRight = BorderStyle.Thin;
			cellStyle.BorderTop = BorderStyle.Thin;
			return cellStyle;
		}

		public static void AddListFormula(IWorkbook workbook, ISheet sheet, string sheetName, string listFormula, int colIndex, int firstRow, IList<string> items, int createdCellIndex = 0)
		{
			ISheet sheet2 = workbook.GetSheet(sheetName);
			if (sheet2 == null)
			{
				sheet2 = workbook.CreateSheet(sheetName);
			}
			int sheetIndex = workbook.GetSheetIndex(sheet2);
			workbook.SetSheetHidden(sheetIndex, SheetState.Hidden);
			for (int i = 0; i < items.Count; i++)
			{
				string cellValue = items[i];
				IRow row = sheet2.GetRow(i);
				if (row == null)
				{
					row = sheet2.CreateRow(i);
				}
				ICell cell = row.GetCell(createdCellIndex);
				if (cell == null)
				{
					cell = row.CreateCell(createdCellIndex);
				}
				cell.SetCellValue(cellValue);
			}
			if (workbook.GetName(listFormula) == null)
			{
				IName name = workbook.CreateName();
				string text2 = name.RefersToFormula = sheetName + string.Format("!${0}$1:${0}${1}", ToColumnName(createdCellIndex), items.Count);
				name.NameName = listFormula;
			}
		}

		public static void AddValidationData(ISheet sheet, string listFormula, int colIndex, int firstRow, int lastRow = 65535)
		{
			CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, colIndex, colIndex);
			DVConstraint constraint = DVConstraint.CreateFormulaListConstraint(listFormula);
			HSSFDataValidation dataValidation = new HSSFDataValidation(regions, constraint);
			sheet.AddValidationData(dataValidation);
		}

		public static string GetCellValue(ICell cell)
		{
			if (cell != null)
			{
				switch (cell.CellType)
				{
				default:
					return cell.ToString();
				case CellType.String:
					return cell.StringCellValue;
				case CellType.Formula:
					try
					{
						HSSFFormulaEvaluator hSSFFormulaEvaluator = new HSSFFormulaEvaluator(cell.Sheet.Workbook);
						hSSFFormulaEvaluator.EvaluateInCell(cell);
						return cell.ToString();
					}
					catch
					{
						return cell.NumericCellValue.ToString();
					}
				case CellType.Blank:
					return string.Empty;
				case CellType.Boolean:
					return cell.BooleanCellValue.ToString();
				case CellType.Error:
					return cell.ErrorCellValue.ToString();
				}
			}
			return string.Empty;
		}

		private static void smethod_0(ISheet isheet_0)
		{
			if (isheet_0.PhysicalNumberOfRows > 0)
			{
				IRow row = isheet_0.GetRow(0);
				int i = 0;
				for (int lastCellNum = row.LastCellNum; i < lastCellNum; i++)
				{
					isheet_0.AutoSizeColumn(i);
				}
			}
		}

		private static void smethod_1(MemoryStream memoryStream_0, string string_0)
		{
			using (FileStream fileStream = new FileStream(string_0, FileMode.Create, FileAccess.Write))
			{
				byte[] array = memoryStream_0.ToArray();
				fileStream.Write(array, 0, array.Length);
				fileStream.Flush();
				array = null;
			}
		}

		private static void FileDownLoad(MemoryStream msFile, Microsoft.AspNetCore.Http.HttpContext context, string fName)
		{
			if (context.Request.Headers["User-Agent"].ToString().Contains("IE"))
			{
				fName = HttpUtility.UrlEncode(fName);
			}
			context.Response.Headers.Add("Content-Disposition", "attachment;fileName=" + fName);
			context.Response.Body.Write(msFile.ToArray());
		}

		public static MemoryStream RenderToExcel(IDataReader reader)
		{
			MemoryStream memoryStream = new MemoryStream();
			using (reader)
			{
				IWorkbook workbook = new HSSFWorkbook();
				ISheet sheet = workbook.CreateSheet();
				IRow row = sheet.CreateRow(0);
				int fieldCount = reader.FieldCount;
				for (int i = 0; i < fieldCount; i++)
				{
					row.CreateCell(i).SetCellValue(reader.GetName(i));
				}
				int num = 1;
				while (reader.Read())
				{
					IRow row2 = sheet.CreateRow(num);
					for (int i = 0; i < fieldCount; i++)
					{
						row2.CreateCell(i).SetCellValue(reader[i].ToString());
					}
					num++;
				}
				smethod_0(sheet);
				workbook.Write(memoryStream);
				memoryStream.Flush();
				memoryStream.Position = 0L;
			}
			return memoryStream;
		}

		public static void RenderToExcel(IDataReader reader, string fileName)
		{
			using (MemoryStream memoryStream_ = RenderToExcel(reader))
			{
				smethod_1(memoryStream_, fileName);
			}
		}

		public static void RenderToExcel(IDataReader reader, Microsoft.AspNetCore.Http.HttpContext context, string fileName)
		{
			using (MemoryStream ms = RenderToExcel(reader))
			{
				FileDownLoad(ms, context, fileName);
			}
		}

		public static MemoryStream RenderToExcel(DataTable table)
		{
			MemoryStream memoryStream = new MemoryStream();
			using (table)
			{
				IWorkbook workbook = new HSSFWorkbook();
				ISheet sheet = workbook.CreateSheet();
				IRow row = sheet.CreateRow(0);
				foreach (DataColumn column in table.Columns)
				{
					row.CreateCell(column.Ordinal).SetCellValue(column.Caption);
				}
				int num = 1;
				foreach (DataRow row3 in table.Rows)
				{
					IRow row2 = sheet.CreateRow(num);
					foreach (DataColumn column2 in table.Columns)
					{
						row2.CreateCell(column2.Ordinal).SetCellValue(row3[column2].ToString());
					}
					num++;
				}
				smethod_0(sheet);
				workbook.Write(memoryStream);
				memoryStream.Flush();
				memoryStream.Position = 0L;
			}
			return memoryStream;
		}

		public static void RenderToExcel(DataTable table, string fileName)
		{
			using (MemoryStream memoryStream_ = RenderToExcel(table))
			{
				smethod_1(memoryStream_, fileName);
			}
		}

		public static void RenderToExcel(DataTable table, Microsoft.AspNetCore.Http.HttpContext context, string fileName)
		{
			using (MemoryStream ms = RenderToExcel(table))
			{
				FileDownLoad(ms, context, fileName);
			}
		}

		public static bool HasData(Stream excelFileStream)
		{
			return HasData(excelFileStream, 0);
		}

		public static bool HasData(Stream excelFileStream, int sheetIndex)
		{
			using (excelFileStream)
			{
				IWorkbook workbook = new HSSFWorkbook(excelFileStream);
				if (workbook.NumberOfSheets > 0 && sheetIndex < workbook.NumberOfSheets)
				{
					ISheet sheetAt = workbook.GetSheetAt(sheetIndex);
					return sheetAt.PhysicalNumberOfRows > 0;
				}
			}
			return false;
		}

		public static DataTable RenderFromExcel(Stream excelFileStream, string sheetName)
		{
			return RenderFromExcel(excelFileStream, sheetName, 0);
		}

		public static DataTable RenderFromExcel(Stream excelFileStream, string sheetName, int headerRowIndex)
		{
			DataTable result = null;
			using (excelFileStream)
			{
				IWorkbook workbook = new HSSFWorkbook(excelFileStream);
				ISheet sheet = workbook.GetSheet(sheetName);
				result = smethod_3(sheet, headerRowIndex);
			}
			return result;
		}

		public static DataTable RenderFromExcel(Stream excelFileStream)
		{
			return RenderFromExcel(excelFileStream, 0, 0);
		}

		public static DataTable RenderFromExcel(Stream excelFileStream, int sheetIndex)
		{
			return RenderFromExcel(excelFileStream, sheetIndex, 0);
		}

		public static DataTable RenderFromExcel(Stream excelFileStream, int sheetIndex, int headerRowIndex)
		{
			DataTable result = null;
			using (excelFileStream)
			{
				IWorkbook workbook = new HSSFWorkbook(excelFileStream);
				ISheet sheetAt = workbook.GetSheetAt(sheetIndex);
				result = smethod_3(sheetAt, headerRowIndex);
			}
			return result;
		}

		private static DataTable smethod_3(ISheet isheet_0, int int_0)
		{
			DataTable dataTable = new DataTable();
			IRow row = isheet_0.GetRow(int_0);
			int lastCellNum = row.LastCellNum;
			int lastRowNum = isheet_0.LastRowNum;
			for (int i = row.FirstCellNum; i < lastCellNum; i++)
			{
				DataColumn column = new DataColumn(row.GetCell(i).StringCellValue);
				dataTable.Columns.Add(column);
			}
			for (int i = isheet_0.FirstRowNum + 1; i <= lastRowNum; i++)
			{
				IRow row2 = isheet_0.GetRow(i);
				DataRow dataRow = dataTable.NewRow();
				if (row2 != null)
				{
					for (int j = row2.FirstCellNum; j < lastCellNum; j++)
					{
						if (row2.GetCell(j) != null)
						{
							dataRow[j] = GetCellValue(row2.GetCell(j));
						}
					}
				}
				dataTable.Rows.Add(dataRow);
			}
			return dataTable;
		}

		public static int RenderToDb(Stream excelFileStream, string insertSql, DBAction dbAction)
		{
			return RenderToDb(excelFileStream, insertSql, dbAction, 0, 0);
		}

		public static int RenderToDb(Stream excelFileStream, string insertSql, DBAction dbAction, int sheetIndex, int headerRowIndex)
		{
			int num = 0;
			using (excelFileStream)
			{
				IWorkbook workbook = new HSSFWorkbook(excelFileStream);
				ISheet sheetAt = workbook.GetSheetAt(sheetIndex);
				StringBuilder stringBuilder = new StringBuilder();
				IRow row = sheetAt.GetRow(headerRowIndex);
				int lastCellNum = row.LastCellNum;
				int lastRowNum = sheetAt.LastRowNum;
				for (int i = sheetAt.FirstRowNum + 1; i <= lastRowNum; i++)
				{
					IRow row2 = sheetAt.GetRow(i);
					if (row2 != null)
					{
						stringBuilder.Append(insertSql);
						stringBuilder.Append(" values (");
						for (int j = row2.FirstCellNum; j < lastCellNum; j++)
						{
							stringBuilder.AppendFormat("'{0}',", GetCellValue(row2.GetCell(j)).Replace("'", "''"));
						}
						stringBuilder.Length--;
						stringBuilder.Append(");");
					}
					if ((i % 50 == 0 || i == lastRowNum) && stringBuilder.Length > 0)
					{
						num += dbAction(stringBuilder.ToString());
						stringBuilder.Length = 0;
					}
				}
			}
			return num;
		}

		public static void SetCellRangeAddress(ISheet sheet, int rowstart, int rowend, int colstart, int colend)
		{
			CellRangeAddress region = new CellRangeAddress(rowstart, rowend, colstart, colend);
			sheet.AddMergedRegion(region);
		}

		public ExcelRender()
		{
			
			
		}

		static ExcelRender()
		{
			
			ABCDEF = "abcdefghijklmnopqrstuvwxyz".ToUpper();
		}
	}
}
