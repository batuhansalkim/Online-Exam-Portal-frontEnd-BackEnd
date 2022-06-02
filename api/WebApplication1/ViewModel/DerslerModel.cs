using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.ViewModel
{
    public class DerslerModel
    {
        public int dersId { get; set; }
        public string dersKodu { get; set; }
        public string dersAdi { get; set; }
        public string dersKredi { get; set; }
        public int dersOgrSayisi { get; set; }
    }
}