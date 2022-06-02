import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { SoruDialogComponent } from './../dialogs/soru-dialog/soru-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ogrenci } from './../../models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-ogrenci',
  templateUrl: './admin-ogrenci.component.html',
  styleUrls: ['./admin-ogrenci.component.css']
})
//ADMİN OGRENCİ SORU DİALOGLA EŞLEŞTİRDİM İSİM YANLIŞLIĞI OLDU
export class AdminOgrenciComponent implements OnInit {
  ogrenciler:Ogrenci[];
  dataSource:any;
  displayedColumns=['ogrNo','ogrAdSoyad','ogrDogTarih','ogrDersSayisi','detay'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef:MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:AlertService
  ) { }

  ngOnInit() {
    this.OgrenciListele();
  }
  OgrenciListele(){
    this.apiServis.OgrenciListe().subscribe((d:Ogrenci[])=>{
      this.ogrenciler=d;
      this.dataSource=new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  Ekle(){
    var yeniKayit:Ogrenci=new Ogrenci();
    this.dialogRef=this.matDialog.open(SoruDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.OgrenciEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OgrenciListele();
          }
        })
      }
    });
  }
  Duzenle(kayit:Ogrenci){
    this.dialogRef=this.matDialog.open(SoruDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        kayit.ogrAdSoyad = d.ogrAdSoyad
        kayit.ogrNo=d.ogrNo
        kayit.ogrDogTarih=d.ogrDogTarih
        kayit.UyeId=d.UyeId
        this.apiServis.OgreciDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OgrenciListele();
          }
        })
      }
    });
  }

  Sil(kayit:Ogrenci){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.ogrAdSoyad + " İsimli Öğrenci Silinecek Onaylıyor Musunuz?"

    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.OgrenciSil(kayit.ogrId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgrenciListele();
          }
        })
      }
    });
  }
  // Filtrele(e){
  //   var deger = e.target.value;
  //   this.dataSource.filter = deger.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
