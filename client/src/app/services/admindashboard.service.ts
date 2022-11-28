import { environment } from './../../environments/environment';
import { NewHouse } from './../components/create-house/create-house.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Booking } from '../models/Booking';
import { DataServiceService } from './data-service.service';
import { House } from '../models/House';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  constructor(
    private http: HttpClient,
    private data: DataServiceService,
  ) { }

  private changeUserAutorized: string = ""

  private activateAutorized = new BehaviorSubject<string>(this.changeUserAutorized);

  public customChangeAutorized = this.activateAutorized.asObservable();

  public changeModeAutorized(active: string): void {
    this.activateAutorized.next(active);
  }

  // ----------- Users Services -----------

  // activated users =
  private usersA$ = new BehaviorSubject<any>([])
  get getUsersA$(): Observable<any> {
    return this.usersA$.asObservable()
  }
  setUsersA(): void {
    this.data.getUsers().subscribe(res => this.usersA$.next(res))
  }

  // deleted users =
  private usersD$ = new BehaviorSubject<any>([])
  get getUsersD$(): Observable<any> {
    return this.usersD$.asObservable()
  }
  setUsersD(): void {
    this.data.getUsersD().subscribe(res => this.usersD$.next(res))
  }

  // update tables
  delete_set(id: string, value: string): void {
    this.data.deleteAccount(id, value).subscribe(() => {
      this.setUsersA()
      this.setUsersD()
    })
  }

  // ----------- Houses Services -----------

  // Active houses = 
  private housesA$ = new BehaviorSubject<any>([])
  get getHousesA$(): Observable<any> {
    return this.housesA$.asObservable()
  }
  setHousesA(): void {
    this.data.getHouses().subscribe(res => this.housesA$.next(res))
  }


  // Deleted Houses = 
  private housesD$ = new BehaviorSubject<any>([])
  get getHousesD$(): Observable<any> {
    return this.housesD$.asObservable()
  }
  setHousesD(): void {
    this.data.getDeletedHouses().subscribe(res => this.housesD$.next(res))
  }

  // update tables
  changeHouseStatus(userId: string, houseId: string, newValues: any): void {
    console.log(newValues)
    this.data.handleHouseState(userId, houseId, newValues).subscribe(() => {
      this.setHousesA()
      this.setHousesD()
    })
  }
}