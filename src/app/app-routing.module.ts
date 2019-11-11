import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { AdminWindowComponent } from './admin-window/admin-window.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'registration',
    component: RegisterUserComponent
  },
  {
    path: 'admin/product/create',
    component: ProductAddComponent
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'admin/products',
    component: ProductGetComponent
  },
  {
    path: 'admin',
    component: AdminWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
