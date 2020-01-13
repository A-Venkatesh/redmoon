import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NumberValueAccessor, } from '@angular/forms';
import { ProductsService} from '../service/products.service';
import { ImgUploadService} from '../service/img-upload.service';
import { TitleCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isString } from 'util';
import { MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { format } from 'url';
export interface Tile {
  Authors: string;
Title: string;
Url: string;
imgUrl: string;
}

export interface PreviewData {
  file: any;
  fileData: any;
  Progress: number;
}
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})




export class ProductAddComponent implements OnInit {
  // angForm: FormGroup;

  matchFound: boolean;
  displayProgress: boolean;
  spinner = false;
  cols: 1;
  rows: 1;
  list: string;
  products: any = {};
  tiles: Tile[] = [];
  files: any;
  error: string;
   map = new Map();
   serverData: any;

   finalImageList: any;

  //  chip variables
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  category = [];

  constructor(private ps: ProductsService, private _snackBar: MatSnackBar, private is: ImgUploadService, private fb: FormBuilder) {
    // this.createForm();
  }


  form = this.fb.group({
    ProductName: ['', [Validators.required]],
    ProductMRP: [''],
    ProductPrice: ['', [Validators.required, Validators.min(1), Validators.max(100000000)]],
    ProductDescription: [''],
    ProductDetail: [''],
    ProductOwner: [''],
    AgeGroup: ['3'],
    ProductCategory: [this.category],
    ProductImages: [this.finalImageList]

  });
  // form = new FormGroup({
  //   ProductName: new FormControl('', [Validators.required, ]),
  //   ProductPrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000000), ]),
  // });


  formatLabel(value: number) {
    if (value >= 19) {
      return 'Adult';
    }

    return value + '+';
  }
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

        case 'Suggestion':
          return 'No suggestions found.Please try diffrent keyword';
          break;

      case 'API_issue':
      return 'Unexpected API issue. Please try again.';
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
    this.spinner = true;
    this.ps.suggestProduct(this.form.controls.ProductName.value).subscribe((data: any) => {
    this.tiles = data;
    console.log(data);
    this.spinner = false;
    if (this.tiles.length > 0) {
      this.matchFound = true;
    } else {
    // this.warningForNullResult();
   this.openSnackBar(this.getErrorMessage('Suggestion'));
    }
},
(err) => {this.error = err;
          console.log(this.error);
          this.spinner = false;
          this.openSnackBar(this.getErrorMessage('API_issue'));
}
);
    console.log(this.tiles.length);



  }

  findContentFromMatch(data: Tile) {
    console.log(data);

    const url = data.Url;
    console.log(url);
    this.ps.getContentforProduct(url).subscribe(
  (res) => {
console.log(res);
this.setFormValues(res, data);
  }
  ,
        (err) => {this.error = err;
                  console.log(this.error);
        }
        );

  }

  ngOnInit() {
  }

  setFormValues(res, data: Tile) {
console.log(res.mrp);

this.form.controls.ProductMRP.setValue(res.mrp);
this.form.controls.ProductPrice.setValue(res.price);
this.form.controls.ProductDetail.setValue(res.productDetail);
this.form.controls.ProductDescription.setValue(res.productDescription);
this.form.controls.ProductOwner.setValue(data.Authors);
this.form.controls.ProductCategory.setValue(res.segment);
    // this.form.controls.AgeGroup.setValue();
this.form.controls.ProductName.setValue(data.Title);
this.form.controls.ProductImages.setValue(res.segment);
 }

    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 2000,
      });
    }

  onFileSelect(event) {
this.files = event.target.files;
console.log(this.files);

for (const sta of this.files) {
  let file: any;
  let fileData: any;
  let Progress: number;
  Progress = 0;
  const reader = new FileReader();
  reader.readAsDataURL(sta);
  reader.onload = (_event) => {
    file = reader.result;
    fileData = sta;
    const viewFile: PreviewData = {file, fileData, Progress };

    this.map.set(sta.name, viewFile);
  };

}
}

  Uploader() {
    this.displayProgress = true;

    this.map.forEach((value: any, key: any) => {
      console.log(key, value);

      console.log(value);
      const fd = new FormData();
      fd.append('image', value.fileData, value.fileData.name);
      if (value.Progress < 98) {
        this.is.addImages(fd , value.fileData.name).subscribe(
        (res) => {// this.uploadResponse = res;
                  this.serverData = res;
                  if (typeof this.serverData === 'string') {
                    console.log('if');
                    console.log(res);


          } else if (res.hasOwnProperty('data')) {
            console.log('pdata');
            console.log(res);
            this.storeImgDetailDB(this.serverData.data);
          } else {
            console.log('else');
            console.log(this.serverData.fname);
            console.log(this.serverData.message);
            const a = this.serverData.fname;
            const b = this.map.get(a);
            b.Progress = this.serverData.message;
            this.map.set(a, b);
            // this.indexedArray[a]=b;
            // console.log(this.indexedArray);

           // console.log(this.uploadResponse);
          }
        },
        (err) => {this.error = err;
                  console.log(this.error);
        }
      );
      }
    });

  }

  removeImage(key: any) {
this.map.delete(key);
  }

  storeImgDetailDB(data: any) {
    console.log('uuuuuuuu' + data.id);

    this.is.storeImgDetail(data.id , data).subscribe(
      (res) => {
        console.log(res);

      },
      (err) => {
        console.log(err);

      }
    );
  }

add(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;
    console.log('value' + event);
    console.log(input);
    console.log('vs  ' + this.category);

    // Add our category
    if ((value || '').trim()) {


      this.category.push(value.trim());
    }

    // Reset the input value
    if (input) {

      input.value = '';
    }
  }

  remove(category: any): void {
    const index = this.category.indexOf(category);

    if (index >= 0) {
      this.category.splice(index, 1);
    }
  }
}
