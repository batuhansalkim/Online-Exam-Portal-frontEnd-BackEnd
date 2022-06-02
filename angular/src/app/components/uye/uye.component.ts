import { AlertService } from 'src/app/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Soru } from './../../models/Soru';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.css']
})
export class UyeComponent implements OnInit {
  sorular:Soru[];
  dataSource:any
  tiklandi:boolean = false;
  dogrumu:boolean = true;
dogrusayisi:number = 0;
yanlissayisi:number = 0;
sinavbitti:boolean = false;
cs:number = 0;
   @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef:MatDialogRef<OgrenciDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;


  constructor(
    public apiServis:ApiService,
    public matdialog:MatDialog,
    public alert:AlertService
  ) { }

  ngOnInit() {
    this.SoruGetir();
  }
  SoruGetir(){
    this.apiServis.SoruListe().subscribe((d:Soru[])=>{
      this.sorular=d;
      this.dataSource=new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  cevapla(cevap: any,verilen: any,soru: { cevap: boolean; key: string; soruId: number; }){
    this.tiklandi = true
if (cevap == verilen) {
  // alert("Doğru cevap")
  this.dogrusayisi += 1
  soru.cevap = false;
  let shand = document.getElementsByClassName(soru.key) as HTMLCollectionOf<HTMLElement>;
if (shand.length != 0) {
  shand[0].style.color = "rgb(8, 236, 8)";
}
}else{
  // alert("yanlış cevap Cevap :"+cevap)
  this.yanlissayisi += 1
  soru.cevap = true;

  let shand = document.getElementsByClassName(soru.key) as HTMLCollectionOf<HTMLElement>;
  if (shand.length != 0) {
    shand[0].style.color = "red";
  }
}
//  this.sorular.forEach(element => {
//    if (element.SoruId == Soru.soruId) {
//      element.cevaplandi = true;
//    };
//  }); 

 this.cs += 1
 if (this.cs == this.sorular.length) {
   this.sinavbitti = true
 }else{
   console.log(this.sorular.length)
   console.log(this.cs)
   this.sinavbitti = false
 }
  }
}
