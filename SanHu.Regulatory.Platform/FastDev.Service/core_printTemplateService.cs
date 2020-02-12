using FastDev.Common;
using FastDev.DevDB;

namespace FastDev.Service
{
    public class core_printTemplateService : ServiceBase, IService
    {

        public core_printTemplateService()
        {
            OnDelete += core_printTemplate_OnDelete;
        }

        void core_printTemplate_OnDelete(object[] args)
        {
            var db = this.MainDb;

            if (args != null && args.Length != 0)
            {
                foreach (var arg in args)
                {
                    var entity = db.FirstOrDefault<Model.Core.Entity.core_printTemplate>("where ID = @0", arg);
                    if (entity.ModelName == "sales_order")
                    {
                        throw new UserException("该模板不允许删除！");
                    }
                }
            }
        }


    }
}