using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FastDev.Common;

using FastDev.Model.Entity;
using FastDev.DevDB;

namespace FastDev.Service
{
    public class sales_order : ServiceBase, IService
    {
        public sales_order()
        {
            OnSave += sales_order_OnSave;

            OnDelete += sales_order_OnDelete;

            OnAfterGetDetailData += sales_order_OnAfterGetDetailData;

            OnGetAPIHandler += sales_order_OnGetAPIHandler;
        }

        Func<APIContext, object> sales_order_OnGetAPIHandler(string apiID)
        {
            if (string.Compare(apiID, "approved", true) == 0)
            {
                return Approved;
            }
            if (string.Compare(apiID, "unapproved", true) == 0)
            {
                return UnApproved;
            }
            if (string.Compare(apiID, "void", true) == 0)
            {
                return VoidOrder;
            }
            if (string.Compare(apiID, "getpay", true) == 0)
            {
                return GetPay;
            }
            return null;
        }

        void sales_order_OnAfterGetDetailData(object query, object dataobj)
        {
            var db = this.QueryDb;

            var data = dataobj as Dictionary<string, object>;

            var customer = data["Customer"] as IList<string>;
            if (customer == null || customer.Count != 2) return;

            var arrearssum = db.ExecuteScalar<string>("select sum(Arrears) from sales_order where Status = @0 and CustomerID = @1", RecordStatus.Approved, customer[0]);
            var ArrearsHistory = string.IsNullOrEmpty(arrearssum) ? 0 : Convert.ToDecimal(arrearssum);

            data["ArrearsHistory"] = ArrearsHistory;

            if (data["Status"] != null && data["Status"] != Convert.DBNull && data["Status"].ToString() == RecordStatus.Approved)
            {
                data["ArrearsTotal"] = ArrearsHistory;
            }
            else
            {

                if (data["Arrears"] == Convert.DBNull || string.IsNullOrEmpty(data["Arrears"].ToString()))
                {
                    data["ArrearsTotal"] = ArrearsHistory;
                }
                else
                {
                    var value = data["Arrears"].ToString();
                    data["ArrearsTotal"] = ArrearsHistory + Convert.ToDecimal(value);
                }
            }
        }

        void sales_order_OnDelete(object[] args)
        {
            var db = this.QueryDb;

            foreach (var curId in args)
            {
                var order = db.FirstOrDefault<Model.Entity.sales_order>("where ID = @0", curId);
                if (order != null)
                {
                    if (order.Status == RecordStatus.Approved)
                    {
                        throw new UserException(string.Format("单据{0}已经审批,不允许删除", order.OrderNo));
                    }
                }
            }
        }



        void sales_order_OnSave(object entity, object viewdata, bool isCreate)
        {
            var db = this.QueryDb;


            if (viewdata == null)
            {
                throw new UserException("提交数据有误，请检查！");
            }

            var viewData = viewdata as Model.Form.sales_order;

            if (viewData == null)
            {
                throw new UserException("提交数据有误，请检查！");
            }
            if (!isCreate)
            {
                var status = db.ExecuteScalar<string>("select Status from sales_order where ID = @0", viewData.ID);
                if (status == RecordStatus.Approved)
                {
                    db.AbortTransaction();
                    throw new UserException(string.Format("单据已经审批，不允许修改"));
                }
            }

            //if (viewData.Customer == null || !viewData.Customer.Any() || string.IsNullOrEmpty(viewData.Customer[0]))
            //{
            //    throw new UserException("客户是必填的,请检查！");
            //}
            var details = viewData.Details;


            if (details == null || !details.Any())
            {
                throw new UserException("明细信息不能为空,请检查！");
            }

            foreach (var detail in details)
            {
                if (detail.Status == RecordStatus.Deleted) continue;
                if (detail.Products != null && detail.Products.Any())
                {
                    detail.ProductsID = detail.Products[0];

                    if (string.IsNullOrEmpty(detail.ProductsID) && !string.IsNullOrEmpty(detail.Products[1]))
                    {
                        detail.ProductsID = db.ExecuteScalar<string>("select id from res_product where ProCode = @0", detail.Products[1]);
                        detail.Products[0] = detail.ProductsID;
                    }
                }
                if (detail.Warehouse != null && detail.Warehouse.Any())
                {
                    detail.WarehouseID = detail.Products[0];

                    if (string.IsNullOrEmpty(detail.WarehouseID) && !string.IsNullOrEmpty(detail.Warehouse[1]))
                    {
                        detail.WarehouseID = db.ExecuteScalar<string>("select id from res_product where ProCode = @0", detail.Warehouse[1]);
                        detail.Warehouse[0] = detail.WarehouseID;
                    }
                }
            }

            if (details.Any(a => a.ProductsID == null && a.Status != RecordStatus.Deleted))
            {
                throw new UserException("请选择产品,产品不能为空");
            }
            if (details.Any(a => a.WarehouseID == null && a.Status != RecordStatus.Deleted))
            {
                throw new UserException("请选择仓库,仓库不能为空");
            }
            if (details.Any(a => a.Quantity == null && a.Status != RecordStatus.Deleted))
            {
                throw new UserException("请输入数量");
            }
            if (details.Any(a => a.UnitPrice == null && a.Status != RecordStatus.Deleted))
            {
                throw new UserException("请输入单价,单价不能为空");
            }
        }



        string GetSN(PetaPoco.Database db, string modename, string fieldname)
        {
            var autoCodeRule = db.FirstOrDefault<FastDev.DevDB.Model.core_autoCode>("where ModelName = @0 and FieldName = @1", modename, fieldname);
            if (autoCodeRule != null)
            {
                return new FastDev.DevDB.AutoCode.AutoCodeService(db, autoCodeRule).GetNewAutoCode();
            }
            return "";
        }


        object Approved(APIContext context)
        {
            var db = this.QueryDb;

            if (string.IsNullOrEmpty(context.Context)) throw new UserException("请选择单据");

            db.BeginTransaction();
            try
            {
                var sn = GetSN(db, "stock_pileDetail", "SerialNumber");
                var entityIndex = 0;
                var ids = context.Context.Split(';');
                foreach (var id in ids)
                {
                    var detailIndex = 0;
                    entityIndex++;
                    var entity = db.FirstOrDefault<Model.Entity.sales_order>("where ID = @0", id);
                    var userid = entity.CreateUserID;


                    if (entity.Status == RecordStatus.Void)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经作废", entity.OrderNo));
                    }
                    if (entity.Status == RecordStatus.Approved)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经审批，请勿重复操作", entity.OrderNo));
                    }
                    //if (string.IsNullOrEmpty(entity.CustomerID) )
                    //{
                    //    db.AbortTransaction();
                    //    throw new UserException(string.Format("单据{0}客户不能为空，请检查", entity.OrderNo));
                    //}

                    db.Update("sales_order", "ID", new
                    {
                        ID = context.Context,
                        Status = RecordStatus.Approved
                    }, id);


                    var details = db.Fetch<Model.Entity.sales_orderdetail>("where OrderID = @0", id);
                    foreach (var detail in details)
                    {
                        detailIndex++;
                        var pile = db.FirstOrDefault<Model.Entity.stock_stockPile>("where ProductID = @0 and StoreHouseID = @1", detail.ProductsID, detail.WarehouseID);
                        var isCreate = false;
                        if (pile == null)
                        {
                            isCreate = true;
                            pile = new Model.Entity.stock_stockPile();
                            pile.ID = Guid.NewGuid().ToString();
                            pile.CreateDate = DateTime.Now;
                            pile.CreateUserID = userid;
                            pile.ProductID = detail.ProductsID;
                            pile.StoreHouseID = detail.WarehouseID;
                            pile.ProMode = detail.ProMode;
                            pile.UnitName = detail.UnitName;
                        }
                        pile.ModifyDate = DateTime.Now;
                        pile.ModifyUserID = userid;

                        int curQuantity = pile.Quantity == null ? 0 : pile.Quantity.Value;


                        if (detail.Quantity != null)
                        {
                            pile.Quantity = curQuantity - detail.Quantity;
                        }


                        var piledetail = new Model.Entity.stock_pileDetail();
                        piledetail.ID = Guid.NewGuid().ToString();
                        piledetail.SerialNumber = sn + entityIndex + detailIndex;
                        piledetail.CreateDate = DateTime.Now;
                        piledetail.CreateUserID = userid;
                        piledetail.ProductID = detail.ProductsID;
                        piledetail.WarehouseID = detail.WarehouseID;
                        piledetail.DocumentType = "sales_order";
                        piledetail.DocumentNumber = entity.OrderNo;
                        piledetail.DocumentID = entity.ID;
                        piledetail.OperationType = "approved";
                        piledetail.ProMode = detail.ProMode;
                        piledetail.UnitName = detail.UnitName;
                        piledetail.IsInStock = 0;
                        piledetail.Quantity = -1 * detail.Quantity;

                        piledetail.PileTime = DateTime.Now;
                        db.Insert("stock_pileDetail", "ID", false, piledetail);

                        if (isCreate)
                        {
                            db.Insert("stock_stockPile", "ID", false, pile);
                        }
                        else
                        {
                            db.Update("stock_stockPile", "ID", pile, pile.ID);
                        }
                    }
                }

                db.CompleteTransaction();
            }
            catch (Exception err)
            {
                db.AbortTransaction();
                throw err;
            }
            return context.Context;
        }


        object UnApproved(APIContext context)
        {
            var db = this.QueryDb;

            if (string.IsNullOrEmpty(context.Context)) throw new UserException("请选择单据");

            db.BeginTransaction();
            try
            {
                var sn = GetSN(db, "stock_pileDetail", "SerialNumber");
                var entityIndex = 0;
                var ids = context.Context.Split(';');
                foreach (var id in ids)
                {
                    var detailIndex = 0;
                    entityIndex++;
                    var entity = db.FirstOrDefault<Model.Entity.sales_order>("where ID = @0", id);
                    var userid = entity.CreateUserID;


                    if (entity.Status == RecordStatus.Void)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经作废", entity.OrderNo));
                    }
                    if (entity.Status == RecordStatus.Active || string.IsNullOrEmpty(entity.Status))
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}尚未审批", entity.OrderNo));
                    }
                    db.Update("sales_order", "ID", new
                    {
                        ID = context.Context,
                        Status = RecordStatus.Active
                    }, id);



                    var details = db.Fetch<Model.Entity.sales_orderdetail>("where OrderID = @0", id);
                    foreach (var detail in details)
                    {
                        detailIndex++;
                        var pile = db.FirstOrDefault<Model.Entity.stock_stockPile>("where ProductID = @0 and StoreHouseID = @1", detail.ProductsID, detail.WarehouseID);
                        var isCreate = false;
                        if (pile == null)
                        {
                            isCreate = true;
                            pile = new Model.Entity.stock_stockPile();
                            pile.ID = Guid.NewGuid().ToString();
                            pile.CreateDate = DateTime.Now;
                            pile.CreateUserID = userid;
                            pile.ProductID = detail.ProductsID;
                            pile.StoreHouseID = detail.WarehouseID;
                        }
                        pile.ModifyDate = DateTime.Now;
                        pile.ModifyUserID = userid;

                        int curQuantity = pile.Quantity == null ? 0 : pile.Quantity.Value;

                        if (detail.Quantity != null)
                        {
                            pile.Quantity = curQuantity + detail.Quantity;
                        }


                        var piledetail = new Model.Entity.stock_pileDetail();
                        piledetail.ID = Guid.NewGuid().ToString();
                        piledetail.SerialNumber = sn + entityIndex + detailIndex;
                        piledetail.CreateDate = DateTime.Now;
                        piledetail.CreateUserID = userid;
                        piledetail.ProductID = detail.ProductsID;
                        piledetail.WarehouseID = detail.WarehouseID;
                        piledetail.DocumentType = "sales_order";
                        piledetail.DocumentNumber = entity.OrderNo;
                        piledetail.DocumentID = entity.ID;
                        piledetail.OperationType = "unapproved";

                        piledetail.IsInStock = 1;
                        piledetail.Quantity = detail.Quantity;

                        piledetail.PileTime = DateTime.Now;
                        db.Insert("stock_pileDetail", "ID", false, piledetail);

                        if (isCreate)
                        {
                            db.Insert("stock_stockPile", "ID", false, pile);
                        }
                        else
                        {
                            db.Update("stock_stockPile", "ID", pile, pile.ID);
                        }
                    }
                }

                db.CompleteTransaction();
            }
            catch (Exception err)
            {
                db.AbortTransaction();
                throw err;
            }
            return context.Context;
        }

        object VoidOrder(APIContext context)
        {
            var db = this.QueryDb;

            if (string.IsNullOrEmpty(context.Context)) throw new UserException("请选择销售单");

            db.BeginTransaction();
            try
            {
                var ids = context.Context.Split(';');
                foreach (var id in ids)
                {
                    var entity = db.FirstOrDefault<Model.Entity.sales_order>("where ID = @0", id);
                    var userid = entity.CreateUserID;

                    if (entity.Status == RecordStatus.Void)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经作废，请勿重复操作", entity.OrderNo));
                    }
                    var oldStatus = entity.Status;

                    if (entity.Status == RecordStatus.Approved)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经审批，请先进行反审批", entity.OrderNo));
                    }

                    db.Update("sales_order", "ID", new
                    {
                        ID = context.Context,
                        Status = RecordStatus.Void
                    }, id);

                }

                db.CompleteTransaction();
            }
            catch (Exception err)
            {
                db.AbortTransaction();
                throw err;
            }
            return context.Context;
        }

        object GetPay(APIContext context)
        {
            var db = this.QueryDb;
            if (string.IsNullOrEmpty(context.Context)) throw new UserException("客户不能为空");

            var ArrearsHistory = db.ExecuteScalar<string>("select sum(Arrears) from sales_order where Status = @0 and CustomerID = @1", RecordStatus.Approved, context.Context);

            return new
            {
                ArrearsHistory = ArrearsHistory
            };

        }
    }
}
