namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class base_area
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _ParentID;
        
        private string _Remarks;
        
        private string _Status;
        
        private string _Title;
        
        private string _Type;

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

        public string ParentID
        {
            
            get
            {
                return this._ParentID;
            }
            
            set
            {
                this._ParentID = value;
            }
        }

        public string Remarks
        {
            
            get
            {
                return this._Remarks;
            }
            
            set
            {
                this._Remarks = value;
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

        public string Type
        {
            
            get
            {
                return this._Type;
            }
            
            set
            {
                this._Type = value;
            }
        }
    }
}

