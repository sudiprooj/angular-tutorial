import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private _router: Router, private _auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.checkSession()) {
      return true;
    } else {
      this.localStorage.removeItem('token');
      //this._router.navigate(['production']);
      this._router.navigate(['login']);
      return false;
    }
  }
}
