import { UyeComponent } from './components/uye/uye.component';
import { UyeAnasayfaComponent } from './components/uye-anasayfa/uye-anasayfa.component';
import { AuthGuard } from './services/AuthGuard';

import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { AdminSoruComponent } from './components/admin-soru/admin-soru.component';
import { AdminOgrenciComponent } from './components/admin-ogrenci/admin-ogrenci.component';
import { AdminDerslerComponent } from './components/admin-dersler/admin-dersler.component';
import { OturumkapatComponent } from './components/oturumkapat/oturumkapat.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminAnasayfaComponent } from './components/admin-anasayfa/admin-anasayfa.component';

//

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'admin/anasayfa', component: AdminAnasayfaComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit:'/login'
    }
  },
  {
    path: 'uye/anasayfa', component: UyeAnasayfaComponent,
    
  },
  {
    path: 'uye/sorular', component: UyeComponent,
    
  },
  {
    path: 'login', component: LoginComponent
  },
  
  {
    path: 'oturumkapat', component: OturumkapatComponent
  },
  {
    path: 'admin/dersler', component: AdminDerslerComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit:'/login'
    }
  },
  //Dene Olmazsa ekleme
  {
    path: 'derslistele/:ogrId', component: DerslisteleComponent
  },
  {
    path: 'admin/ogrenciler', component: AdminOgrenciComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit:'/login'
    }
  },
  {
    path: 'admin/ogrenciler/:ogrId', component: AdminOgrenciComponent
  },
  {
    path: 'admin/soruhazirla', component: AdminSoruComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit:'/login'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
