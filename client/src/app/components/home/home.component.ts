import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../models/Booking';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  constructor(public http: DataServiceService, public auth: AuthService, private fb: FormBuilder) { }

// --- LOCAL VARIABLES ---

  form: FormGroup;

  profileJson: any;
  dbProfile: any = {}
  allHouses: House[] = []

 // --- ON INIT ---

  ngOnInit(): void {
   
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data)
      this.http.updateUser(this.profileJson.email, this.profileJson.picture, this.profileJson.sub)
      }) 
  
    this.http.getHouses().subscribe(data => this.allHouses = data); 

    this.form = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    })

  }

// --- LOCAL FUNCTIONS ----

  unavailableDays = (calendarDate: Date):boolean => {
    return !this.allHouses[0].bookings.some((d:Booking) => calendarDate > new Date(d.start) && calendarDate <= new Date(new Date(d.end).getTime() + (24 * 60 * 60 * 1000)))
  }

  showInfo() {
    console.log(this.allHouses)
  }
}
