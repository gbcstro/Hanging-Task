import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


const BACKEND_DOMAIN = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private router: Router,
    private toast: NgToastService,
    ) { }

  getUser(){
    return this._http.get(this.buildURL('auth/user'));
  }
  
  register(form: any) {
    return this._http.post(this.buildURL('auth/register'), form).subscribe((res: any) => {

      const success: boolean = res.success;
      if(success){
        this.toast.success({detail:"SUCCESS", summary:res.message, duration:2000});
      } else {
        this.toast.error({detail:"ERROR", summary:res.message, duration:2000});
      }

    });
  }

  login(form: any) {
    return this._http.post(this.buildURL('auth/login'), form).subscribe((res: any) => {
      localStorage.setItem('token',JSON.stringify(res.token.original.token));

      const success: boolean = res.success;
      if(success) {
        this._http.get(this.buildURL('auth/me')).subscribe({
          next: (res: any) => {
            localStorage.setItem('user',JSON.stringify(res));
          }
        });
        this.router.navigate(['/dashboard']);
        this.toast.success({detail:"LOGIN", summary:res.message, duration:2000});
      } else {
        const code = res.code;
        if(code == 401){
          this.toast.warning({detail:"WARNING", summary:res.message, duration:2000});
        } else {
          this.toast.info({detail:"INFO", summary:res.message, duration:2000});
        }
      }
      
    });

  }

  confirmEmail(token: any){
    return this._http.post(this.buildURL('email/verify'), token).subscribe({
      next: res => {
        
      },
      error: err =>{
        this.router.navigate(['dashboard']);
      }

    });
  }

  requestResetPass(email: any){
    return this._http.post(this.buildURL('email/password/request-reset-password'), email).subscribe((res: any) => {
      const success: boolean = res.success;
      if(success){
        this.toast.info({detail:"The request was sent to your email address", duration:2500});
      } else {
        this.toast.warning({detail:res.message, duration:2500});
      }
      
    });
  }

  resetPassword(params: any){
    return this._http.post(this.buildURL('email/password/reset-password'), params).subscribe((res: any) => {
      const success: boolean = res.success;
      if(success){
        this.toast.success({detail:"Password Changed", summary:res.message, duration:2500});
      } else {
        this.toast.warning({detail:"Request Expired", summary:res.message, duration:2500});
      }
      this.router.navigate(['']); 
      
    });
  }

  logout(){
    return this._http.get(this.buildURL('auth/logout')).subscribe((res: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['']);
      this.toast.warning({detail:res.message, duration:2000});
    })
    
  }

  buildURL(path: any){
    return BACKEND_DOMAIN + path;
  }

}
