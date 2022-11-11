import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Country, City } from '../../models/model.interface';
import { Data } from '../../services/data.service';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../../models/House';
import { Store } from '@ngrx/store';
import { loadCountries, loadedCountries } from 'src/app/redux/actions/countries.actions';
import { loadHouses } from 'src/app/redux/actions/houses.actions';
import { Observable } from 'rxjs';
import { selectorListCountries, selectorListHouses, selectorListLoading, selectorListProfile } from 'src/app/redux/selectors/selectors';
=======
import { filter, map, take } from 'rxjs/operators'
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Observable } from 'rxjs';
>>>>>>> 7a803473650bff1b9cddcea4a84978c56aa3a045
import { PageEvent } from '@angular/material/paginator';
import { addFavoriteHouse, loadProfile } from 'src/app/redux/actions/userprofile.actions';
import { userProfile } from 'src/app/models/UserProfile';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Store } from '@ngrx/store';
import { Country, City } from '../../models/location.model';
import { selectorListCountries, selectorListLoading } from 'src/app/redux/selectors/selectors';
import { loadData, loadedCountries } from 'src/app/redux/actions/location.actions';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocationService],
})

export class HomeComponent implements OnInit {

  loading$: Observable<any> = new Observable();
  countries$: Observable<any> = new Observable()
  allHouses$: Observable<any> = new Observable()
  userProfile$: Observable<any> = new Observable()

  public selectedCountry: Country = {
    id: 0,
    name: '',
  }

  public countries: Country[] | undefined;
  public cities: City[] | undefined;
  public allHouses: House[]
  public userProfile: userProfile;

  // ****** CONSTRUCTOR ******* //

  constructor(
    // private dataSvc: Data,
    public http: DataServiceService,
    public auth: AuthService,
    private store: Store<any>,
<<<<<<< HEAD
  ) {

  }
=======
    private data: LocationService
  ) { }
>>>>>>> 7a803473650bff1b9cddcea4a84978c56aa3a045

  // getContries(): void {
  //   this.dataSvc.getCountries().subscribe(countries => this.countries = countries)
  // }

  profileJson: any;
  dbProfile: any = {}


  page_size: number = 5
  page_number: number = 1
  page_size_options = [5, 10, 20]
<<<<<<< HEAD

  filterHouses: House[] = []
  minPrice: number;
  maxPrice: number;
=======
>>>>>>> 7a803473650bff1b9cddcea4a84978c56aa3a045


  // --- ON INIT ---

  ngOnInit(): void {

<<<<<<< HEAD
    this.loading$ = this.store.select(selectorListLoading);
    this.countries$ = this.store.select(selectorListCountries);
    this.allHouses$ = this.store.select(selectorListHouses)
    this.userProfile$ = this.store.select(selectorListProfile)
=======
    // this.loading$ = this.store.select(selectorListLoading);
    // this.countries$ = this.store.select(selectorListCountries);
>>>>>>> 7a803473650bff1b9cddcea4a84978c56aa3a045

    // this.store.dispatch(loadData())

<<<<<<< HEAD
    this.getCountries()
    this.getContries();
    this.loadProfile();
    this.loadHouses()
=======
    // this.data?.getCountries()
    //   .subscribe((response: Country[]) => {
    //     console.log('_______', response)
    //     this.store.dispatch(loadedCountries(
    //       { countries: response }
    //     ))
    //   })
    // // this.countries = this.dataSvc.getCountries();
    // this.getContries();

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
>>>>>>> 7a803473650bff1b9cddcea4a84978c56aa3a045

  }

  // --- LOCAL FUNCTIONS ----

<<<<<<< HEAD
  onSelect(event: any): void {
    let id = parseInt(event.target.value)
    this.cities = this.dataSvc.getCities().filter(item => item.countryId === id);
=======
  unavailableDays = (calendarDate: Date): boolean => {
    return !this.allHouses[0].bookings.some((d: Booking) => calendarDate > new Date(d.start) && calendarDate <= new Date(new Date(d.end).getTime() + (24 * 60 * 60 * 1000)))
  }

  // onSelect(event: any): void {
  //   let id = parseInt(event.target.value)
  //   this.cities = this.dataSvc.getCities().filter(item => item.countryId === id);
  // }
>>>>>>> 7a803473650bff1b9cddcea4a84978c56aa3a045

  showInfo() {
    // console.log(this.dbProfile)
    this.store.dispatch(addFavoriteHouse({ payload: '123456' }))
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }
<<<<<<< HEAD

  loadHouses(): void {
    this.http.getHouses().subscribe((res) => {
      this.store.dispatch(loadHouses({ allHouses: res }))
      this.allHouses$.subscribe(res => this.allHouses = res)
    })
  }

  loadProfile(): void {
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      // this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data)

      this.http.getUser(this.profileJson.email).subscribe(res => {
        this.store.dispatch(loadProfile({ userProfile: res }))
        this.userProfile$.subscribe(res => {
          this.userProfile = res
          this.dbProfile = res
        })
      })

      this.http.updateUser(this.profileJson.email, this.profileJson.picture, this.profileJson.sub)
    })
  }

  getCountries() {
    this.dataSvc.getCountries()
      .subscribe((response: Country[]) => {
        console.log('_______', response)
        this.store.dispatch(loadedCountries(
          { countries: response }
        ))
      })
  }

  handlePriceMin(event: any) {
    this.allHouses = this.filterHouses.filter((e) => e.price >= event.target.value)
  }

  handlePriceMax(event: any) {
    this.allHouses = this.filterHouses.filter((e) => e.price <= event.target.value)
  }

  handleCheckboxP(event: MatCheckboxChange): void {

    this.allHouses = this.filterHouses.filter((e) => e.allowpets === false ? e.allowpets == event.checked : this.allHouses)
  }

  handleCheckboxW(event: MatCheckboxChange): void {
    this.allHouses = this.filterHouses.filter((e) => e.wifi === false ? e.allowpets == event.checked : this.allHouses)
  }

=======
>>>>>>> 7a803473650bff1b9cddcea4a84978c56aa3a045
}
