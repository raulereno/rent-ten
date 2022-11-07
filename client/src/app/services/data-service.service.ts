import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) {}

  postId = '';

  getUser(mail:string): Observable<any>  {
    return this.http.get<any>(`http://localhost:3001/users/getuser?mail=${mail}`)
  }


  updateUser(mail: string, picture: string, sub: string) {
    this.http.post<any>('http://localhost:3001/users', { mail: mail, picture: picture, sub: sub }).subscribe({
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  getHouses(): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/houses`)
  }

  setFavorite(houseId:string, userId:string) {
  this.http.put<any>(`http://localhost:3001/users/addfavoritehouse`, {houseId: houseId, userId: userId}).subscribe({
      error: error => {
        console.log(error)
      }
    })
  }

  deleteFavorite(houseId:string, userId:string) {
    this.http.put<any>(`http://localhost:3001/users/deletefavoritehouse`, {houseId: houseId, userId: userId}).subscribe({
        error: error => {
          console.log(error)
        }
      })
    }
}
