namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowTrack
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _NextLinkType;
        
        private string _NextTaskID;
        
        private string _NodeType;
        
        private string _ProjectID;
        
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

        public string NextLinkType
        {
            
            get
            {
                return this._NextLinkType;
            }
            
            set
            {
                this._NextLinkType = value;
            }
        }

        public string NextTaskID
        {
            
            get
            {
                return this._NextTaskID;
            }
            
            set
            {
                this._NextTaskID = value;
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

