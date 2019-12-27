import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  form = new FormGroup({
  ProductName : new FormControl('', [Validators.required, ]) ,
  ProductPrice : new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000000), ]) ,
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
  // angForm: FormGroup;
  constructor(private ps: ProductsService) {
    // this.createForm();
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

  ngOnInit() {
  }

}
