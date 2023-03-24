import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: any;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.token = JSON.parse(localStorage.getItem('token')!);

    if(this.token){
      const headers = request.headers
      .set('Authorization', `Bearer ${this.token}`);

      const cloneReq = request.clone({headers})
      return next.handle(cloneReq);
    }

    return next.handle(request);

  }
}

export const AuthProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
