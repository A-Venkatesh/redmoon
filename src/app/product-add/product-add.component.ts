import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { ProductsService } from '../service/products.service';
export interface Tile {
  imgURL: string;
  URL: string;
}
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})




export class ProductAddComponent implements OnInit {
  // angForm: FormGroup;

  matchFound: true;
  cols: 1;
  rows: 1;
  tiles: Tile[] = [
    { URL: 'One', imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51PVcR9nQPL._SX679_.jpg' },
    { URL: 'Two', imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51PVcR9nQPL._SX679_.jpg' },
    { URL: 'Three', imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51PVcR9nQPL._SX679_.jpg' },
    { URL: 'Four', imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51PVcR9nQPL._SX679_.jpg' },
  ];

  constructor(private ps: ProductsService) {
    // this.createForm();
  }

  form = new FormGroup({
    ProductName: new FormControl('', [Validators.required,]),
    ProductPrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000000),]),
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


  }

  ngOnInit() {
  }

}
