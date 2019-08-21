import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const aboutRoute: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
]
@NgModule({

  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(aboutRoute)
  ]
})
export class HomeModule { }
