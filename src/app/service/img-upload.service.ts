import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  uri = 'https://api.imgbb.com/1/upload';
  key = '91cfd6143f09a60046b4d8b5fcc6c73c';

  constructor(private http: HttpClient) { }

  addImages(fileData: any) {
    console.log(fileData);
    this.http.post(`${this.uri}` + '?key=' + this.key, fileData)
        .subscribe(res => console.log(res));
  }
}
