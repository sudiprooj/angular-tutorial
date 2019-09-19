import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable()
export class NoAuthGuard implements CanActivate {
  user$: User = null;
  constructor(private _router: Router, private _auth: AuthService, private user: UserService) { 
    this.user$ = this.user.getMyDetails();
  }

  canActivate(next, prev): boolean {
    if (this._auth.checkSession()) {
      if(this.user$.user_type === 'SP'){
        this._router.navigate(['sessionlist']);
      }else{
        this._router.navigate(['allsps']);
      }
      return false;
    } else {
      return true;
    }
  }
}
