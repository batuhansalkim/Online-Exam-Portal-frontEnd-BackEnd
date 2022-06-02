using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.ViewModel
{
    public class SoruModel
    {
        public int SoruId { get; set; }
        public string soru1 { get; set; }
        public string oA { get; set; }
        public string oB { get; set; }
        public string oC { get; set; }
        public string oD { get; set; }
        public string ans { get; set; }
        public int UyeId { get; set; }
    }
}