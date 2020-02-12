namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowExecutorStatus
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ExecutorID;
        
        private DateTime? _ExecutorTime;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _Remark;
        
        private string _Status;
        
        private string _TaskID;

        public DateTime? CreateDate
        {
            
            get
            {
                return this._CreateDate;
            }
            
            set
            {
                this._CreateDate = value;
            }
        }

        public string CreateUserID
        {
            
            get
            {
                return this._CreateUserID;
            }
            
            set
            {
                this._CreateUserID = value;
            }
        }

        public string ExecutorID
        {
            
            get
            {
                return this._ExecutorID;
            }
            
            set
            {
                this._ExecutorID = value;
            }
        }

        public DateTime? ExecutorTime
        {
            
            get
            {
                return this._ExecutorTime;
            }
            
            set
            {
                this._ExecutorTime = value;
            }
        }

        public string ID
        {
            
            get
            {
                return this._ID;
            }
            
            set
            {
                this._ID = value;
            }
        }

        public DateTime? ModifyDate
        {
            
            get
            {
                return this._ModifyDate;
            }
            
            set
            {
                this._ModifyDate = value;
            }
        }

        public string ModifyUserID
        {
            
            get
            {
                return this._ModifyUserID;
            }
            
            set
            {
                this._ModifyUserID = value;
            }
        }

        public string Remark
        {
            
            get
            {
                return this._Remark;
            }
            
            set
            {
                this._Remark = value;
            }
        }

        public string Status
        {
            
            get
            {
                return this._Status;
            }
            
            set
            {
                this._Status = value;
            }
        }

        public string TaskID
        {
            
            get
            {
                return this._TaskID;
            }
            
            set
            {
                this._TaskID = value;
            }
        }
    }
}

