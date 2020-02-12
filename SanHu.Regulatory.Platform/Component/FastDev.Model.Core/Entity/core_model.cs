namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_model
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _DbName;
        
        private byte? _EnabledFlow;
        
        private string _ID;
        
        private string _ModelName;
        
        private string _ModelTitle;
        
        private string _ModelType;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _ModuleID;
        
        private byte? _NotIncludeSysFields;
        
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

        public string DbName
        {
            
            get
            {
                return this._DbName;
            }
            
            set
            {
                this._DbName = value;
            }
        }

        public byte? EnabledFlow
        {
            
            get
            {
                return this._EnabledFlow;
            }
            
            set
            {
                this._EnabledFlow = value;
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

        public string ModelName
        {
            
            get
            {
                return this._ModelName;
            }
            
            set
            {
                this._ModelName = value;
            }
        }

        public string ModelTitle
        {
            
            get
            {
                return this._ModelTitle;
            }
            
            set
            {
                this._ModelTitle = value;
            }
        }

        public string ModelType
        {
            
            get
            {
                return this._ModelType;
            }
            
            set
            {
                this._ModelType = value;
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

        public string ModuleID
        {
            
            get
            {
                return this._ModuleID;
            }
            
            set
            {
                this._ModuleID = value;
            }
        }

        public byte? NotIncludeSysFields
        {
            
            get
            {
                return this._NotIncludeSysFields;
            }
            
            set
            {
                this._NotIncludeSysFields = value;
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

