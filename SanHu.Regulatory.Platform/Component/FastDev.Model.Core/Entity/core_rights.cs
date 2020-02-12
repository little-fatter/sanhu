namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_rights
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ID;
        
        private string _MasterID;
        
        private string _MasterType;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _Remark;
        
        private string _RightsValue;
        
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

        public string MasterID
        {
            
            get
            {
                return this._MasterID;
            }
            
            set
            {
                this._MasterID = value;
            }
        }

        public string MasterType
        {
            
            get
            {
                return this._MasterType;
            }
            
            set
            {
                this._MasterType = value;
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

        public string RightsValue
        {
            
            get
            {
                return this._RightsValue;
            }
            
            set
            {
                this._RightsValue = value;
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

