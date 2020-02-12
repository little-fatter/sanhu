using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FastDev.Common;

using FastDev.Model;
using FastDev.DevDB;


namespace FastDev.Service
{
    public class res_product : ServiceBase, IService
    {
        public res_product()
        {
            OnSave += res_product_OnSave;

            OnDelete += res_product_OnDelete;

            OnBeforeSave += res_product_OnBeforeSave;

            OnGetListData += res_product_OnGetListData;

            OnGetNameData += res_product_OnGetNameData;

            OnGetPagedData += res_product_OnGetPagedData;
        }

        void res_product_OnDelete(object[] args)
        {
            var db = this.QueryDb;
            foreach (var arg in args)
            {

                var entity = db.FirstOrDefault<FastDev.Model.Entity.res_product>("where ID = @0", arg.ToString());

                if (entity == null)
                {
                    throw new UserException("提交数据有误，请检查！");
                }

                if (db.Exists<FastDev.Model.Entity.stock_pileDetail>("where ProductID = @0", entity.ID))
                {
                    throw new UserException("产品已经被使用，不允许删除！");
                }
                if (db.Exists<FastDev.Model.Entity.stock_stockPile>("where ProductID = @0", entity.ID))
                {
                    throw new UserException("产品已经被使用，不允许删除！");
                }
                if (db.Exists<FastDev.Model.Entity.stock_indetails>("where ProductID = @0", entity.ID))
                {
                    throw new UserException("产品已经被使用，不允许删除！");
                }
                if (db.Exists<FastDev.Model.Entity.stock_outdetails>("where ProductID = @0", entity.ID))
                {
                    throw new UserException("产品已经被使用，不允许删除！");
                }
                if (db.Exists<FastDev.Model.Entity.sales_orderdetail>("where ProductsID = @0", entity.ID))
                {
                    throw new UserException("产品已经被使用，不允许删除！");
                }
                if (db.Exists<FastDev.Model.Entity.purchase_orderdetail>("where ProductsID = @0", entity.ID))
                {
                    throw new UserException("产品已经被使用，不允许删除！");
                }
            }
        }
        FastDev.Model.Entity.res_product oldEntity = null;

        void res_product_OnSave(object entity, object viewdata, bool isCreate)
        {
            var db = this.QueryDb;

            var viewData = viewdata as Model.Form.res_product;
            oldEntity = db.FirstOrDefault<FastDev.Model.Entity.res_product>("where ID = @0", viewData.ID);


        }

        void res_product_OnBeforeSave(object entityObj, object viewdata, bool isCreate)
        {
            var db = this.QueryDb;


            var viewData = viewdata as Model.Form.res_product;

            if (!isCreate && (viewData.UnitName != oldEntity.UnitName || viewData.ProMode != oldEntity.ProMode))
            {//产品名，产品单位发生变更，  更新其他的冗余数据
                db.Execute("update stock_pileDetail set ProMode = @0,UnitName = @1  where ProductID = @2", viewData.ProName, viewData.UnitName, viewData.ID);
                db.Execute("update stock_stockPile set ProMode = @0,UnitName = @1  where ProductID = @2", viewData.ProName, viewData.UnitName, viewData.ID);
                db.Execute("update stock_indetails set ProMode = @0,UnitName = @1  where ProductID = @2", viewData.ProName, viewData.UnitName, viewData.ID);
                db.Execute("update stock_outdetails set ProMode = @0,UnitName = @1  where ProductID = @2", viewData.ProName, viewData.UnitName, viewData.ID);
                db.Execute("update sales_orderdetail set ProMode = @0,UnitName = @1  where ProductsID = @2", viewData.ProName, viewData.UnitName, viewData.ID);
                db.Execute("update purchase_orderdetail set ProMode = @0,UnitName = @1  where ProductsID = @2", viewData.ProName, viewData.UnitName, viewData.ID);
            }
        }

        void res_product_OnGetPagedData(object data)
        {
            OnGetData(data);
        }




        void res_product_OnGetNameData(object data)
        {
            OnGetData(data);
        }

        void res_product_OnGetListData(object data)
        {
            OnGetData(data);
        }

        void OnGetData(object data)
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
        }


    }
}
