namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_exportTemplate
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ID;
        
        private byte? _IsDefault;
        
        private string _ModelName;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
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

        public byte? IsDefault
        {
            
            get
            {
                return this._IsDefault;
            }
            
            set
            {
                this._IsDefault = value;
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

