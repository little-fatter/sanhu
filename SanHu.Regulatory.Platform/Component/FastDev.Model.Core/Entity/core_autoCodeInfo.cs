namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_autoCodeInfo
    {
        
        private string _AutoCodeID;
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private int? _Day;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private int? _Month;
        
        private decimal? _SerialNumber;
        
        private string _Status;
        
        private int? _Year;

        public string AutoCodeID
        {
            
            get
            {
                return this._AutoCodeID;
            }
            
            set
            {
                this._AutoCodeID = value;
            }
        }

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

        public int? Day
        {
            
            get
            {
                return this._Day;
            }
            
            set
            {
                this._Day = value;
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

        public int? Month
        {
            
            get
            {
                return this._Month;
            }
            
            set
            {
                this._Month = value;
            }
        }

        public decimal? SerialNumber
        {
            
            get
            {
                return this._SerialNumber;
            }
            
            set
            {
                this._SerialNumber = value;
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

        public int? Year
        {
            
            get
            {
                return this._Year;
            }
            
            set
            {
                this._Year = value;
            }
        }
    }
}

