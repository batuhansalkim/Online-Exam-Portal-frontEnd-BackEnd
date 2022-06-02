import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Soru } from './../../models/Soru';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-admin-soru',
  templateUrl: './admin-soru.component.html',
  styleUrls: ['./admin-soru.component.css']
})
export class AdminSoruComponent implements OnInit {

  sorular:Soru[];
  dataSource:any;
  displayedColumns=['SoruId','soru1','UyeId','detay'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef:MatDialogRef<OgrenciDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:AlertService
  ) { }

  ngOnInit() {
    this.SoruListele();
  }
  SoruListele(){
    this.apiServis.SoruListe().subscribe((d:Soru[])=>{
      this.sorular=d;
      this.dataSource=new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
//SORU DA OGRENCİ DİALOGLA EŞLEŞTİ SORUN YOK
  Ekle(){
    var yeniKayit:Soru=new Soru();
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      //console.log(d);
      if(d){
        this.apiServis.SoruEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele();
          }
        })
      }
    });
  }
  Duzenle(kayit:Soru){
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        
        kayit.UyeId=d.UyeId
        this.apiServis.SoruDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele();
          }
        })
      }
    });
  }

  Detay(kayit:Soru){
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'detay'
      }
    });
    
  }

  Sil(kayit:Soru){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.soru1 + " Bu Mükemmel Soru Silinecek Onaylıyor Musunuz?"

    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.SoruSil(kayit.SoruId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListele();
          }
        })
      }
    });
  }
}

