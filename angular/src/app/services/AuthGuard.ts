import { AlertService } from './alert.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        public apiServis:ApiService,
        public alert:AlertService,
        public router:Router
    ){}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        var yetkiler=route.data["yetkiler"] as Array<string>;
        var gitUrl=route.data["gerigit"] as string;

        if (!this.apiServis.oturumKontrol() || !yetkiler.length) {
            this.router.navigate([gitUrl]);
            return false;
        }
        var sonuc:boolean=false;

        sonuc=this.apiServis.yetkiKontrol(yetkiler);
        if(!sonuc){
            this.router.navigate([gitUrl]);
        }
        return sonuc;
    }
}

