using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FastDev.Common;
using FastDev.Model.Entity;
using FastDev.DevDB;
using FastDev.DevDB.Rights;

namespace FastDev.Service
{
    public class case_order : ServiceBase, IService
    {
        public case_order()
        {

            OnGetAPIHandler += case_order_OnGetAPIHandler;
        }




        Func<APIContext, object> case_order_OnGetAPIHandler(string apiID)
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
            return null;
        }


        object Approved(APIContext context)
        {
            var db = this.QueryDb;

            if (string.IsNullOrEmpty(context.Context)) throw new UserException("请选择单据");

            db.BeginTransaction();
            try
            {
                var entityIndex = 0;
                var ids = context.Context.Split(';');
                foreach (var id in ids)
                {
                    entityIndex++;
                    var entity = db.FirstOrDefault<Model.Entity.case_order>("where ID = @0", id);
                    var userid = entity.CreateUserID;


                    if (entity.Status == RecordStatus.Void)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经作废", entity.Ordertitle));
                    }
                    if (entity.Status == RecordStatus.Approved)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经审批，请勿重复操作", entity.Ordertitle));
                    }
                    db.Update("case_order", "ID", new
                    {
                        ID = context.Context,
                        Status = RecordStatus.Approved
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


        object UnApproved(APIContext context)
        {
            var db = this.QueryDb;

            if (string.IsNullOrEmpty(context.Context)) throw new UserException("请选择单据");

            db.BeginTransaction();
            try
            {
                var entityIndex = 0;
                var ids = context.Context.Split(';');
                foreach (var id in ids)
                {
                    entityIndex++;
                    var entity = db.FirstOrDefault<Model.Entity.case_order>("where ID = @0", id);
                    var userid = entity.CreateUserID;


                    if (entity.Status == RecordStatus.Void)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经作废", entity.Ordertitle));
                    }
                    if (entity.Status == RecordStatus.Active || string.IsNullOrEmpty(entity.Status))
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}尚未审批", entity.Ordertitle));
                    }
                    db.Update("case_order", "ID", new
                    {
                        ID = context.Context,
                        Status = RecordStatus.Active
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
                    var entity = db.FirstOrDefault<Model.Entity.case_order>("where ID = @0", id);
                    var userid = entity.CreateUserID;

                    if (entity.Status == RecordStatus.Void)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经作废，请勿重复操作", entity.Ordertitle));
                    }
                    var oldStatus = entity.Status;

                    if (entity.Status == RecordStatus.Approved)
                    {
                        db.AbortTransaction();
                        throw new UserException(string.Format("单据{0}已经审批，请先进行反审批", entity.Ordertitle));
                    }

                    db.Update("case_order", "ID", new
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

            var ArrearsHistory = db.ExecuteScalar<string>("select sum(Arrears) from case_order where Status = @0 and CustomerID = @1", RecordStatus.Approved, context.Context);

            return new
            {
                ArrearsHistory = ArrearsHistory
            };

        }
    }
}
