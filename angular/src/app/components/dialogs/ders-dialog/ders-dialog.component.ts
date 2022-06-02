import { SoruDialogComponent } from './../soru-dialog/soru-dialog.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ders } from 'src/app/models/Ders';

@Component({
  selector: 'app-ders-dialog',
  templateUrl: './ders-dialog.component.html',
  styleUrls: ['./ders-dialog.component.css']
})
export class DersDialogComponent implements OnInit {
dialogBaslik: string;
  yeniKayit: Ders;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Ders Ekle";
    }
    else {
      this.dialogBaslik = "Ders Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "dersKodu": [this.yeniKayit.dersKodu],
      "dersAdi": [this.yeniKayit.dersAdi],
      "dersKredi": [this.yeniKayit.dersKredi],
    });
  }
}
