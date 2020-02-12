using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Xml.Serialization;

namespace FastDev.DevDB.Model.Config
{
    [XmlType("freedesign")]
    public class ServiceConfig
    {
        public Model model
        {
            get;
            set;
        }

        public string PKName
        {
            get
            {
                foreach (Field field in fields)
                {
                    if (field.isPK == "Y")
                    {
                        return field.name;
                    }
                }
                return "ID";
            }
        }

        public bool IsAutoIncrementPk
        {
            get
            {
                foreach (Field field in fields)
                {
                    if (field.isPK == "Y")
                    {
                        return field.type == "autoincrement";
                    }
                }
                return false;
            }
        }

        public bool IsGuidPk
        {
            get
            {
                foreach (Field field in fields)
                {
                    if (field.isPK == "Y")
                    {
                        return field.type == "guid";
                    }
                }
                return true;
            }
        }

        [XmlArrayItem("field")]
        [XmlArray("fields")]
        public List<Field> fields
        {
            get;
            set;
        }

        public FieldSelection create
        {
            get;
            set;
        }

        public FieldSelection update
        {
            get;
            set;
        }

        public FieldSelection delete
        {
            get;
            set;
        }

        public FieldSelection getdetail
        {
            get;
            set;
        }

        public FieldSelection getlist
        {
            get;
            set;
        }

        public FieldSelection getpageddata
        {
            get;
            set;
        }

        public ServiceConfig()
        {


            model = new Model();
            fields = new List<Field>();
            create = new FieldSelection();
            update = new FieldSelection();
            delete = new FieldSelection();
            getdetail = new FieldSelection();
            getlist = new FieldSelection();
            getpageddata = new FieldSelection();
        }
    }
}
