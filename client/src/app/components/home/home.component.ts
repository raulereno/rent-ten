import { Component, OnInit } from '@angular/core';
import { Country, City } from '../../models/model.interface';
import { filter, map, take } from 'rxjs/operators'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../models/Booking';
import { Data } from '../../services/data.service';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../../models/House';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Data],
})

export class HomeComponent implements OnInit {

  public selectedCountry: Country = {
    id: 0,
    name: '',
  }

  public countries: Country[] | undefined;
  public cities: City[] | undefined;

  constructor(private dataSvc: Data, public http: DataServiceService, public auth: AuthService) { }

  getContries(): void {
    this.dataSvc.getCountries().subscribe(countries => this.countries = countries)
  }

  // --- LOCAL VARIABLES ---

  profileJson: any;
  dbProfile: any = {}
  allHouses: House[] = []
  isLogged: boolean;
  countries2: string[]

  // --- ON INIT ---

  ngOnInit(): void {
    this.getContries()
    this.http.getHouses().subscribe(data => {
      this.allHouses = data
      this.countries2 = this.allHouses.map(h => h.country)})

    this.auth.isAuthenticated$.subscribe(data => this.isLogged = data)

    this.auth.user$?.subscribe((profile:any) => {
      this.profileJson = profile
      this.http.updateUser(this.profileJson.email, this.profileJson.picture, this.profileJson.sub)
      this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data)})

    }


  // --- LOCAL FUNCTIONS ----

  unavailableDays = (calendarDate: Date): boolean => {
    return !this.allHouses[0].bookings.some((d: Booking) => calendarDate > new Date(d.start) && calendarDate <= new Date(new Date(d.end).getTime() + (24 * 60 * 60 * 1000)))
  }

  onSelect(event: any): void {
    let id = parseInt(event.target.value)
    this.cities = this.dataSvc.getCities().filter(item => item.countryId === id)
  }

  showInfo() {
    console.log('dbProfile: ' + this.dbProfile)
    console.log(this.dbProfile)
    console.log('--------------------------------')
    console.log('jsonprof: ' + this.profileJson)
    console.log( this.profileJson)
  }



}


