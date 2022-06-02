using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;
using WebApplication1.ViewModel;

namespace WebApplication1.Auth
{
    public class UyeService
    {
        DB02Entities db = new DB02Entities();

        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x =>
                 new UyeModel()
                 {
                     UyeId = x.UyeId,
                     AdSoyad = x.AdSoyad,
                     Email = x.Email,
                     KullaniciAdi = x.KullaniciAdi,
                     Foto = x.Foto,
                     Sifre = x.Sifre,
                     AdminUye = x.AdminUye
                 }).SingleOrDefault();

            return uye;
        }
    }
}