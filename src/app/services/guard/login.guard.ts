import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ){ }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    if(localStorage.getItem('token') !== null){
      this.router.navigate(['dashboard']);
      return false;
    } else {
      return true;
    }
  }
  
}
