import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productArray: Product[];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res=>{
      this.productArray = res
    }, err => {
      console.log(err);
    });
  }

  details(id: number){
    this.router.navigate([`/products/details/${id}`])
  }
}
