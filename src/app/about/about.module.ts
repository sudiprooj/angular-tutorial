import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { Routes, RouterModule } from '@angular/router';

const aboutRoute: Routes = [
  {
    path: '',
    component: AboutComponent
  }
]
@NgModule({

  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(aboutRoute)
  ]
})
export class AboutModule { }
