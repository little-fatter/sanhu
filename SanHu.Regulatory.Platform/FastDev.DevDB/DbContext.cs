using FastDev.Common;
using FastDev.Common.Extensions;
using PetaPoco;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
namespace FastDev.DevDB
{
    public class DbContext : Database
    {
        private sealed class DbContextHelper<T> : IDbContextHelper
        {
            private DbContext dbContext;

            public DbContextHelper(DbContext context)
            {
                dbContext = context;
            }

            public PagedData Page(long page, long itemsPerPage, string sql, params object[] args)
            {
                Page<T> page2 = dbContext.Page<T>(page, itemsPerPage, sql, args);
                return new PagedData(page2.Items, page2.TotalItems);
            }

            public IList Fetch(string sql, params object[] args)
            {
                try
                {
                    return dbContext.Fetch<T>(sql, args);
                }
                catch (Exception)
                {
                    return new List<object>();
                }
            }

            public object FirstOrDefault(string sql, params object[] args)
            {
                return dbContext.FirstOrDefault<T>(sql, args);
            }

            public IList SkipTake(long skip, long take, string sql, params object[] args)
            {
                return dbContext.SkipTake<T>(skip, take, sql, args);
            }

            public int Delete(string sql, params object[] args)
            {
                return dbContext.Delete<T>(sql, args);
            }

            public bool Exist(string sql, params object[] args)
            {
                return dbContext.Exists<T>(sql, args);
            }
        }

        public bool EnabledLog;

        private string logPrefix;

        public string dbConnectionString;

        public void SetLogPrev(string logPrev)
        {
            EnabledLog = true;
            logPrefix = logPrev;
        }
      
        public DbContext(string connection, string providerName) : base(connection, providerName)
        {

            EnabledLog = true;
            logPrefix = null;
            dbConnectionString = null;
            dbConnectionString = connection;
            EnabledLog = (ConfigurationManager.AppSettings.AllKeys.Contains("EnabledLog") && ConfigurationManager.AppSettings["EnabledLog"].ToString() == "true");
        }

        public DbContext(IDbConnection connection) : base(connection)
        {
            EnabledLog = true;
            logPrefix = null;
            dbConnectionString = null;
        }

        public IDbContextHelper GetHelper(Type T)
        {
            Type type = typeof(DbContextHelper<>).MakeGenericType(T);
            return Activator.CreateInstance(type, this) as IDbContextHelper;
        }

        public override void OnExecutingCommand(IDbCommand cmd)
        {
            base.OnExecutingCommand(cmd);
            try
            {
                if (EnabledLog)
                {
                    LogManager logManager = new LogManager();
                    if (logPrefix != null)
                    {
                        logManager.Prev = logPrefix;
                    }
                    logManager.WriteLog("sql", getCommandContent(cmd));
                }
            }
            finally
            {
            }
        }

        public string getCommandContent(IDbCommand cmd)
        {
            string strSql = "";
            strSql += cmd.CommandText;
            if (cmd.Parameters != null)
            {
                foreach (DbParameter parameter in cmd.Parameters)
                {
                    strSql += "," + parameter.ToStr() + ":" + parameter.Value.ToStr();
                }
            }
            return strSql;
        }
    }
}
