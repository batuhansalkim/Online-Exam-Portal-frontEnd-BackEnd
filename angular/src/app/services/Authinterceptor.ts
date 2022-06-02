import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authinterceptor implements HttpInterceptor{

constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    var token = localStorage.getItem("token");
    var newReq = req.clone({
      headers: req.headers.set("Authorization","Bearer "+ token)
    });
    return next.handle(newReq);
  }

}
