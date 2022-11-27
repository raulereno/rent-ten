import { environment } from './../../environments/environment';
import { NewHouse } from './../components/create-house/create-house.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Booking } from '../models/Booking';
import { DataServiceService } from './data-service.service';

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
    this.data.deleteAccount(id, value).subscribe(res => {
      this.setUsersA()
      this.setUsersD()
    })
  }

}
