namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowTask
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _Description;
        
        private DateTime? _EndTime;
        
        private string _FromReturnTaskID;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _NodeID;
        
        private string _NodeTitle;
        
        private string _NodeType;
        
        private string _ProjectID;
        
        private DateTime? _ReceiveTime;
        
        private DateTime? _StartTime;
        
        private string _Status;

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

        public string Description
        {
            
            get
            {
                return this._Description;
            }
            
            set
            {
                this._Description = value;
            }
        }

        public DateTime? EndTime
        {
            
            get
            {
                return this._EndTime;
            }
            
            set
            {
                this._EndTime = value;
            }
        }

        public string FromReturnTaskID
        {
            
            get
            {
                return this._FromReturnTaskID;
            }
            
            set
            {
                this._FromReturnTaskID = value;
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

        public string NodeID
        {
            
            get
            {
                return this._NodeID;
            }
            
            set
            {
                this._NodeID = value;
            }
        }

        public string NodeTitle
        {
            
            get
            {
                return this._NodeTitle;
            }
            
            set
            {
                this._NodeTitle = value;
            }
        }

        public string NodeType
        {
            
            get
            {
                return this._NodeType;
            }
            
            set
            {
                this._NodeType = value;
            }
        }

        public string ProjectID
        {
            
            get
            {
                return this._ProjectID;
            }
            
            set
            {
                this._ProjectID = value;
            }
        }

        public DateTime? ReceiveTime
        {
            
            get
            {
                return this._ReceiveTime;
            }
            
            set
            {
                this._ReceiveTime = value;
            }
        }

        public DateTime? StartTime
        {
            
            get
            {
                return this._StartTime;
            }
            
            set
            {
                this._StartTime = value;
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
    }
}

