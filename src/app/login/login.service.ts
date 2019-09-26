import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  doLogin(){
    return this.http
      .get<any>(`login`, {}).pipe(
          map((res: any) => res),
          catchError(err => {
            return throwError(err);
          })
      );
  }

  doLogout(){
    return this.http
      .get<any>(`login`, {}).pipe(
          map((res: any) => res),
          catchError(err => {
            return throwError(err);
          })
      );
  }

  handleError(err: any): any {
    throw new Error('Error occured.'+err);
  }
}
