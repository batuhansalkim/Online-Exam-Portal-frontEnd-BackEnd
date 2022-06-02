import { Sonuc } from 'src/app/models/Sonuc';
import { Kayit } from './../models/Kayit';
import { Ders } from './../models/Ders';
import { Ogrenci } from './../models/Ogrenci';
import { Soru } from './../models/Soru';

import { Uye } from './../models/Uye';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:65344/api/";
  
  

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }

  }


  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }
/*   Oturum İşlemleri Bitiş  */

/* API */

  // ***************** SORU *********************

    SoruListe(){
      return this.http.get<Soru[]>(this.apiUrl+"/soruliste");
    }
    
    //doğru
    SoruListeByUyeId(uyeId:number){
    return this.http.get(this.apiUrl + "/sorulistebyuyeid/" +uyeId);
    }
    
    SoruById(soruId:number){
      return this.http.get(this.apiUrl+"/sorubyid/" + soruId);
    }
    
    //bu kısma makale ekleden bak
    SoruEkle(soru:Soru){
      return this.http.post<Sonuc>(this.apiUrl+"/soruekle",soru);
    }
    
    SoruDuzenle(soru:Soru){
      return this.http.put<Sonuc>(this.apiUrl+"/soruduzenle",soru)
    }
    
    SoruSil(soruId:number){
      return this.http.delete<Sonuc>(this.apiUrl+ "/sorusil/" + soruId);
    }
    

    //************** UYE **********************

    UyeListe(){
      return this.http.get(this.apiUrl+ "/uyeliste");
    }
    UyeById(uyeId:number){
      return this.http.get(this.apiUrl+ "/uyebyid/" + uyeId);
    }
    UyeEkle(uye:Uye){
      return this.http.post(this.apiUrl+ "/uyeekle" ,uye);
    }
    UyeDuzenle(uye:Uye){
      return this.http.put(this.apiUrl+ "/uyeduzenle" ,uye);
    }
    UyeSil(uyeId:number){
      return this.http.delete(this.apiUrl+ "/uyesil/" +uyeId);
    }
    
    // DERSİ ALAN OGRENCİLER

    OgrenciListe(){
      return this.http.get<Ogrenci[]>(this.apiUrl+"/////dersialanlarliste")
    }

    OgrenciListeByUyeId(uyeId:number){
      return this.http.get(this.apiUrl+"/dersialanlarlistebyuyeid/"+uyeId)
    }

    OgrenciById(ogrId:number){
      return this.http.get<Ogrenci>(this.apiUrl+"/dersialanogrbyid/"+ogrId);
    }

    OgrenciEkle(ogr:Ogrenci){
      return this.http.post<Sonuc>(this.apiUrl+"/ogrenciekle",ogr);
    }

    OgreciDuzenle(ogr:Ogrenci){
      return this.http.put<Sonuc>(this.apiUrl+"/ogrenciduzenle",ogr)
    }

    OgrenciSil(ogrId:number){
      return this.http.delete<Sonuc>(this.apiUrl+"/ogrencisil/"+ogrId)
    }
    OgrenciDersListe(ogrId: number){
      return this.http.get<Kayit[]>(this.apiUrl+"/ogrencidersliste/"+ogrId)
    }

    // DERSLER 
    DersListe(){
      return this.http.get<Ders[]>(this.apiUrl + "dersliste");
    }
    DersById(dersId:number){
      return this.http.get<Ders>(this.apiUrl +"/dersbyid/"+dersId);
    }
    DersEkle(ders:Ders){
      return this.http.post<Sonuc>(this.apiUrl + "/dersekle",ders);
    }
    DersDuzenle(ders:Ders){
      return this.http.put<Sonuc>(this.apiUrl+"/dersduzenle",ders);
    }
    DersSil(dersId:number){
      return this.http.delete<Sonuc>(this.apiUrl+"/derssil/"+dersId)
    }
    DersOgrenciListe(dersId: number){
      return this.http.get(this.apiUrl+"/dersogrenciliste/"+dersId)
    }

    // KAYIT 
    KayitEkle(kayit:Kayit){
      return this.http.post<Sonuc>(this.apiUrl + "/kayitekle",kayit)
    }
    KayitSil(kayitId:number){
      return this.http.delete<Sonuc>(this.apiUrl + "/kayitsil/"+kayitId);
    }
    



























  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  // KategoriListe() {
  //   return this.http.get(this.apiUrl + "/kategoriliste");
  // }
  // KategoriById(katId: number) {
  //   return this.http.get(this.apiUrl + "/kategoribyid/" + katId);
  // }
  // KategoriEkle(kat: Kategori) {
  //   return this.http.post(this.apiUrl + "/kategoriekle", kat);
  // }
  // KategoriDuzenle(kat: Kategori) {
  //   return this.http.put(this.apiUrl + "/kategoriduzenle", kat);
  // }
  // KategoriSil(katId: number) {
  //   return this.http.delete(this.apiUrl + "/kategorisil/" + katId);
  // }

  // MakaleListe() {
  //   return this.http.get(this.apiUrl + "/makaleliste");
  // }
  // MakaleListeSonEklenenler(s: number) {
  //   return this.http.get(this.apiUrl + "/makalelistesoneklenenler/" + s);
  // }
  // MakaleListeByKatId(katId: number) {
  //   return this.http.get(this.apiUrl + "/makalelistebykatid/" + katId);
  // }
  // MakaleListeByUyeId(uyeId: number) {
  //   return this.http.get(this.apiUrl + "/makalelistebyuyeid/" + uyeId);
  // }
  // MakaleById(makaleId: number) {
  //   return this.http.get(this.apiUrl + "/makalebyid/" + makaleId);
  // }
  // MakaleEkle(makale: Makale) {
  //   return this.http.post(this.apiUrl + "/makaleekle", makale);
  // }
  // MakaleDuzenle(makale: Makale) {
  //   return this.http.put(this.apiUrl + "/makaleduzenle", makale);
  // }
  // MakaleSil(makaleId: number) {
  //   return this.http.delete(this.apiUrl + "/makalesil/" + makaleId);
  // }

  // UyeListe() {
  //   return this.http.get(this.apiUrl + "/uyeliste");
  // }
  // UyeById(uyeId: number) {
  //   return this.http.get(this.apiUrl + "/uyebyid/" + uyeId);
  // }
  // UyeEkle(uye: Uye) {
  //   return this.http.post(this.apiUrl + "/uyeekle", uye);
  // }
  // UyeDuzenle(uye: Uye) {
  //   return this.http.put(this.apiUrl + "/uyeduzenle", uye);
  // }
  // UyeSil(uyeId: number) {
  //   return this.http.delete(this.apiUrl + "/uyesil/" + uyeId);
  // }

  // YorumListe() {
  //   return this.http.get(this.apiUrl + "/yorumliste");
  // }
  // YorumListeByUyeId(uyeId: number) {
  //   return this.http.get(this.apiUrl + "/yorumlistebyuyeid/" + uyeId);
  // }
  // YorumListeBymakaleId(makaleId: number) {
  //   return this.http.get(this.apiUrl + "/yorumlistesoneklenenler/" + makaleId);
  // }
  // YorumListeSonEklenenler(s: number) {
  //   return this.http.get(this.apiUrl + "/yorumliste/" + s);
  // }
  // YorumById(yorumId: number) {
  //   return this.http.get(this.apiUrl + "/yorumbyid/" + yorumId);
  // }
  // YorumEkle(yorum: Yorum) {
  //   return this.http.post(this.apiUrl + "/yorumekle", yorum);
  // }
  // YorumDuzenle(yorum: Yorum) {
  //   return this.http.put(this.apiUrl + "/yorumduzenle", yorum);
  // }
  // YorumSil(yorumId: number) {
  //   return this.http.delete(this.apiUrl + "/yorumsil/" + yorumId);
  // }
}
