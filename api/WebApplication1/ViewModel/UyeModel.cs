using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.ViewModel
{
    public class UyeModel
    {
        public int UyeId { get; set; }
        public string KullaniciAdi { get; set; }
        public string Email { get; set; }
        public string Sifre { get; set; }
        public string AdSoyad { get; set; }
        public byte[] Foto { get; set; }
        public int AdminUye { get; set; }
    }
}