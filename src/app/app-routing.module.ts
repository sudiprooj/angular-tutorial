import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: 'products',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'products/details/:id',
    loadChildren: './product/details/details.module#DetailsModule'
  },
  {
    path: 'contact-us',
    loadChildren: './contact/contact.module#ContactModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  //admin routing
  {
    path: 'admin/dashboard',
    loadChildren: './admin/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'admin/product',
    loadChildren: './admin/product/product.module#ProductModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
