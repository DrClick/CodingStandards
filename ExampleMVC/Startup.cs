using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ExampleMVC.Startup))]
namespace ExampleMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
