import { Sonuc } from 'src/app/models/Sonuc';
import { DersDialogComponent } from './../dialogs/ders-dialog/ders-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ders } from './../../models/Ders';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Kayit } from './../../models/Kayit';
import { AlertService } from 'src/app/services/alert.service';
import { AlertDialogComponent } from './../dialogs/alert-dialog/alert-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-dersler',
  templateUrl: './admin-dersler.component.html',
  styleUrls: ['./admin-dersler.component.css']
})
export class AdminDerslerComponent implements OnInit {
  dersler: Ders[];
  dataSource: any;
  yeniKayit: Ders;
  displayedColumns = ['dersKodu', 'dersAdi', 'dersKredi', 'DersOgrSayisi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<DersDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KayitGetir();
  }
  KayitGetir() {
    this.apiServis.DersListe().subscribe(d=> {
      this.dersler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Ekle() {
    var yeniKayit: Ders = new Ders();
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "400px",
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
        
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.DersEkle(d).subscribe((s:Sonuc) =>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir()
          }
        })
      }
    })

    // this.dialogRef.afterClosed().subscribe(d => {
    //   if (d) {
    //     this.apiServis.DersEkle(d).subscribe(s => {
    //       this.alert.AlertUygula(s);
    //       if (s.islem) {
    //         this.KayitGetir();
    //       }
    //     });
    //   }
    // });
  }

  Duzenle(kayit:Ders){
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "400px",
      data: {
        kayit: kayit,
        islem: 'duzenle',
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        d.dersId=kayit.dersId;
        this.apiServis.DersDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        })
      }
    })
    
  }
  Sil(kayit:Ders){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.dersAdi+ " İsimli Ders Silinecek Onaylıyor Musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.DersSil(kayit.dersId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        })
      }
    })
  }

  

  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
