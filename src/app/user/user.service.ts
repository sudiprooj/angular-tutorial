import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';
import { tap, switchMapTo, map, catchError, filter, take, switchMap, debounceTime, share } from 'rxjs/operators';

import { SignupUser } from '../auth/signup-user.model';
import { User } from './user.model';


@Injectable()
export class UserService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.user.asObservable();
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, 
    private http: HttpClient,
    private router: Router
    ) {}

  handleError(error: any): Observable<any> {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('Backend response', error);

      if (error.error['error_code'] === 'Unauthenticated.') {
        this.user.next(null);
        this.tokenError();
      }

      return observableThrowError(error);
    }
    // return an observable with a user-facing error message
    return observableThrowError({ message: 'Something bad happened; please try again later.' });
  }

  tokenError () {
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('currentUser');
    //this.router.navigate(['login']);
  }

  updateUserDetails(handleError: boolean = true) {
    /* this.getMyDetails(handleError).subscribe((user: User) => {
      this.user.next(user);
    }, err => { }); */
  }

  activateUser(id: number, code: number) {
    return this.http
      .put(`accounts/${id}/${code}?action=activate`, {}).pipe(
      map((res: any) => res.data),
      catchError(err => {
        return this.handleError(err);
      }));
  }

  getMyDetails(): User {
    return JSON.parse(this.localStorage.getItem('currentUser'));
  }

  /* getMyDetails(handleError?: boolean): Observable<User> {
    handleError = !!handleError;
    return this.http
      .get('user').pipe(
      map((res: any) => res),
      map((user: User) => {
        this.user.next(user);
        this.localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }),
      catchError(err => {
        if (handleError) {
          return this.handleError(err);
        }
      }));
  } */


  /* getUser(userId): Observable<any> {
    return this.http
      .get<any>(`users/${userId}`).pipe(
        map((res: any) => res.data),
        debounceTime(2000),
        catchError(err => {
          return this.handleError(err);
        })
      );
    }

  updateUser(id, userDetails) {
    return this.http
      .put(`users/${id}`, userDetails).pipe(
      map((res: any) => res.data),
      catchError(err => {
        return this.handleError(err);
      }));
  }

  getSupport(id: number, message: string) {
    return this.http
      .post(`users/${id}/support?action=submit`, { message }).pipe(
      map((res: any) => res.data),
      catchError(err => {
        return this.handleError(err);
      }));
  }

  rateSeller (seller_id, purchase_id, rating) {
    const url = `users/${this.user.value.id}/sellers/${seller_id}?action=rate`;
    return this.http
      .post(url, { purchase_id, rating }).pipe(
      catchError(err => {
        return this.handleError(err);
      }));
  }

  rateFeedback (seller_id, feedback) {
    const url = `users/${this.user.value.id}/sellers/${seller_id}?action=giveFeedback`;
    return this.http
      .post(url, feedback).pipe(
      catchError(err => {
        return this.handleError(err);
      }));
  }

  getTransactions () {
    return this.user$.pipe(filter(user => user !== null),
      map(user => user.id),
      take(1),
      switchMap(id => this.http.get(`users/${this.user.value.id}/transactions`)),
      map((response: any) => response.data),
      catchError(err => {
        return this.handleError(err);
      }));
  }

  connectStripe (stripeInfo) {
    const params = Object.keys(stripeInfo).map(info => `${info}=${stripeInfo[info]}`).join('&');

    return  this.user$.pipe(filter(user => user !== null),
      filter(user => !user.is_connected_with_stripe),
      map(user => user.id),
      map(id => {
        if (id !== parseInt(stripeInfo.state)) {
          throw new Error('ID Don\'t match');
        } else {
          return id;
        }
      }),
      take(1),
      switchMapTo(this.http.get(`stripe/connect?${params}`)),
      tap(response => this.getMyDetails()),
      catchError(err => {
        return observableThrowError({
          error: 'ID Don\'t match'
        })
      }))
  }
  sendContact(text) {
    const url = `users/${this.user.value.id}/contact`;
    return this.http
      .post(url, { 'text': text }).pipe(
      catchError(err => {
        return this.handleError(err);
      }));
  } */
}
