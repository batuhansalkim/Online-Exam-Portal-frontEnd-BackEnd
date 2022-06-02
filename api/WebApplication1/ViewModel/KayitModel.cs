using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.ViewModel
{
    public class KayitModel
    {
        public int kayitId { get; set; }
        public int kayitDersiAlanOgrId { get; set; }
        public int kayitDerslerId { get; set; }
        public DersiAlanOgrModel ogrBilgi { get; set; }
        public DerslerModel dersBilgi { get; set; }
    }
}