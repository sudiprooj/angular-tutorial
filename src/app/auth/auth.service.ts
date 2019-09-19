import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import {catchError,  map, tap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';

import { SignupUser } from './signup-user.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private _router: Router, private http: HttpClient, private _userService: UserService) {
    console.log('init auth');
    this._userService.user.next(null);
    if (localStorage.getItem('token')) {
      this._userService.updateUserDetails();
    }
  }

  getToken() {
    return this.localStorage.getItem('token');
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`login`, { email, password })
      .pipe(
        map( (res: any) => {
        if (res.success) {
          console.log(res);
          //const json = {user_id: res.data.id, user_type: res.data.usre_type}
          this.localStorage.setItem('token', res.data.token);
          this.localStorage.setItem('currentUser', JSON.stringify({...res.data, user_id: res.data.id}));
          //this._userService.updateUserDetails();
        }
        return res;
      },
    )).pipe(
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  checkSession(): boolean {
    return !!(this.localStorage.getItem('token'));
  }

  logout() {
    return this.http
      .post(`logout`, { }).pipe(
      map((res) => res),
      tap(res => {
        this._userService.user.next(null);
        this.localStorage.removeItem('token');
        this.localStorage.removeItem('currentUser');
      }),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  changeProfileImage(data: any){
    return this.http
      .post(`account`, data).pipe(
        map((res) => res),
        catchError(err => {
          return observableThrowError(err || 'Server error');
      }));
  }

  activateUser(id: number, code: number) {
    return this.http
      .put(`accounts/${id}/${code}?action=activate`, {}).pipe(
      map((res) => res),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  assignSubcriptionUser(sID: number) {
    return this.http
      .put(`user/assignSubscription/uID`, { sID }).pipe(
      map((res) => res),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  createUser(userDetails: SignupUser) {
    console.log(userDetails);
    return this.http
      .post('register', userDetails).pipe(
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  deleteUser(id: number) {
    return this.http
      .delete(`user/${id}`).pipe(
      map((res) => res),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  // forgotPassword(username) {
  //   return this.http
  //     .post('accounts?action=forgotPassword', { username }).pipe(
  //     map((res) => {
  //       return res;
  //     }),
  //     catchError(err => {
  //       return observableThrowError(err || 'Server error');
  //     }));
  // }
  forgotPassword(email) {
    return this.http
      .post(`forgetpassword`, {email: email}).pipe(
      map((res) => {
        return res;
      }),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  getInviteCodeStatus(invitecode) {
    return this.http
      .get('user/inviteCode/${invitecode}').pipe(
      map((res: any) => res.data),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  requestActivationMail(email: string) {
    return this.http
      .post('user/sendActivationMail', { email }).pipe(
      map((res: any) => res.data),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  resetForgotPassword(hash, password) {
    return this.http
      .put(`forgetpassword/${hash}`, { password: password }).pipe(
      map((res) => res),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }

  resetPassword(id: number, oldPassword: string, newpassword: string) {
    return this.http
      .post(`user/${id}/resetPassword`, { oldPassword, newpassword }).pipe(
      map((res: any) => res.data),
      catchError(err => {
        return observableThrowError(err || 'Server error');
      }));
  }
}
