import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

const productRoute: Routes = [
  {
    path: '',
    component: ProductComponent
  }
]
@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoute)
  ]
})
export class ProductModule { }
