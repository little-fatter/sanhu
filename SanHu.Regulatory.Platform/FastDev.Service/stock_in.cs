using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FastDev.Common;

using FastDev.Model.Entity;
using FastDev.DevDB;

namespace FastDev.Service
{
    public class stock_in : ServiceBase, IService
    {
        public stock_in()
        {
            OnSave += stock_in_OnSave;

            OnBeforeSave += stock_in_OnBeforeSave;

            OnGetNameData += stock_in_OnGetNameData;

            OnDelete += stock_in_OnDelete;

        }



        void stock_in_OnSave(object entity, object viewdata, bool isCreate)
        {
            var db = this.QueryDb;

            var viewData = viewdata as Model.Form.stock_in;

            if (viewData == null)
            {
                throw new UserException("提交数据有误，请检查！");
            }
            if (!isCreate)
            {
                var status = db.ExecuteScalar<string>("select Status from stock_in where ID = @0", viewData.ID);
                if (status == RecordStatus.Approved)
                {
                    db.AbortTransaction();
                    throw new UserException(string.Format("单据已经审批，不允许修改"));
                }
            }
            var details = viewData.Details;


            if (details == null || !details.Any())
            {
                throw new UserException("明细信息不能为空,请检查！");
            }

            foreach (var detail in details)
            {
                if (detail.Status == RecordStatus.Deleted) continue;
                if (detail.Product != null && detail.Product.Any())
                {
                    detail.ProductID = detail.Product[0];

                    if (string.IsNullOrEmpty(detail.ProductID) && !string.IsNullOrEmpty(detail.Product[1]))
                    {
                        detail.ProductID = db.ExecuteScalar<string>("select id from res_product where ProCode = @0", detail.Product[1]);
                        detail.Product[0] = detail.ProductID;
                    }
                }
                if (detail.Warehouse != null && detail.Warehouse.Any())
                {
                    detail.WarehouseID = detail.Warehouse[0];

                    if (string.IsNullOrEmpty(detail.WarehouseID) && !string.IsNullOrEmpty(detail.Warehouse[1]))
                    {
                        detail.WarehouseID = db.ExecuteScalar<string>("select id from res_product where ProCode = @0", detail.Warehouse[1]);
                        detail.Warehouse[0] = detail.WarehouseID;
                    }
                }
            }

            if (details.Any(a => a.ProductID == null && a.Status != RecordStatus.Deleted))
            {
                throw new UserException("请选择产品,产品不能为空");
            }


            if (details.Any(a => a.WarehouseID == null && a.Status != RecordStatus.Deleted))
            {
                throw new UserException("请选择仓库,仓库不能为空");
            }

            if (details.Any(a => a.Quantity == null && a.Status != RecordStatus.Deleted))
            {
                throw new UserException("请输入数量,数量不能为空");
            }
        }


        void stock_in_OnBeforeSave(object entityObj, object viewdata, bool isInsert)
        {
            var db = this.QueryDb;
            var sn = GetSN(db, "stock_pileDetail", "SerialNumber");
            var entity = entityObj as Model.Entity.stock_in;
            var viewData = viewdata as Model.Form.stock_in;

            var id = entity.ID;

            var detailIndex = 0;
            var userid = entity.CreateUserID;

            if (entity.Status == RecordStatus.Approved)
            {
                throw new UserException(string.Format("单据{0}已经审批，不能修改", entity.OrderNo));
            }
            db.Update("stock_in", "ID", new
            {
                ID = id,
                Status = RecordStatus.Approved
            }, id);


            var details = db.Fetch<Model.Entity.stock_indetails>("where OrderID = @0", id);
            foreach (var detail in details)
            {
                detailIndex++;

                var pile = db.FirstOrDefault<Model.Entity.stock_stockPile>("where ProductID = @0 and StoreHouseID = @1", detail.ProductID, detail.WarehouseID);
                var isCreate = false;
                if (pile == null)
                {
                    isCreate = true;
                    pile = new Model.Entity.stock_stockPile();
                    pile.ID = Guid.NewGuid().ToString();
                    pile.CreateDate = DateTime.Now;
                    pile.CreateUserID = userid;
                    pile.ProductID = detail.ProductID;
                    pile.StoreHouseID = detail.WarehouseID;
                    pile.ProMode = detail.ProMode;
                    pile.UnitName = detail.UnitName;
                }
                pile.ModifyDate = DateTime.Now;
                pile.ModifyUserID = userid;

                int curQuantity = pile.Quantity == null ? 0 : pile.Quantity.Value;

                if (detail.Quantity != null)
                {
                    pile.Quantity = curQuantity + detail.Quantity;
                }


                if (detail.ProductID == null)
                {
                    throw new Exception("单据" + entity.OrderNo + "第" + detailIndex + "行记录产品不能为空，请检查");
                }
                if (detail.WarehouseID == null)
                {
                    throw new Exception("单据" + entity.OrderNo + "第" + detailIndex + "行记录仓库不能为空，请检查");
                }

                var piledetail = new Model.Entity.stock_pileDetail();
                piledetail.ID = Guid.NewGuid().ToString();
                piledetail.SerialNumber = sn + detailIndex;
                piledetail.CreateDate = DateTime.Now;
                piledetail.CreateUserID = userid;
                piledetail.ProductID = detail.ProductID;
                piledetail.WarehouseID = detail.WarehouseID;
                piledetail.DocumentType = entity.InType == "other" ? "order_in" : "check_in";
                piledetail.DocumentNumber = entity.OrderNo;
                piledetail.DocumentID = entity.ID;
                piledetail.OperationType = "add";
                piledetail.ProMode = detail.ProMode;
                piledetail.UnitName = detail.UnitName;
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

        void stock_in_OnDelete(object[] args)
        {

            var db = this.QueryDb;
            if (args == null || args.Length == 0) return;
            var sn = GetSN(db, "stock_pileDetail", "SerialNumber");
            var entityIndex = 0;
            foreach (var id in args)
            {
                var entity = db.FirstOrDefault<Model.Entity.stock_in>("where ID = @0", id);
                var userid = entity.CreateUserID;

                entityIndex++;
                if (entity.Status == RecordStatus.Active)
                {
                    db.AbortTransaction();
                    throw new UserException(string.Format("单据{0}尚未审批", entity.OrderNo));
                }
                db.Update("stock_in", "ID", new
                {
                    ID = id,
                    Status = RecordStatus.Active
                });

                var detailIndex = 0;

                var details = db.Fetch<Model.Entity.stock_indetails>("where OrderID = @0", id);
                foreach (var detail in details)
                {
                    detailIndex++;
                    var pile = db.FirstOrDefault<Model.Entity.stock_stockPile>("where ProductID = @0 and StoreHouseID = @1", detail.ProductID, detail.WarehouseID);
                    var isCreate = false;
                    if (pile == null)
                    {
                        isCreate = true;
                        pile = new Model.Entity.stock_stockPile();
                        pile.ID = Guid.NewGuid().ToString();
                        pile.CreateDate = DateTime.Now;
                        pile.CreateUserID = userid;
                        pile.ProductID = detail.ProductID;
                        pile.StoreHouseID = detail.WarehouseID;
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
                    piledetail.ProductID = detail.ProductID;
                    piledetail.WarehouseID = detail.WarehouseID;
                    piledetail.DocumentType = entity.InType == "other" ? "order_in" : "check_in";
                    piledetail.DocumentNumber = entity.OrderNo;
                    piledetail.DocumentID = entity.ID;
                    piledetail.OperationType = "delete";

                    piledetail.IsInStock = 0;
                    piledetail.Quantity = -1 * detail.Quantity;
                    piledetail.PileTime = DateTime.Now;

                    if (detail.WarehouseID != null)
                    {
                        db.Insert("stock_pileDetail", "ID", false, piledetail);
                    }


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
        }



        void stock_in_OnGetNameData(object data)
        {
           
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




    }
}
