namespace FastDev.Model.Core.Report
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowTrackDetails
    {
        
        private DateTime? _CreateDate;
        
        private string _CreateUserID;
        
        private string _ExecutorStatusID;
        
        private string _FromExecutorStatusID;
        
        private string _ID;
        
        private byte? _IsToNextTask;
        
        private DateTime? _ModifyDate;
        
        private string _ModifyUserID;
        
        private string _NextExecutorStatusID;
        
        private string _Status;
        
        private string _TrackID;

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

        public string ExecutorStatusID
        {
            
            get
            {
                return this._ExecutorStatusID;
            }
            
            set
            {
                this._ExecutorStatusID = value;
            }
        }

        public string FromExecutorStatusID
        {
            
            get
            {
                return this._FromExecutorStatusID;
            }
            
            set
            {
                this._FromExecutorStatusID = value;
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

        public byte? IsToNextTask
        {
            
            get
            {
                return this._IsToNextTask;
            }
            
            set
            {
                this._IsToNextTask = value;
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

        public string NextExecutorStatusID
        {
            
            get
            {
                return this._NextExecutorStatusID;
            }
            
            set
            {
                this._NextExecutorStatusID = value;
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

        public string TrackID
        {
            
            get
            {
                return this._TrackID;
            }
            
            set
            {
                this._TrackID = value;
            }
        }
    }
}

