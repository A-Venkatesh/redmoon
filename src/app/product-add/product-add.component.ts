import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { TitleCasePipe } from '@angular/common';
export interface Tile {
  Authors: string;
Title: string;
Url: string;
imgUrl: string;
}
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})




export class ProductAddComponent implements OnInit {
  // angForm: FormGroup;

  matchFound: boolean;
  cols: 1;
  rows: 1;
  list: string;
  products: any = {};
  tiles: Tile[] = [];

  constructor(private ps: ProductsService) {
    // this.createForm();
  }

  form = new FormGroup({
    ProductName: new FormControl('', [Validators.required, ]),
    ProductPrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000000), ]),
  });


  getErrorMessage(filedName: string) {

    switch (filedName) {
      case 'ProductName':
        return this.form.controls.ProductName.hasError('required') ? 'You must enter a value' : '';
        break;

      case 'ProductPrice':
        return this.form.controls.ProductPrice.hasError('required') ? 'You must enter a value' :
          this.form.controls.ProductPrice.hasError('min') ? 'You can not sale anything free' :
            this.form.controls.ProductPrice.hasError('max') ? 'Value exceed the limit' :
              '';
        break;

      default:
        break;
    }


  }

  // createForm() {
  //   this.angForm = this.fb.group({
  //     ProductName: ['', Validators.required ],
  //     ProductDescription: ['', Validators.required ],
  //     ProductPrice: ['', Validators.required ]
  //   });
  // }

  addProduct(ProductName, ProductDescription, ProductPrice) {
    this.ps.addProduct(ProductName, ProductDescription, ProductPrice);
  }
  findMatch() {
   this.ps.suggestProduct(this.form.controls.ProductName.value).subscribe((data: any) => {
    this.products = data;
    this.tiles = data;
    console.log(data);
});
   if (this.tiles.length > 0) {
  this.matchFound = true;
  console.log(this.products);
}

  }

  ngOnInit() {
  }

}
