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

  // getUsersDashboard(): Observable<any> {
  //   return this.data.getUsers(),
  //     this.data.getUsersD();
  // }

  private changeUserAutorized: string = ""

  private activateAutorized = new BehaviorSubject<string>(this.changeUserAutorized);

  public customChangeAutorized = this.activateAutorized.asObservable();

  public changeModeAutorized(active: string): void {
    this.activateAutorized.next(active);
  }
}
