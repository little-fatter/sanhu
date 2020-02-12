

// ProjectHelper
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
namespace FastDev.RunWeb.Core
{
    public class ProjectHelper
    {
        public static void ClearXMLNS(string fileName)
        {
            if (File.Exists(fileName))
            {
                string text = File.ReadAllText(fileName);
                text = text.Replace("xmlns=\"\"", "");
                File.WriteAllText(fileName, text);
            }
        }

        public static bool ExistInclude(string projectFileName, string fileName)
        {
            string text = File.ReadAllText(projectFileName);
            string text2 = "Include=\"" + fileName + "\"";
            return text.ToLower().Contains(text2.ToLower());
        }

        public static void RemoveInclude(string projectFileName, string nodeName, string[] fileNames)
        {
            string text = File.ReadAllText(projectFileName);
            bool flag = false;
            foreach (string arg in fileNames)
            {
                string text2 = string.Format("<{0} Include=\"{1}\" />", nodeName, arg);
                if (text.IndexOf(text2) > -1)
                {
                    flag = true;
                    text = text.Replace(text2, "");
                }
            }
            if (flag)
            {
                File.WriteAllText(projectFileName, text);
            }
        }

        public static void AddInclude(string projectFilename, string nodeName, string[] files)
        {
            if (files != null)
            {
                AddInclude(projectFilename, nodeName, (from a in files
                                                       select new ProjectXmlItemNode
                                                       {
                                                           file = a
                                                       }).ToArray());
            }
        }

        public static void AddInclude(string projectFilename, string nodeName, params ProjectXmlItemNode[] files)
        {
            if (File.Exists(projectFilename))
            {
                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.Load(projectFilename);
                XmlNode xmlNode = xmlDocument.ChildNodes[1];
                XmlNode xmlNode2 = xmlDocument.CreateNode(XmlNodeType.Element, "ItemGroup", null);
                bool flag = false;
                foreach (ProjectXmlItemNode projectXmlItemNode in files)
                {
                    string file = projectXmlItemNode.file;
                    if (!ExistInclude(projectFilename, file))
                    {
                        XmlNode xmlNode3 = xmlDocument.CreateNode(XmlNodeType.Element, nodeName, null);
                        xmlNode2.AppendChild(xmlNode3);
                        XmlAttribute xmlAttribute = xmlDocument.CreateAttribute("Include");
                        xmlAttribute.Value = file;
                        if (projectXmlItemNode.Attr != null)
                        {
                            foreach (KeyValuePair<string, string> item in projectXmlItemNode.Attr)
                            {
                                XmlNode xmlNode4 = xmlDocument.CreateNode(XmlNodeType.Element, item.Key, null);
                                xmlNode4.InnerText = item.Value;
                                xmlNode3.AppendChild(xmlNode4);
                            }
                        }
                        xmlNode3.Attributes.Append(xmlAttribute);
                        flag = true;
                    }
                }
                if (flag)
                {
                    xmlNode.AppendChild(xmlNode2);
                    xmlDocument.Save(projectFilename);
                    string text = File.ReadAllText(projectFilename);
                    text = text.Replace("xmlns=\"\"", "");
                    File.WriteAllText(projectFilename, text);
                }
            }
        }
    }
}