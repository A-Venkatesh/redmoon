import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { ProductAddComponent } from './product-add/product-add.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AdminWindowComponent } from './admin-window/admin-window.component';

import { ProductsService } from './service/products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
   MatGridListModule, MatCardModule, MatProgressSpinnerModule, MatExpansionModule ,
   MatSliderModule, MatSnackBarModule} from '@angular/material';

const Matmodules = [
  MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatGridListModule,
   MatCardModule, MatProgressSpinnerModule, MatExpansionModule, MatSliderModule ,
   MatSnackBarModule,
];
@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    RegisterUserComponent,
    HomeComponent,
    ProductGetComponent,
    ProductEditComponent,
    AdminWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Matmodules
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
