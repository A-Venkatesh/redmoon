import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NumberValueAccessor, } from '@angular/forms';
import { ProductsService} from '../service/products.service';
import { ImgUploadService} from '../service/img-upload.service';
import { TitleCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isString } from 'util';
export interface Tile {
  Authors: string;
Title: string;
Url: string;
imgUrl: string;
}

export interface Status {
  file: File;
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
   imageList = [];
   imageDatas = [];

  constructor(private ps: ProductsService, private _snackBar: MatSnackBar, private is: ImgUploadService) {
    // this.createForm();
  }

  form = new FormGroup({
    ProductName: new FormControl('', [Validators.required, ]),
    ProductPrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000000), ]),
  });


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

  findContentFromMatch(url: any) {
console.log(url);
this.ps.getContentforProduct(url).subscribe(
  (res) => {
console.log(res);

  }
  ,
        (err) => {this.error = err;
                  console.log(this.error);
        }
        );

  }

  ngOnInit() {
  }

    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 2000,
      });
    }

  onFileSelect(event) {
this.files = event.target.files;
console.log(this.files);

}
  Uploader() {
    this.displayProgress = true;
    console.log(this.files);

    for (const sta of this.files) {
      console.log(sta.name);
      const fd = new FormData();
      fd.append('image', sta, sta.name);
      this.is.addImages(fd , sta.name).subscribe(
        (res) => {// this.uploadResponse = res;
                  this.serverData = res;
                  if (typeof this.serverData === 'string') {
                    this.serverData = res;
                    console.log('if');

                    console.log(res);


          } else if (res.hasOwnProperty('data')) {
            console.log('pdata');
            console.log(res);
            this.imageDatas.push(res);
            this.storeImgDetailDB(this.serverData.data);
            this.imageList.push(this.serverData.data.url);
            console.log(this.imageList);


          } else {
            console.log('else');
            console.log(this.serverData.fname);
            console.log(this.serverData.message);
            const a = this.serverData.fname;
            const b = this.serverData.message;
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

}
