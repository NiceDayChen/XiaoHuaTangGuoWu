using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text;
using System.Windows.Forms;

namespace XiaoHuaTangGuoWu
{
    internal static class Program
    {
        private const string AppFolderName = "XiaoHuaTangGuoWu";
        private const string AppTitle = "小画糖果屋";

        [STAThread]
        private static int Main(string[] args)
        {
            bool smokeTest = HasArgument(args, "--smoke-test");

            try
            {
                string appRoot = PrepareAppFiles();
                ValidateExtractedFiles(appRoot);

                if (smokeTest)
                {
                    return 0;
                }

                string indexPath = Path.Combine(appRoot, "index.html");
                string appUrl = new Uri(indexPath).AbsoluteUri;
                LaunchBrowser(appUrl);
                return 0;
            }
            catch (Exception ex)
            {
                if (smokeTest)
                {
                    try
                    {
                        File.WriteAllText(
                            Path.Combine(Path.GetTempPath(), "xiao-hua-tang-guo-wu-smoke.log"),
                            ex.ToString(),
                            Encoding.UTF8
                        );
                    }
                    catch
                    {
                    }
                    return 1;
                }

                MessageBox.Show(
                    "图片工具启动失败：\r\n" + ex.Message,
                    AppTitle,
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
                return 1;
            }
        }

        private static bool HasArgument(string[] args, string expected)
        {
            if (args == null)
            {
                return false;
            }

            for (int i = 0; i < args.Length; i++)
            {
                if (string.Equals(args[i], expected, StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }
            }

            return false;
        }

        private static string PrepareAppFiles()
        {
            string baseDir = Path.Combine(
                AppDomain.CurrentDomain.BaseDirectory,
                "app"
            );

            Directory.CreateDirectory(baseDir);

            WriteResourceToFile("AppAssets.index.html", Path.Combine(baseDir, "index.html"));
            WriteResourceToFile("AppAssets.styles.css", Path.Combine(baseDir, "styles.css"));
            WriteResourceToFile("AppAssets.script.js", Path.Combine(baseDir, "script.js"));

            return baseDir;
        }

        private static void ValidateExtractedFiles(string appRoot)
        {
            EnsureContains(Path.Combine(appRoot, "index.html"), "<canvas id=\"editorCanvas\"");
            EnsureContains(Path.Combine(appRoot, "styles.css"), ".canvas-stage");
            EnsureContains(Path.Combine(appRoot, "script.js"), "function exportComposite");
        }

        private static void EnsureContains(string filePath, string expectedText)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("缺少运行文件：" + Path.GetFileName(filePath), filePath);
            }

            string content = File.ReadAllText(filePath, Encoding.UTF8);
            if (content.IndexOf(expectedText, StringComparison.Ordinal) < 0)
            {
                throw new InvalidDataException("运行文件内容异常：" + Path.GetFileName(filePath));
            }
        }

        private static void WriteResourceToFile(string resourceName, string outputPath)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            using (Stream input = assembly.GetManifestResourceStream(resourceName))
            {
                if (input == null)
                {
                    throw new InvalidOperationException("找不到内置资源：" + resourceName);
                }

                using (FileStream output = new FileStream(outputPath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    input.CopyTo(output);
                }
            }
        }

        private static void LaunchBrowser(string appUrl)
        {
            string edgePath = FindEdgeExecutable();
            if (!string.IsNullOrEmpty(edgePath))
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = edgePath,
                    Arguments = "--app=\"" + appUrl + "\" --window-size=1520,980",
                    UseShellExecute = true
                });
                return;
            }

            Process.Start(new ProcessStartInfo
            {
                FileName = appUrl,
                UseShellExecute = true
            });
        }

        private static string FindEdgeExecutable()
        {
            string[] candidates = new string[]
            {
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Microsoft", "Edge", "Application", "msedge.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Microsoft", "Edge", "Application", "msedge.exe")
            };

            for (int i = 0; i < candidates.Length; i++)
            {
                if (File.Exists(candidates[i]))
                {
                    return candidates[i];
                }
            }

            return null;
        }
    }
}
