namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_dblinks
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _DbLink;
        
        private string _DbName;
        
        private string _DbType;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _Remark;
        
        private string _Status;
        
        private string _Title;

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

        public string DbLink
        {
            
            get
            {
                return this._DbLink;
            }
            
            set
            {
                this._DbLink = value;
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

        public string DbType
        {
            
            get
            {
                return this._DbType;
            }
            
            set
            {
                this._DbType = value;
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

        public string Title
        {
            
            get
            {
                return this._Title;
            }
            
            set
            {
                this._Title = value;
            }
        }
    }
}

