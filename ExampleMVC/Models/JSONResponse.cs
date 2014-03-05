using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExampleMVC.Models
{
    public class JSONResponse
    {
        public string data { get; set; }
        public int code { get; set; }
        public string[] messages { get; set; }
        public string undoToken { get; set; }
        public string eventName { get; set; }
    }
}