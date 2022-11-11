import { NewHouse } from './../components/create-house/create-house.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) { }

  postId = '';

  getUser(mail: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3001/users/getuser?mail=${mail}`
    );
  }

  updateUser(mail: string, picture: string, sub: string) {
    if (mail && picture && sub) {
      this.http.post<any>('http://localhost:3001/users', { mail: mail, picture: picture, sub: sub }).subscribe({
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
  }

  verifyAccount(mail: string) {
    return this.http.post(`http://localhost:3001/users/requirecode/${mail}`, mail).subscribe({
      error: error => {
        console.log(error);
      }
    })
  }

  sendVerificationCode(mail: string, code: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/users/verifymail/${mail}?code=${code}`)
  }

  getHouses(): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/houses`);
  }

  getHouse(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/houses/${id}`)
  }

  setFavorite(houseId: string, userId: string) {
    this.http.put<any>(`http://localhost:3001/users/addfavoritehouse`, { houseId: houseId, userId: userId }).subscribe({
      error: error => {
        console.log(error)
      }
    })
  }

  deleteFavorite(houseId: string, userId: string) {
    this.http.put<any>(`http://localhost:3001/users/deletefavoritehouse`, { houseId: houseId, userId: userId }).subscribe({
      error: error => {
        console.log(error)
      }
    })
  }

  createHouse(house: NewHouse, email: string) {
    this.http.post(`http://localhost:3001/houses/createhouse?userMail=${email}`, house).subscribe({
      error: error => {
        console.log(error);
      }
    })
  }
}