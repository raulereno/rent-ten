import { environment } from '../../environments/environment';
import { NewHouse } from '../components/create-house/create-house.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Booking } from '../models/Booking';
import { userProfile } from '../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  postId = '';

  getUser(mail: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/users/getuser?mail=${mail}`
    );
  }
  //saque el picture
  updateUser(mail: string, sub: string) {
    if (mail && sub) {
      this.http
        .post<any>(`${environment.baseUrl}/users`, { mail: mail, sub: sub })
        .subscribe({
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    }
  }
  updateProfilePicture(url: string, userID: string, authID: string) {
    if (url && userID) {
      this.http
        .patch(`${environment.baseUrl}/users/changepicture/${userID}`, {
          newPicture: url,
          authID: authID,
        })
        .subscribe({
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    }
  }

  verifyAccount(mail: string) {
    return this.http
      .post(`${environment.baseUrl}/users/requirecode/${mail}`, mail)
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }

  sendVerificationCode(mail: string, code: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/users/verifymail/${mail}?code=${code}`
    );
  }

  getHouses(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/houses`);
  }

  getHouse(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/houses/${id}`);
  }

  setFavorite(houseId: string, userId: string) {
    this.http
      .put<any>(`${environment.baseUrl}/users/addfavoritehouse`, {
        houseId: houseId,
        userId: userId,
      })
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteFavorite(houseId: string, userId: string) {
    this.http
      .put<any>(`${environment.baseUrl}/users/deletefavoritehouse`, {
        houseId: houseId,
        userId: userId,
      })
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }

  createHouse(house: NewHouse, email: string) {
    this.http
      .post(
        `${environment.baseUrl}/houses/createhouse?userMail=${email}`,
        house
      )
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }

  getHouseReviews(houseId: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/reviews/${houseId}`);
  }

  fullDatabase() {
    this.http.post(`${environment.baseUrl}/houses/fulldb`, {}).subscribe({
      error: (error) => {
        console.log(error);
      },
    });
  }

  makeABook(houseId: string, newReserve: Booking, userId: string) {
    this.http
      .post(`${environment.baseUrl}/bookings`, { houseId, newReserve, userId })
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }

  postNewReview(
    opinion: string,
    rating: number,
    userId: string,
    houseId: string,
    userEmail: string
  ): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/reviews`, {
      opinion,
      rating,
      userId,
      houseId,
      userEmail,
    });
  }

  getHouses_withOrder(order: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/houses/order/${order}`);
  }

  getPaymentLink(item: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/mercadopago/payment`,
      item
    );
  }

  updateBookingStatus(houseId: string, code: string, status: string) {
    this.http
      .put<any>(`${environment.baseUrl}/bookings/checkstatus`, {
        houseId: houseId,
        code: code,
        status: status,
      })
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }

  getUsers(): Observable<any> {
    // return this.http.get<any>(`${environment.baseUrl}/users/allUsers`);
    return this.http.get<any>(`${environment.baseUrl}/users/allUsers`);
  }

  getUsersD(): Observable<any> {
    // return this.http.get<any>(`${environment.baseUrl}/users/allUsers`);
    return this.http.get<any>(`${environment.baseUrl}/users/usersD`);
  }

  deleteAccount(userId: string, value: string) {
    return this.http.put<any>(
      `${environment.baseUrl}/users/deleteAccount/${userId}?value=${value}`,
      { userId }
    );
  }

  fetchGeoLoc(): Observable<any> {
    const data = this.http.get<any>(
      `https://api.ipregistry.co/?key=kyas25fizs7e9yrf`
    );
    return data;
  }

  handleHouseState(userId: string, houseId: string, newValues: any) {
    return this.http.put<any>(
      `${environment.baseUrl}/houses/edithouse/${houseId}?userId=${userId}`,
      newValues
    );
    // .subscribe({
    //   error: error => {
    //     console.log(error)
    //   }
    // })
  }

  getDeletedHouses(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/houses/deletedhouses`);
  }

  updateData(value: any) {
    this.http
      .put(`${environment.baseUrl}/users/editUser/${value.userId}`, value)
      .subscribe({ error: (error) => console.log(error) });
  }

  set_admin(newValues: any, userId: string): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}/users/editUser/${userId}`,
      newValues
    );
  }
}
