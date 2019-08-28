import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { Routes, RouterModule } from '@angular/router';

const productRoute: Routes = [
  {
    path: '',
    component: DetailsComponent
  }
]
@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoute)
  ]
})
export class DetailsModule { }
