namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowProject
    {
        
        private string _Context;
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _CurrentTaskID;
        
        private string _Description;
        
        private DateTime? _EndTime;
        
        private string _ID;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _SponsorID;
        
        private DateTime? _StartTime;
        
        private string _Status;
        
        private string _WorkflowID;

        public string Context
        {
            
            get
            {
                return this._Context;
            }
            
            set
            {
                this._Context = value;
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

        public string CurrentTaskID
        {
            
            get
            {
                return this._CurrentTaskID;
            }
            
            set
            {
                this._CurrentTaskID = value;
            }
        }

        public string Description
        {
            
            get
            {
                return this._Description;
            }
            
            set
            {
                this._Description = value;
            }
        }

        public DateTime? EndTime
        {
            
            get
            {
                return this._EndTime;
            }
            
            set
            {
                this._EndTime = value;
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

        public string SponsorID
        {
            
            get
            {
                return this._SponsorID;
            }
            
            set
            {
                this._SponsorID = value;
            }
        }

        public DateTime? StartTime
        {
            
            get
            {
                return this._StartTime;
            }
            
            set
            {
                this._StartTime = value;
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

        public string WorkflowID
        {
            
            get
            {
                return this._WorkflowID;
            }
            
            set
            {
                this._WorkflowID = value;
            }
        }
    }
}

