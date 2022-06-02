import { UyeComponent } from './components/uye/uye.component';
import { UyeAnasayfaComponent } from './components/uye-anasayfa/uye-anasayfa.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminAnasayfaComponent } from './components/admin-anasayfa/admin-anasayfa.component';
import { Authinterceptor } from './services/Authinterceptor';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { AdminSoruComponent } from './components/admin-soru/admin-soru.component';
import { AdminOgrenciComponent } from './components/admin-ogrenci/admin-ogrenci.component';
import { AdminDerslerComponent } from './components/admin-dersler/admin-dersler.component';
import { OturumkapatComponent } from './components/oturumkapat/oturumkapat.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
// import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    OturumkapatComponent,
    AdminDerslerComponent,
    AdminOgrenciComponent,
    AdminSoruComponent,
    DerslisteleComponent,
    AdminAnasayfaComponent,
    UyeAnasayfaComponent,
    UyeComponent,
    


    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    SoruDialogComponent,
    OgrenciDialogComponent,
    DersDialogComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    SoruDialogComponent,
    OgrenciDialogComponent,
    DersDialogComponent


  ],
  providers: [AuthGuard,
    {provide:HTTP_INTERCEPTORS,useClass:Authinterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
