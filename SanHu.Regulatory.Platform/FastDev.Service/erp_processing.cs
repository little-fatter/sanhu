using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using FastDev.DevDB;
using FastDev.Common;
using FastDev.DevDB.Model;
using Microsoft.CSharp;
using System.CodeDom.Compiler;
using System.Dynamic;
using System.Data;
using System.Data.Common;
using System.Threading;


namespace FastDev.Service
{
    public class erp_processing : ServiceBase, IService
    {

        public erp_processing()
        {
            OnSave += erp_processing_OnSave;

            OnDelete += erp_processing_OnDelete;

            OnBeforeSave += erp_processing_OnBeforeSave;

            OnGetAPIHandler += erp_processing_OnGetAPIHandler;

            OnGetPagedData += erp_processing_OnGetPagedData;
        }

        void erp_processing_OnGetPagedData(object data)
        {
            var db = this.QueryDb;
            var queryDescriptor = data as QueryDescriptor;
            FilterGroup filter = null;
            if (queryDescriptor != null)
            {
                filter = queryDescriptor.Condition;

            }
            else
            {
                filter = data as FilterGroup;
                if (filter == null)
                {
                    return;
                }
            }

            if (filter.groups.Count > 0)
            {
                foreach (var group in filter.groups)
                {
                    for (var i = group.rules.Count - 1; i >= 0; i--)
                    {
                        var rule = group.rules[i];

                        if (rule.field == "OldProductID" && rule.value != null && rule.value.ToString().StartsWith("text:"))
                        {
                            var procode = rule.value.ToString().Substring("text:".Length);

                            if (!string.IsNullOrEmpty(procode))
                            {
                                var ids = db.Fetch<string>("select ID from res_product where ProCode like '%" + ParseValue(procode) + "%'");
                                var newgroup = new FilterGroup();
                                newgroup.op = "or";
                                foreach (var id in ids)
                                {
                                    newgroup.rules.Add(new FilterRule()
                                    {
                                        field = rule.field,
                                        op = "equal",
                                        value = id
                                    });
                                }
                                filter.groups.Add(newgroup);
                            }
                            group.rules.Remove(rule);
                            return;
                        }
                    }
                }
            }
        }

        private string ParseValue(string value)
        {
            if (value == null) return value;
            value = value.ToLower().Trim();
            value = value.Replace("exec", "");
            value = value.Replace("delete", "");
            value = value.Replace("master", "");
            value = value.Replace("truncate", "");
            value = value.Replace("declare", "");
            value = value.Replace("create", "");
            value = value.Replace("update", "");
            value = value.Replace("select", "");
            return value;
        }

        Func<APIContext, object> erp_processing_OnGetAPIHandler(string apiID)
        {
            if (string.Compare(apiID, "completed", true) == 0)
            {
                return Completed;
            }
            return null;
        }

        void erp_processing_OnBeforeSave(object entitydata, object viewdata, bool isCreate)
        {
            var db = this.QueryDb;

            if (isCreate)
            {
                var sn = GetSN(db, "stock_pileDetail", "SerialNumber");
                var entity = entitydata as Model.Entity.erp_processing;
                var id = entity.ID;

                var userid = entity.CreateUserID;

                if (entity.OldProductID == null)
                {
                    throw new UserException("型号是必填的,请检查");
                }
                if (entity.OldWarehouseID == null)
                {
                    throw new UserException("出库是必填的,请检查");
                }
                if (entity.Status == RecordStatus.Running)
                {
                    db.AbortTransaction();
                    throw new UserException(string.Format("加工单{0}已经进行中，请勿重复操作", entity.ProcessingNo));
                }
                if (entity.Status == RecordStatus.Completed)
                {
                    db.AbortTransaction();
                    throw new UserException(string.Format("加工单{0}已经完成！", entity.ProcessingNo));
                }
                db.Update("erp_processing", "ID", new
                {
                    ID = id,
                    Status = RecordStatus.Running
                }, id);


                if (entity.OldWeight != null)
                {
                    UpdatePile(db, userid, entity.ProcessingNo, entity.ID, entity.OldProductID, entity.OldWarehouseID, entity.OldWeight.Value, 0, sn, false);
                }
                else
                {
                    throw new UserException("重量是必填的,请检查");
                }

            }
        }

        void erp_processing_OnDelete(object[] args)
        {
            var db = this.QueryDb;

            foreach (var curId in args)
            {
                var order = db.FirstOrDefault<Model.Entity.erp_processing>("where ID = @0", curId);
                if (order != null)
                {
                    if (order.Status == RecordStatus.Running)
                    {
                        throw new UserException(string.Format("加工单{0}已经进行中,不允许删除", order.ProcessingNo));
                    }
                    if (order.Status == RecordStatus.Completed)
                    {
                        throw new UserException(string.Format("加工单{0}已经完成,不允许删除", order.ProcessingNo));
                    }
                }
            }

        }

        void erp_processing_OnSave(object entity, object viewdata, bool isCreate)
        {
            var db = this.QueryDb;

            if (viewdata == null)
            {
                throw new UserException("提交数据有误，请检查！");
            }
            var viewData = viewdata as Model.Form.erp_processing;

            if (viewData == null)
            {
                throw new UserException("提交数据有误，请检查！");
            }
            if (!isCreate)
            {
                var status = db.ExecuteScalar<string>("select Status from erp_processing where ID = @0", viewData.ID);
                if (status == RecordStatus.Running)
                {
                    db.AbortTransaction();
                    throw new UserException(string.Format("加工单已经进行中，不允许修改"));
                }
                if (status == RecordStatus.Completed)
                {
                    db.AbortTransaction();
                    throw new UserException(string.Format("加工单已经完成，不允许修改"));
                }
            }
        }

        string GetSN(PetaPoco.Database db, string modename, string fieldname)
        {
            var autoCodeRule = db.FirstOrDefault<core_autoCode>("where ModelName = @0 and FieldName = @1", modename, fieldname);
            if (autoCodeRule != null)
            {
                return new FastDev.DevDB.AutoCode.AutoCodeService(db, autoCodeRule).GetNewAutoCode();
            }
            return "";
        }

        object Completed(APIContext context)
        {
            var db = this.QueryDb;

            if (string.IsNullOrEmpty(context.Context)) throw new UserException("请选择加工单");

            db.BeginTransaction();
            try
            {
                var sn = GetSN(db, "stock_pileDetail", "SerialNumber");
                var entityIndex = 0;

                var ids = context.Context.Split(';');
                foreach (var id in ids)
                {
                    entityIndex++;
                    var entity = db.FirstOrDefault<Model.Entity.erp_processing>("where ID = @0", id);
                    var userid = entity.CreateUserID;

                    if (entity.Status == RecordStatus.Completed)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("加工单{0}已经完成，请勿重复操作", entity.ProcessingNo));
                    }
                    if (entity.Status != RecordStatus.Running)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("加工单{0}尚未进行", entity.ProcessingNo));
                    }

                    var post =JsonHelper.DeserializeJsonToObject<Model.Form.erp_processing>(context.Data);


                    if (string.IsNullOrEmpty(post.NewWarehouseID))
                    {
                        db.AbortTransaction();
                        throw new UserException("入库不能为空");
                    }
                    if (post.NewWeight == null)
                    {
                        db.AbortTransaction();
                        throw new UserException("重量不能为空");
                    }
                    if (post.NewMValue == null)
                    {
                        db.AbortTransaction();
                        throw new UserException("米数不能为空");
                    }
                    if (post.NewCodeValue == null)
                    {
                        db.AbortTransaction();
                        throw new UserException("码数不能为空");
                    }
                    db.Update("erp_processing", "ID", new
                    {
                        ID = context.Context,
                        NewWeight = post.NewWeight,
                        Rate = post.Rate,
                        Finishtime = post.Finishtime,
                        NewWidth = post.NewWeight,
                        NewMValue = post.NewMValue,
                        Lossrate = post.Lossrate,
                        NewHeight = post.NewHeight,
                        NewCodeValue = post.NewCodeValue,
                        NewWarehouseID = post.NewWarehouseID,
                        Status = RecordStatus.Completed
                    }, id);


                    if (post.NewWeight != null)
                    {
                        UpdatePile(db, userid, entity.ProcessingNo, entity.ID, entity.OldProductID, post.NewWarehouseID, post.NewWeight.Value, post.NewMValue.Value, sn + entityIndex, true);
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

        private void UpdatePile(PetaPoco.Database db, string userid, string orderno, string orderid, string productid, string warehouseID, decimal weight, decimal mvalue, string serialNumber, bool isIn)
        {
            var pile = db.FirstOrDefault<Model.Entity.stock_stockPile>("where ProductID = @0 and StoreHouseID = @1", productid, warehouseID);
            var isCreate = false;
            if (pile == null)
            {
                isCreate = true;
                pile = new Model.Entity.stock_stockPile();
                pile.ID = Guid.NewGuid().ToString();
                pile.CreateDate = DateTime.Now;
                pile.CreateUserID = userid;
                pile.ProductID = productid;
                pile.StoreHouseID = warehouseID;
            }
            pile.ModifyDate = DateTime.Now;
            pile.ModifyUserID = userid;

            decimal curWieght = pile.Weight == null ? 0 : pile.Weight.Value;
            decimal curMValue = pile.MValue == null ? 0 : pile.MValue.Value;

            if (isIn)
            {
                pile.Weight = curWieght + weight;
                pile.MValue = curMValue + mvalue;
            }
            else
            {
                pile.Weight = curWieght - weight;
            }

            var piledetail = new Model.Entity.stock_pileDetail();
            piledetail.ID = Guid.NewGuid().ToString();
            piledetail.SerialNumber = serialNumber;
            piledetail.CreateDate = DateTime.Now;
            piledetail.CreateUserID = userid;
            piledetail.ProductID = productid;
            piledetail.WarehouseID = warehouseID;
            piledetail.DocumentType = "processing";
            piledetail.DocumentNumber = orderno;
            piledetail.DocumentID = orderid;

            if (isIn)
            {
                piledetail.OperationType = "doneprocessing";
                piledetail.IsInStock = 1;
                piledetail.Weight = weight;
                piledetail.MValue = mvalue;
            }
            else
            {
                piledetail.OperationType = "startprocessing";

                piledetail.IsInStock = 0;
                piledetail.Weight = -1 * weight;

            }

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
}
