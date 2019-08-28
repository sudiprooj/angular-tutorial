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
      .get<any>(`http://localhost:3000/products`).pipe(
          map((res: any) => res),
          catchError(err => {
            return throwError(err);
          })
      );
  }
  getProductDetails(id: number){
    return this.http
      .get<any>(`http://localhost:3000/products/${id}`).pipe(
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
