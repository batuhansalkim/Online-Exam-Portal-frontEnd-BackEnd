import { Ogrenci } from './../../../models/Ogrenci';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css']
})
export class SoruDialogComponent implements OnInit {
dialogBaslik:string;
yeniKayit:Ogrenci;
islem:string;
frm:FormGroup;
  constructor(
    public dialogRef:MatDialogRef<SoruDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    
    if (this.islem=="ekle") {
      this.dialogBaslik="Öğrenci Ekle"
      this.yeniKayit=new Ogrenci();
    }
    if(this.islem=="duzenle") {
      this.dialogBaslik="Öğrenci Düzenle"
      this.yeniKayit=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      ogrNo:[this.yeniKayit.ogrNo],
      ogrAdSoyad:[this.yeniKayit.ogrAdSoyad],
      ogrDogTarih:[this.yeniKayit.ogrDogTarih],
      UyeId:[this.yeniKayit.UyeId]
    });
  }
}
