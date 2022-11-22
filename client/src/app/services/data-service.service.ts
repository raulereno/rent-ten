import { environment } from './../../environments/environment';
import { NewHouse } from './../components/create-house/create-house.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) { }


  postId = '';


  getUser(mail: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/users/getuser?mail=${mail}`
    );
  }
  //saque el picture
  updateUser(mail: string, sub: string) {
    if (mail && sub) {
      this.http.post<any>(`${environment.baseUrl}/users`, { mail: mail, sub: sub }).subscribe({
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
  }
  updateProfilePicture(url:string,userID:string,authID:string){
    if(url&&userID){
      this.http.patch(`${environment.baseUrl}/users/changepicture/${userID}`,{newPicture:url, authID:authID}).subscribe({
        error:error=>{
          console.error('There was an error!',error);
        }
      })
    }
  }

  verifyAccount(mail: string) {
    return this.http.post(`${environment.baseUrl}/users/requirecode/${mail}`, mail).subscribe({
      error: error => {
        console.log(error);
      }
    })
  }

  sendVerificationCode(mail: string, code: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users/verifymail/${mail}?code=${code}`)
  }

  getHouses(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/houses`);
  }

  getHouse(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/houses/${id}`)
  }

  setFavorite(houseId: string, userId: string) {
    this.http.put<any>(`${environment.baseUrl}/users/addfavoritehouse`, { houseId: houseId, userId: userId }).subscribe({
      error: error => {
        console.log(error)
      }
    })
    
  }

  deleteFavorite(houseId: string, userId: string) {
    this.http.put<any>(`${environment.baseUrl}/users/deletefavoritehouse`, { houseId: houseId, userId: userId }).subscribe({
      error: error => {
        console.log(error)
      }
    })}
  

  createHouse(house: NewHouse, email: string) {
    this.http.post(`${environment.baseUrl}/houses/createhouse?userMail=${email}`, house).subscribe({
      error: error => {
        console.log(error);
      }
    })
  }

  getHouseReviews(houseId: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3001/reviews/${houseId}`
    );
  }

  fullDatabase() {
    this.http.post(`http://localhost:3001/houses/fulldb`, {}).subscribe({
      error: error => {
        console.log(error);
      }
    })
  }

  makeABook(houseId: string, newReserve: Booking, userId: string) {
    this.http.post(`http://localhost:3001/bookings`, {houseId, newReserve, userId}).subscribe({
      error: error => {
        console.log(error);
      }
    })
  }

  postNewReview(opinion:string, rating: number, userId:string, houseId:string, userEmail:string): Observable<any> {
    return this.http.post<any>(`http://localhost:3001/reviews`, {opinion, rating, userId, houseId, userEmail})
  }

  getHouses_withOrder(order:string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/houses/order/${order}`);
  }

  getPaymentLink(item: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3001/mercadopago/payment`, item)
  }

  updateBookingStatus(houseId: string, code: string, status:string) {
    this.http.put<any>(`${environment.baseUrl}/bookings/checkstatus`, { houseId: houseId, code: code, status: status }).subscribe({
      error: error => {
        console.log(error)
      }
    })}


}