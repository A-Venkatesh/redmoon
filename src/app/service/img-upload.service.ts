import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  uri = 'https://api.imgbb.com/1/upload';
  uriDB = 'http://localhost:8895/image';
  key = '91cfd6143f09a60046b4d8b5fcc6c73c';
  prog ='';

  constructor(private http: HttpClient) { }

  addImages(fileData: any , name: string) {
    console.log('00000000000'+ fileData);
    return this.http.post(`${this.uri}` + '?key=' + this.key, fileData , {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          console.log(event);
          
          const progress = Math.round(100 * event.loaded / event.total);
          localStorage.setItem('progress', JSON.stringify(progress));
          return { fname: name , status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );

  }

  storeImgDetail(Id, Data) {

    return this.http.put(`${this.uriDB}/${Id}`, Data);
  }
}
