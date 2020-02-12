namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_role
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _RoleDesc;
        
        private string _RoleName;
        
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

        public string RoleDesc
        {
            
            get
            {
                return this._RoleDesc;
            }
            
            set
            {
                this._RoleDesc = value;
            }
        }

        public string RoleName
        {
            
            get
            {
                return this._RoleName;
            }
            
            set
            {
                this._RoleName = value;
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

