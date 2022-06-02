using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;
using WebApplication1.ViewModel;

namespace WebApplication1.Controllers
{
    public class ServisController : ApiController
    {
        DB02Entities db = new DB02Entities();
        SonucModel sonuc = new SonucModel();


        #region soru
        [HttpGet]
        [Route("api/soruliste")]

        public List<SoruModel> SoruListe()
        {
            List<SoruModel> soru = db.Soru.Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                soru1 = x.soru1,
                oA = x.oA,
                oB = x.oB,
                oC = x.oC,
                oD = x.oD,
                ans = x.ans,
                UyeId = x.UyeId
            }).ToList();

            return soru;
        }
        [HttpGet]
        [Route("api/sorulistebyuyeid/{UyeId}")]

        public List<SoruModel> SoruListeByUyeId(int UyeId)
        {
            List<SoruModel> soru = db.Soru.Where(s => s.UyeId == UyeId).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                soru1 = x.soru1,
                oA = x.oA,
                oB = x.oB,
                oC = x.oC,
                oD = x.oD,
                ans = x.ans,
                UyeId = x.UyeId
            }).ToList();

            return soru;
        }
        [HttpGet]
        [Route("api/sorubyid/{SoruId}")]

        public SoruModel SoruById(int SoruId)
        {
            SoruModel soru = db.Soru.Where(s => s.SoruId == SoruId).Select(x => new
            SoruModel()
            {
                SoruId = x.SoruId,
                soru1 = x.soru1,
                oA = x.oA,
                oB = x.oB,
                oC = x.oC,
                oD = x.oD,
                ans = x.ans,
                UyeId = x.UyeId

            }).SingleOrDefault();
            return soru;
        }
        [HttpPost]
        [Route("api/soruekle")]

        public SonucModel SoruEkle(SoruModel model)
        {
            if (db.Soru.Count(s => s.SoruId == model.SoruId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Soru Numarası Kayıtlıdır!";
                return sonuc;
            }
            Soru yeni = new Soru();
            yeni.soru1 = model.soru1;
            yeni.oA = model.oA;
            yeni.oB = model.oB;
            yeni.oC = model.oC;
            yeni.oD = model.oD;
            yeni.ans = model.ans;
            yeni.UyeId = model.UyeId; //"1";
            db.Soru.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SoruModel model)
        {
            Soru kayit = db.Soru.Where(s => s.SoruId == model.SoruId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadı";
                return sonuc;
            }

            kayit.soru1 = model.soru1;
            kayit.oA = model.oA;
            kayit.oB = model.oB;
            kayit.oC = model.oC;
            kayit.oD = model.oD;
            kayit.ans = model.ans;
            kayit.UyeId = model.UyeId;//"1";
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Düzenlendi";

            return sonuc;
        }
        [HttpDelete]
        [Route("api/sorusil/{SoruId}")]

        public SonucModel SoruSil(int soruId)
        {
            Soru kayit = db.Soru.Where(s => s.SoruId == soruId).SingleOrDefault();
            {
                if (kayit == null)
                {
                    sonuc.islem = false;
                    sonuc.mesaj = "Soru Bulunamadı";
                    return sonuc;
                }
                db.Soru.Remove(kayit);
                db.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Soru Silindi";
                return sonuc;
            }
        }
        #endregion

        #region DersiAlanOgrenciler
        [HttpGet]
        [Route("api/dersialanlarliste")]

        public List<DersiAlanOgrModel> DersiAlanOgr()
        {
            List<DersiAlanOgrModel> liste = db.DersiAlanOgr.Select(x => new DersiAlanOgrModel()
            {
                ogrId = x.ogrId,
                ogrNo = x.ogrNo,
                ogrAdSoyad = x.ogrAdSoyad,
                ogrDogTarih = x.ogrDogTarih,
                ogrFoto = x.ogrFoto,
                UyeId = x.UyeId, //"1",
                ogrDersSayisi=x.Kayit.Count()
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/dersialanlarlistebyuyeid/{UyeId}")]

        public List<DersiAlanOgrModel> DersiAlanOgr(int UyeId)
        {
            List<DersiAlanOgrModel> liste = db.DersiAlanOgr.Where(s => s.UyeId == UyeId).Select(x => new DersiAlanOgrModel()
            {
                ogrId = x.ogrId,
                ogrNo = x.ogrNo,
                ogrAdSoyad = x.ogrAdSoyad,
                ogrDogTarih = x.ogrDogTarih,
                ogrFoto = x.ogrFoto,
                
                UyeId = x.UyeId,//"1",
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/dersialanogrbyid/{ogrId}")]

        public DersiAlanOgrModel OgrenciById(int ogrId)
        {
            DersiAlanOgrModel Kayit = db.DersiAlanOgr.Where(s => s.ogrId == ogrId).Select(x =>
             new DersiAlanOgrModel()
             {
                 ogrId = x.ogrId,
                 ogrNo = x.ogrNo,
                 ogrAdSoyad = x.ogrAdSoyad,
                 ogrDogTarih = x.ogrDogTarih,
                 ogrFoto = x.ogrFoto,
                 UyeId = x.UyeId,//"1",
                 ogrDersSayisi = x.Kayit.Count()
             }).SingleOrDefault();
            return Kayit;
        }
        [HttpPost]
        [Route("api/ogrenciekle")]


        public SonucModel OgrenciEkle(DersiAlanOgrModel model)
        {
            if (db.DersiAlanOgr.Count(s => s.ogrNo == model.ogrNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Öğrenci Numarası Kayıtlıdır";
            }

            DersiAlanOgr yeni = new DersiAlanOgr(); 
            yeni.ogrNo = model.ogrNo;
            yeni.ogrAdSoyad = model.ogrAdSoyad;
            yeni.ogrDogTarih = model.ogrDogTarih;
            yeni.ogrFoto = model.ogrFoto;
            yeni.UyeId = model.UyeId;//"1";
            db.DersiAlanOgr.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/ogrenciduzenle")]



        public SonucModel OgrenciDuzenle(DersiAlanOgrModel model)
        {
            DersiAlanOgr kayit = db.DersiAlanOgr.Where(s => s.ogrId == model.ogrId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.ogrNo = model.ogrNo;
            kayit.ogrAdSoyad = model.ogrAdSoyad;
            kayit.ogrDogTarih = model.ogrDogTarih;
            kayit.ogrFoto = model.ogrFoto;
            kayit.UyeId = model.UyeId;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Kaydı Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/ogrencisil/{ogrId}")]


        public SonucModel OgrenciSil(int ogrId)
        {
            DersiAlanOgr kayit = db.DersiAlanOgr.Where(s => s.ogrId == ogrId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitDersiAlanOgrId == ogrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Üzerinde Ders Kaydı Olduğu İçin Öğrenci Silinemez";
                return sonuc;
            }

            db.DersiAlanOgr.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Silindi";
            return sonuc;
        }
        #endregion

        #region Dersler
        [HttpGet]
        [Route("api/dersliste")]

        public List<DerslerModel> DersListe()
        {
            List<DerslerModel> liste = db.Dersler.Select(x => new DerslerModel()
            {
                dersId = x.dersId,
                dersKodu = x.dersKodu,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
                dersOgrSayisi=x.Kayit.Count()
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/dersbyid/{dersId}")]

        public DerslerModel DersById(int dersId)
        {
            DerslerModel kayit = db.Dersler.Where(s => s.dersId == dersId).Select(x => new DerslerModel()
            {
                dersId = x.dersId,
                dersKodu = x.dersKodu,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
                dersOgrSayisi=x.Kayit.Count()
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/dersekle")]

        public SonucModel DersEkle(Dersler model)
        {
            if (db.Dersler.Count(s => s.dersKodu == model.dersKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kodu Kayıtlıdır!!";
                return sonuc;
            }
            Dersler yeni = new Dersler();
            yeni.dersKodu = model.dersKodu;
            yeni.dersAdi = model.dersAdi;
            yeni.dersKredi = model.dersKredi;
            db.Dersler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/dersduzenle")]

        public SonucModel DersDuzenle(DerslerModel model)
        {
            Dersler kayit = db.Dersler.Where(s => s.dersId == model.dersId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunamadı";
                return sonuc;
            }
            kayit.dersKodu = model.dersKodu;
            kayit.dersAdi = model.dersAdi;
            kayit.dersKredi = model.dersAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/derssil/{dersId}")]

        public SonucModel DersSil(int dersId)
        {
            Dersler kayit = db.Dersler.Where(s => s.dersId == dersId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunamadı";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitDerslerId == dersId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Derse Kayıtlı Öğrenci Olduğu için Ders Silinemez";
                return sonuc;
            }


            db.Dersler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";
            return sonuc;
        }
        #endregion

        #region Üye 
        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                Foto = x.Foto,
                Sifre = x.Sifre,
                AdminUye = x.AdminUye
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{UyeId}")]
        public UyeModel UyeById(int UyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.UyeId == UyeId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                KullaniciAdi = x.KullaniciAdi,
                Email = x.Email,
                Sifre = x.Sifre,
                AdSoyad = x.AdSoyad,
                Foto = x.Foto,
                AdminUye = x.AdminUye
            }).SingleOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.KullaniciAdi == model.KullaniciAdi || s.Email == model.Email) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı Adı veya E-Posta Adresi Kayıtlıdır!";
                return sonuc;
            }
            Uye yeni = new Uye();
            yeni.AdSoyad = model.AdSoyad;
            yeni.Email = model.Email;
            yeni.KullaniciAdi = model.KullaniciAdi;
            yeni.Foto = model.Foto;
            yeni.Sifre = model.Sifre;
            yeni.AdminUye = model.AdminUye;
            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == model.UyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.AdSoyad = model.AdSoyad;
            kayit.Email = model.Email;
            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.Foto = model.Foto;
            kayit.Sifre = model.Sifre;
            kayit.AdminUye = model.AdminUye;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/uyesil/{UyeId}")]

        public SonucModel UyeSil(int UyeId)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == UyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            if (db.Soru.Count(s => s.UyeId == UyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Soru bulunan Üye Silinmez";
                return sonuc;
            }


            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }
        #endregion

        #region Kayit
        [HttpGet]
        [Route("api/ogrencidersliste/{ogrId}")]

        public List<KayitModel> OgrenciDersListe(int ogrId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitDersiAlanOgrId == ogrId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitDerslerId = x.kayitDerslerId,
                kayitDersiAlanOgrId = x.kayitDersiAlanOgrId
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitDersiAlanOgrId);
                kayit.dersBilgi = DersById(kayit.kayitDerslerId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/dersogrenciliste/{dersId}")]

        public List<KayitModel> DersOgrenciListe(int dersId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitDerslerId == dersId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitDerslerId = x.kayitDerslerId,
                kayitDersiAlanOgrId = x.kayitDersiAlanOgrId
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitDersiAlanOgrId);
                kayit.dersBilgi = DersById(kayit.kayitDerslerId);
            }

            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel kayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitDerslerId == model.kayitDerslerId && s.kayitDersiAlanOgrId == model.kayitDersiAlanOgrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Öğrenci Derse Önceden Kayıtlıdır";
                return sonuc;
            }
            Kayit yeni = new Kayit();
            
            yeni.kayitDersiAlanOgrId = model.kayitDersiAlanOgrId;
            yeni.kayitDerslerId = model.kayitDerslerId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]

        public SonucModel KayitSil(int kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Kaydı Silindi";

            return sonuc;
        }
        #endregion










    }





}
