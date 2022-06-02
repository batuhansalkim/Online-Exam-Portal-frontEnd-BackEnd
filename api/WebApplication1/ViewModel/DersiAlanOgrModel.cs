using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.ViewModel
{
    public class DersiAlanOgrModel
    {
        public int ogrId { get; set; }
        public string ogrNo { get; set; }
        public string ogrAdSoyad { get; set; }
        public string ogrDogTarih { get; set; }
        public byte[] ogrFoto { get; set; }
        public int UyeId { get; set; }
        public int ogrDersSayisi { get; set; }
    }
}