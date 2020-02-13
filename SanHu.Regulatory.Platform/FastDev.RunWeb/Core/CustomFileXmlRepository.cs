using Microsoft.AspNetCore.DataProtection.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace FastDev.RunWeb
{
    public class CustomFileXmlRepository : IXmlRepository
    {
        private readonly string _contentRootPath;

        public CustomFileXmlRepository(string contentRootPath)
        {
            this._contentRootPath = contentRootPath;
        }

        public virtual IReadOnlyCollection<XElement> GetAllElements()
        {
            return GetAllElementsCore().ToList().AsReadOnly();
        }

        private IEnumerable<XElement> GetAllElementsCore()
        {
            String fileFullPath = Path.Combine(_contentRootPath, "XML", "machine.xml");
            yield return XElement.Load(fileFullPath);
        }
        public virtual void StoreElement(XElement element, string friendlyName)
        {
            if (element == null)
            {
                throw new ArgumentNullException(nameof(element));
            }
            StoreElementCore(element, friendlyName);
        }

        private void StoreElementCore(XElement element, string filename)
        {
        }
    }
}
