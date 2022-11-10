import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})

export class UploadImgService {

  constructor(private _http:HttpClient) {}

  uploadImage(value:FormData): Observable<any>{
    console.log(value.get("file"))
    return this._http.post(
      'https://api.cloudinary.com/v1_1/dbgpp8nla/upload',value
    )
  }

}
