import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  uri = 'https://api.imgbb.com/1/upload';
  key = '91cfd6143f09a60046b4d8b5fcc6c73c';
  prog ='';

  constructor(private http: HttpClient) { }

  addImages(fileData: any) {
    console.log(fileData);
    return this.http.post(`${this.uri}` + '?key=' + this.key, fileData , {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          localStorage.setItem('progress', JSON.stringify(progress));
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );

  }
}
