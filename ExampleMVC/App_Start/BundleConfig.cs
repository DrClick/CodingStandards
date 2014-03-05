using System.Web;
using System.Web.Optimization;

namespace ExampleMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                        "~/Scripts/lib/jquery-{version}.js",
                        "~/Scripts/lib/modernizr-*",
                        "~/Scripts/lib/bootstrap.js",
                        "~/Scripts/lib/respond.js",
                        "~/Scripts/lib/underscore.js",
                        "~/Scripts/lib/amplify.js",
                        "~/Scripts/lib/hogan.js",
                        "~/Scripts/lib/functionPrototypeBind.js",
                        "~/Scripts/lib/require.js",
                        "~/Scripts/app/app.js"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/prettify.sunburst.css"));
        }
    }
}
