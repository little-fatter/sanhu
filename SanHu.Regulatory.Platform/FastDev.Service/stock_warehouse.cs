using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FastDev.Common;

using FastDev.Model.Entity;
using FastDev.DevDB;


namespace FastDev.Service
{
    public class stock_warehouse : ServiceBase, IService
    {

        public stock_warehouse()
        {
            OnDelete += stock_warehouse_OnDelete;
        }

        void stock_warehouse_OnDelete(object[] args)
        {

            var db = this.QueryDb;

            foreach (var curId in args)
            {
                var entity = db.FirstOrDefault<Model.Entity.stock_warehouse>("where ID = @0", curId);
                if (entity != null)
                {
                    if (entity.IsEnabled == 1)
                    {
                        throw new UserException(string.Format("仓库{0}已经启用,不允许删除", entity.WarehouseName));
                    }

                    if (db.Exists<stock_indetails>("where WarehouseID = @0", entity.ID))
                    {
                        throw new UserException(string.Format("仓库{0}已经被入库单使用,不允许删除", entity.WarehouseName));
                    }

                    if (db.Exists<stock_outdetails>("where WarehouseID = @0", entity.ID))
                    {
                        throw new UserException(string.Format("仓库{0}已经被出库单使用,不允许删除", entity.WarehouseName));
                    }

                    if (db.Exists<sales_orderdetail>("where WarehouseID = @0", entity.ID))
                    {
                        throw new UserException(string.Format("仓库{0}已经被销售单使用,不允许删除", entity.WarehouseName));
                    }
                }
            }
        }



    }
}
