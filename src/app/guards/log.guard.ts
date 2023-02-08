import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(route: ActivatedRouteSnapshot ){
    console.log(localStorage.getItem(environment.TOKEN));
    if (localStorage.getItem(environment.TOKEN)) {
      this.router.navigateByUrl("dashboard");
      return false;
     }
     else return true;
  }

}
