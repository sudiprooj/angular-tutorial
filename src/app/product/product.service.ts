import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Product } from './product.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  getProducts(){
    return this.http
      .get<any>(`products`).pipe(
          map((res: any) => res),
          catchError(err => {
            return throwError(err);
          })
      );
  }
  
  getProductDetails(id: number){
    return this.http
      .get<any>(`products/${id}`).pipe(
          map((res: any) => res),
          catchError(err => {
            return throwError(err);
          })
      );
  }

  postProduct(data: any){
    return this.http
      .post<any>(`products`, data).pipe(
          map((res: any) => res),
          catchError(err => {
            return throwError(err);
          })
      );
  }

  putProduct(data: any){
    return this.http
      .put<any>(`products/${data.id}`, data).pipe(
          map((res: any) => res),
          catchError(err => {
            return throwError(err);
          })
      );
  }

  deleteProduct(id: number){
    return this.http
      .delete(`products/${id}`).pipe(
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
