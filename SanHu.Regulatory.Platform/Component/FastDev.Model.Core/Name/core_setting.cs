﻿namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_setting
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _SettingKey;
        
        private string _SettingName;
        
        private string _SettingValue;

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

        public string SettingKey
        {
            
            get
            {
                return this._SettingKey;
            }
            
            set
            {
                this._SettingKey = value;
            }
        }

        public string SettingName
        {
            
            get
            {
                return this._SettingName;
            }
            
            set
            {
                this._SettingName = value;
            }
        }

        public string SettingValue
        {
            
            get
            {
                return this._SettingValue;
            }
            
            set
            {
                this._SettingValue = value;
            }
        }
    }
}

