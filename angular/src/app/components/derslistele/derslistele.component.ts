import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ders } from './../../models/Ders';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Kayit } from './../../models/Kayit';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.css']
})
export class DerslisteleComponent implements OnInit {

  kayitlar:Kayit[];
  dersler:Ders[];
  secOgrenci:Ogrenci;
  ogrId:number;
  dersId:number;
  kayitId:number;
  displayedColumns=['dersKodu','dersAdi','dersKredi','islemler'];
  dataSource:any;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public alert:AlertService,
    public route:ActivatedRoute,
    public matDialog:MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p:any)=>{
      if (p) {
        this.ogrId=p.ogrId;
        this.OgrenciGetir();
        this.kayitListele();
        this.DersListele();
      }
    });
  }
//Burada hep hata veriyor :(
  OgrenciGetir(){
    this.apiServis.OgrenciById(this.ogrId).subscribe((d:Ogrenci)=>{
      this.secOgrenci=d;
    })
  }
//servise modeldeki durumunu tanımla
  kayitListele(){
    this.apiServis.OgrenciDersListe(this.ogrId).subscribe((d:Kayit[])=>{
      this.kayitlar=d;
      this.dataSource=new MatTableDataSource(this.kayitlar);
    })
  }
  DersListele(){
    this.apiServis.DersListe().subscribe((d:Ders[])=>{
      this.dersler=d;
    })
  }
  DersSec(dersId:number){
    console.log(dersId);
    this.dersId=dersId;
  }
  Kaydet(){

    var kayit:Kayit=new Kayit();
    kayit.kayitId=this.kayitId;
    kayit.kayitDersId=this.dersId;
    kayit.kayitOgrId=this.ogrId;

    this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.kayitListele();
      }
    })
  }

  Sil(kayit:Kayit){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj =kayit.dersBilgi.dersAdi + " dersi Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      console.log(d);
      if (d) {
       this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc)=>{
         this.alert.AlertUygula(s);
         if (s.islem) {
           this.kayitListele();
         }
       })
      }
    });
  }
}
