namespace FastDev.Model.Core.Report
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflow
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private byte? _Enabled;
        
        private string _ID;
        
        private string _ModelName;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _Name;
        
        private string _Status;
        
        private string _ViewData;

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

        public byte? Enabled
        {
            
            get
            {
                return this._Enabled;
            }
            
            set
            {
                this._Enabled = value;
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

        public string Name
        {
            
            get
            {
                return this._Name;
            }
            
            set
            {
                this._Name = value;
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

        public string ViewData
        {
            
            get
            {
                return this._ViewData;
            }
            
            set
            {
                this._ViewData = value;
            }
        }
    }
}

