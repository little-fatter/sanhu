using FastDev.Common;
using FastDev.Common.Extensions;
using FastDev.DevDB;
using FastDev.DevDB.Models;
using FD.Common.ActionValue;
using Microsoft.AspNetCore.Mvc;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FD.Web.Extend
{
    public class NetController : Controller
	{
		private DbContext GetNetDatabase()
		{
			return SysContext.CreateDbContext(ConfigurationManager.AppSettings["NetDatabase"], "System.Data.SqlClient");
		}

		[VaildateUser]
		public ActionResult PagedData(string id, string model, string fullJson, string key)
		{
			try
			{
				QueryDescriptor descriptor = FullJsonValue.GetObject<QueryDescriptor>(fullJson);
				DbContext db = GetNetDatabase();
				if (!string.IsNullOrEmpty(id))
				{
					descriptor.Condition = GetIdFilter(id);
				}
				object data = null;
				if (string.Compare(model, "net_order", true) == 0)
				{
					data = GetPageDataByQuery<net_order>(db, descriptor);
				}
				else if (string.Compare(model, "net_user", true) == 0)
				{
					data = GetPageDataByQuery<net_user>(db, descriptor);
				}
				return Json(data);
			}
			catch (Exception ex)
			{
				return Json(new
				{
					statusCode = "3",
					data = ex.Message
				});
			}
		}

		[VaildateUser]
		public ActionResult ListData(string id, string model, FilterGroup filter, string key)
		{
			try
			{
				DbContext dbContext_ = GetNetDatabase();
				if (!string.IsNullOrEmpty(id))
				{
					filter = GetIdFilter(id);
				}
				object data = null;
				if (string.Compare(model, "net_order", true) == 0)
				{
					data = GetListDataByFilter<net_order>(dbContext_, filter);
				}
				if (string.Compare(model, "net_user", true) == 0)
				{
					data = GetListDataByFilter<net_user>(dbContext_, filter);
				}
				return Json(data);
			}
			catch (Exception ex)
			{
				return Json(new
				{
					statusCode = "3",
					data = ex.Message
				});
			}
		}

		[VaildateUser]
		public ActionResult DetailData(string model, string id, FilterGroup filter)
		{
			try
			{
				DbContext dbContext_ = GetNetDatabase();
				object data = null;
				if (string.IsNullOrEmpty(id) && filter.HasRule())
				{
					id = GetModelId(dbContext_, model, filter);
				}
				if (string.Compare(model, "net_order", true) == 0)
				{
					data = GetOrderById(dbContext_, id);
				}
				if (string.Compare(model, "net_user", true) == 0)
				{
					data = GetUserById(dbContext_, id);
				}
				return Json(new
				{
					data = data,
					statusCode = "1"
				});
			}
			catch (Exception ex)
			{
				return Json(new
				{
					statusCode = "3",
					message = ex.Message
				});
			}
		}

		[VaildateUser]
		public ActionResult SaveOrder(string method, net_order data)
		{
			DbContext dbContext = GetNetDatabase();
			try
			{
				bool flag = method == "create";
				dbContext.BeginTransaction();
				string currentUserId = "001";
				net_order net_order = flag ? new net_order() : dbContext.FirstOrDefault<net_order>("where ID = @0", new object[1]
				{
					data.ID
				});
				net_order.CustomerName = data.CustomerName;
				net_order.Product = data.Product;
				net_order.OrderTime = data.OrderTime;
				net_order.OrderNo = data.OrderNo;
				net_order.Weight = data.Weight;
				net_order.MValue = data.MValue;
				net_order.Remark = data.Remark;
				net_order.Price = data.Price;
				net_order.UnitPrice = data.UnitPrice;
				net_order.Arrears = data.Arrears;
				net_order.Payment = data.Payment;
				net_order.Receiver = data.Receiver;
				net_order.Address = data.Address;
				net_order.Phone = data.Phone;
				net_order.Zipcode = data.Zipcode;
				net_order.OrderStatus = data.OrderStatus;
				net_order.Express = data.Express;
				net_order.ExpressNo = data.ExpressNo;
				if (flag)
				{
					net_order.ID = Guid.NewGuid().ToString();
					net_order.CreateDate = DateTime.Now;
					net_order.CreateUserID = currentUserId;
					dbContext.Insert("net_order", "ID", false, net_order);
				}
				else
				{
					net_order.ModifyDate = DateTime.Now;
					net_order.ModifyUserID = currentUserId;
					dbContext.Update("net_order", "ID", net_order, net_order.ID);
				}
				dbContext.CompleteTransaction();
				return Json(new
				{
					statusCode = "1",
					data = net_order.ID
				});
			}
			catch (Exception ex)
			{
				dbContext.AbortTransaction();
				return Json(new
				{
					statusCode = "3",
					data = ex.Message
				});
			}
		}

		[VaildateUser]
		public ActionResult SaveUser(string method, net_user data)
		{
			DbContext dbContext = GetNetDatabase();
			try
			{
				bool flag = method == "create";
				dbContext.BeginTransaction();
				string text = "001";
				net_user net_user = flag ? new net_user() : dbContext.FirstOrDefault<net_user>("where ID = @0", new object[1]
				{
					data.ID
				});
				net_user.Address = data.Address;
				net_user.RealName = data.RealName;
				if (flag)
				{
					net_user.ID = Guid.NewGuid().ToString();
					net_user.CreateDate = DateTime.Now;
					net_user.CreateUserID = text;
					dbContext.Insert("net_user", "ID", false, net_user);
				}
				else
				{
					net_user.ModifyDate = DateTime.Now;
					net_user.ModifyUserID = text;
					dbContext.Update("net_user", "ID", net_user, net_user.ID);
				}
				dbContext.CompleteTransaction();
				return Json(new
				{
					statusCode = "1",
					data = net_user.ID
				});
			}
			catch (Exception ex)
			{
				dbContext.AbortTransaction();
				return Json(new
				{
					statusCode = "3",
					data = ex.Message
				});
			}
		}

		[VaildateUser]
		public ActionResult Delete(string model, string[] arg)
		{
			DbContext dbContext = GetNetDatabase();
			try
			{
				if (arg != null && arg.Any())
				{
					dbContext.BeginTransaction();
					FilterTranslator filterTranslator = new FilterTranslator();
					filterTranslator.Group = new FilterGroup();
					foreach (string value in arg)
					{
						filterTranslator.Group.rules.Add(new FilterRule
						{
							field = "ID",
							op = "equal",
							value = value
						});
					}
					filterTranslator.Group.op = "or";
					filterTranslator.Translate();
					if (string.Compare(model, "net_order", true) == 0)
					{
						dbContext.Delete<net_order>("where " + filterTranslator.CommandText, filterTranslator.Parms.ToArray());
					}
					dbContext.CompleteTransaction();
				}
				return Json(new
				{
					statusCode = "1"
				});
			}
			catch (Exception ex)
			{
				if (arg != null && arg.Any())
				{
					dbContext.AbortTransaction();
				}
				return Json(new
				{
					statusCode = "3",
					message = ex.Message
				});
			}
		}

		private object GetOrderById(DbContext db, string orderId)
		{
			return db.FirstOrDefault<net_order>("where id  = @0", new object[1]
			{
				orderId
			});
		}

		private object GetUserById(DbContext db, string userId)
		{
			return db.FirstOrDefault<net_user>("where id  = @0", new object[1]
			{
				userId
			});
		}

		private FilterGroup GetIdFilter(string idValue)
		{
			if (string.IsNullOrEmpty(idValue))
			{
				return new FilterGroup();
			}
			string[] array = idValue.Split(';');
			FilterGroup filterGroup = new FilterGroup();
			string[] array2 = array;
			foreach (string value in array2)
			{
				filterGroup.rules.Add(new FilterRule
				{
					field = "ID",
					value = value,
					op = "equal"
				});
			}
			filterGroup.op = "or";
			return filterGroup;
		}

		private int GetStrIndex(List<string> lst, string strFind)
		{
			int num = 0;
			while (true)
			{
				if (num >= lst.Count)
				{
					return -1;
				}
				string a = lst[num];
				if (a == strFind)
				{
					break;
				}
				num++;
			}
			return num;
		}

		private object GetPageDataByQuery<T>(DbContext db, QueryDescriptor queryDescriptor_0)
		{
			string text = null;
			string text2 = null;
			bool flag = false;
			bool flag2 = false;
			if (queryDescriptor_0.OrderBy != null && queryDescriptor_0.OrderBy.Any())
			{
				text = queryDescriptor_0.OrderBy[0].Key;
				text2 = ((queryDescriptor_0.OrderBy[0].Order == OrderSequence.ASC) ? "asc" : "desc");
			}
			if (queryDescriptor_0.PageIndex.HasValue && queryDescriptor_0.PageSize.HasValue)
			{
				flag2 = true;
				if (queryDescriptor_0.PageSize == 0L)
				{
					queryDescriptor_0.PageSize = 20L;
				}
			}
			if (!text.IsNullOrEmpty())
			{
				flag = true;
				text2 = ((text2.IsNullOrEmpty() || text2.EqualsTo("asc")) ? "asc" : "desc");
			}
			FilterTranslator filterTranslator = new FilterTranslator();
			if (queryDescriptor_0.Condition != null)
			{
				filterTranslator.Group = queryDescriptor_0.Condition;
			}
			filterTranslator.Translate();
			string commandText = filterTranslator.CommandText;
			commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
			if (flag)
			{
				commandText += string.Format(" order by {0} {1}", text, text2);
			}
			if (flag2)
			{
				Page<T> page = db.Page<T>(queryDescriptor_0.PageIndex.Value, queryDescriptor_0.PageSize.Value, commandText, filterTranslator.Parms.ToArray());
				return new PagedData(page.Items, page.TotalItems);
			}
			List<T> list = db.Fetch<T>(commandText, filterTranslator.Parms.ToArray());
			return new PagedData(list, list.Count);
		}

		private object GetListDataByFilter<T>(DbContext db, FilterGroup filter)
		{
			FilterTranslator filterTranslator = new FilterTranslator();
			if (filter != null)
			{
				filterTranslator.Group = filter;
			}
			filterTranslator.Translate();
			string commandText = filterTranslator.CommandText;
			commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
			return db.Fetch<T>(commandText, filterTranslator.Parms.ToArray());
		}

		private string GetModelId(DbContext db, string modelName, FilterGroup filter)
		{
			FilterTranslator filterTranslator = new FilterTranslator();
			if (filter != null)
			{
				filterTranslator.Group = filter;
			}
			filterTranslator.Translate();
			string commandText = filterTranslator.CommandText;
			commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
			commandText = string.Format("select ID from {0} ", modelName.ToUpper()) + commandText;
			return db.ExecuteScalar<string>(commandText, filterTranslator.Parms.ToArray());
		}
	}
}
