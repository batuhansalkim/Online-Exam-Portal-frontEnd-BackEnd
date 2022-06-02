import { Soru } from './../../../models/Soru';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ogrenci-dialog',
  templateUrl: './ogrenci-dialog.component.html',
  styleUrls: ['./ogrenci-dialog.component.css']
})
export class OgrenciDialogComponent implements OnInit {

dialogBaslik:string;
yeniKayit:Soru;
islem:string;
frm:FormGroup;
  constructor(
    public dialogRef:MatDialogRef<OgrenciDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    
    if (this.islem=="ekle") {
      this.dialogBaslik="Soru Ekle"
      this.yeniKayit=new Soru();
    }
    if(this.islem=="duzenle") {
      this.dialogBaslik="Soru Düzenle"
      this.yeniKayit=data.kayit;
    }
    if(this.islem=="detay") {
      this.dialogBaslik="Soru Detayları"
      this.yeniKayit=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      UyeId:[this.yeniKayit.UyeId],
      SoruId:[this.yeniKayit.SoruId],
      soru1:[this.yeniKayit.soru1],
      oA:[this.yeniKayit.oA],
      oB:[this.yeniKayit.oB],
      oC:[this.yeniKayit.oC],
      oD:[this.yeniKayit.oD],
      ans:[this.yeniKayit.ans],
    });
  }
}
