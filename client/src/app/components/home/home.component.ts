import { Component, OnInit } from '@angular/core';
import { Country, City } from '../../models/model.interface';
import { filter, map, take } from 'rxjs/operators'

import { Data } from '../../services/data.service';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
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

  constructor(private dataSvc: Data, public http: DataServiceService, public auth: AuthService, private fb: FormBuilder) { }

  getContries(): void {
    this.dataSvc.getCountries().subscribe(countries => this.countries = countries)
  }

  // getCities(): void {
  //   this.dataSvc.getCities().subscribe(cities => this.cities = cities)
  // }

  // --- LOCAL VARIABLES ---

  form: FormGroup;

  profileJson: any;
  dbProfile: any = {}
  allHouses: House[] = []

  // --- ON INIT ---



  ngOnInit(): void {
    // this.countries = this.dataSvc.getCountries();
    this.getContries();
    // this.getCities();
    // this.cities = this.dataSvc.getCities();
    // console.log(this.cities);
    // console.log(this.countries);

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

  unavailableDays = (calendarDate: Date): boolean => {
    return !this.allHouses[0].bookings.some((d: Booking) => calendarDate > new Date(d.start) && calendarDate <= new Date(new Date(d.end).getTime() + (24 * 60 * 60 * 1000)))
  }

  onSelect(event: any): void {
    let id = parseInt(event.target.value)
    // console.log('Id => ', event.target.value)

    // console.log(id)

    // let filterCities = this.dataSvc.getCities().pipe(map(elemet => elemet.filter(item => item.countryId === id))).subscribe(city => this.cities = city)

    // // let filterCities = this.dataSvc.getCities().forEach(element => element.filter(item => item.countryId === id))


    // console.log(filterCities)

    // this.cities = filterCities

    this.cities = this.dataSvc.getCities().filter(item => item.countryId === id);

  }
  showInfo() {
    console.log(this.allHouses)
  }
}


