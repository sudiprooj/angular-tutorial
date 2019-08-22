import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const contactRoute: Routes = [
  {
    path: '',
    component: ContactComponent
  }
]

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoute)
  ]
})
export class ContactModule { }
