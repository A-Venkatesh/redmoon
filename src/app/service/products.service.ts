// products.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:8897/products';

  constructor(private http: HttpClient) { }

  addProduct(formValue) {
    // const obj = {
    //   ProductName,
    //   ProductDescription,
    //   ProductPrice
    // };
    console.log(typeof(formValue));
    
    console.log(formValue);
    this.http.post(`${this.uri}/add`, formValue)
        .subscribe(res => console.log('Done'));
  }

  suggestProduct(SearchKey){
    console.log(SearchKey);
    return this
    .http
    .get(`${this.uri}/key/${SearchKey}`);
  }

  getContentforProduct(URL){
    console.log(URL);
    return this
    .http
    .post(`${this.uri}/getContent`, URL);

  }
}
