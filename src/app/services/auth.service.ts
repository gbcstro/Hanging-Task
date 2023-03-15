import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


const BACKEND_DOMAIN = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private router: Router,
    ) { }

  getUser(){
    return this._http.get(this.buildURL('/api/user'));
  }
  
  register(form: any) {
    return this._http.post(this.buildURL('/api/register'), form).subscribe({
      error: (err) => {
        console.log(err);
      }
    });
  }

  login(form: any) {
    return this._http.post(this.buildURL('/api/login'), form).subscribe({
      next: (res: any) => {
        localStorage.setItem('token',JSON.stringify(res.token.original.token));
        let bearer = 'Bearer '+JSON.parse(localStorage.getItem('token')!);
        let header = {
          headers: new HttpHeaders().set('Authorization', bearer)
        };

        this._http.get(this.buildURL('/api/me'),header).subscribe({
          next: (res: any) => {
            localStorage.setItem('user',JSON.stringify(res));
          }
        });

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        window.alert("User does not exist!");
      }
    });

  }

  confirmEmail(token: any){
    return this._http.post(this.buildURL('email/verify'), token).subscribe({
      next: res => {
        window.alert(res);
      },
      error: err =>{
        console.log(err);
        window.alert(err);
        this.router.navigate(['dashboard']);
      }

    });
  }

  requestResetPass(email: any){
    return this._http.post(this.buildURL('email/password/request-reset-password'), email).subscribe(res => {
      console.log(res);
    });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  buildURL(path: any){
    return BACKEND_DOMAIN + path;
  }

}
