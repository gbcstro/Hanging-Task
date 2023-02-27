import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


const BACKEND_DOMAIN = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private router: Router
    ) { }
  
  register(form: any) {
    this._http.post(this.buildURL('/api/register'), form);
  }

  login(form: any){
    return this._http.post(this.buildURL('/api/login'), form).subscribe({
      next: (res) => {
        localStorage.setItem('token',JSON.stringify(res.token));
      }
    });

  }

  buildURL(path: any){
    return BACKEND_DOMAIN + path;
  }

}
