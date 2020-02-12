namespace FastDev.RunWeb.Core
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class ProjectXmlItemNode
    {
        
        private Dictionary<string, string> _Attr;
        
        private string _file;

        public Dictionary<string, string> Attr
        {
            
            get
            {
                return this._Attr;
            }
            
            set
            {
                this._Attr = value;
            }
        }

        public string file
        {
            
            get
            {
                return this._file;
            }
            
            set
            {
                this._file = value;
            }
        }
    }
}

