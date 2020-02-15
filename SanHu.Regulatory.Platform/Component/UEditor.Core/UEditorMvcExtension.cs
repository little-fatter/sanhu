using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.IO;

namespace UEditor.Core
{
    public static class UEditorMvcExtension
    {
        /// <summary>
        /// 添加UEditor后端服务
        /// </summary>
        /// <param name="services">IServiceCollection</param>
        /// <param name="configFileRelativePath">配置文件相对路径</param>
        /// <param name="isCacheConfig">是否缓存配置文件</param>
        /// <param name="basePath">配置文件、文件存储路径等各种路径的根目录，默认为Web项目的根目录</param>
        /// <param name="editorPath">编辑器位置  相对位置，相遇于根目录的位置</param>
        /// /// <param name="uploadPath">编辑器位置  上传文件的目录，相遇于根目录的位置</param>
        public static void AddUEditorService(this IServiceCollection services,
            string configFileRelativePath = "ueditor.json",
            bool isCacheConfig = true,
            string basePath = "", string uploadPath="uploads",string editorPath = "")
        {
            Config.UploadPath = uploadPath;
            Config.ConfigFile = configFileRelativePath;
            Config.NoCache = isCacheConfig;
            Config.WebRootPath = basePath;
            Config.EditorPath = editorPath;
            services.TryAddSingleton<UEditorService>();
        }
    }
}
