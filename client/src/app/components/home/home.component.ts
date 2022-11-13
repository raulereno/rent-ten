import { Component, OnInit,ViewChild } from '@angular/core';

import { Country, City } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../../models/House';
import { Store } from '@ngrx/store';
import { loadCountries, loadedCountries, loadHouses, loadProfile, addFavoriteHouse, handleFilters } from 'src/app/redux/actions/location.actions';
import { Observable, pipe } from 'rxjs';
import { selectorListCountries, selectorListHouses, selectorListLoading, selectorListProfile, selectorListBackup, selectorListCities } from 'src/app/redux/selectors/selectors';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { userProfile } from 'src/app/models/UserProfile';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocationService],
})

export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  loading$: Observable<any> = new Observable();
  countries$: Observable<any> = new Observable()
  allHouses$: Observable<any> = new Observable()
  userProfile$: Observable<any> = new Observable()
  backupHouses$: Observable<any> = new Observable()
  city$: Observable<any> = new Observable();

  public countries: Country[] | undefined;
  public cities: City[] | undefined;
  public allHouses: House[]
  public userProfile: userProfile;
  public backupHouses: House[];
  public city: string[]

  // ****** CONSTRUCTOR ******* //

  constructor(
    private dataSvc: LocationService,
    public http: DataServiceService,
    public auth: AuthService,
    private store: Store<any>,
  ) {

  }

  getContries(): void {
    this.dataSvc.getCountries().subscribe(countries => this.countries = countries)
  }

  profileJson: any;
  dbProfile: any = {}

  page_size: number = 5
  page_number: number = 1
  page_size_options = [5, 10, 20]
  filterHouses: House[] = []
  countriesInDB:string[];

  minPrice: number;
  maxPrice: number;
  allowpets: boolean;
  wifi: boolean;
  selectedCountry: string;
  selectedCity: string;

  // --- ON INIT ---

  ngOnInit(): void {

    this.loading$ = this.store.select(selectorListLoading);
    this.countries$ = this.store.select(selectorListCountries);
    this.allHouses$ = this.store.select(selectorListHouses)
    this.userProfile$ = this.store.select(selectorListProfile)
    this.backupHouses$ = this.store.select(selectorListBackup)
    this.city$ = this.store.select(selectorListCities)

    this.store.dispatch(loadCountries())

    this.getCountries()
    this.getContries();
    this.loadProfile();
    this.loadHouses()

  }

  // --- LOCAL FUNCTIONS ----

  showInfo() {
    console.log()
  }


  // --- ON INIT ----

  loadHouses(): void {
    this.http.getHouses().subscribe((res) => {
      this.store.dispatch(loadHouses({ allHouses: res }))
      this.allHouses$.subscribe(res => {
        this.allHouses = res;
        this.countriesInDB= this.allHouses.map(e=>e.country).sort();
      })
    })
  }

  loadProfile(): void {
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe(res => {
        this.store.dispatch(loadProfile({ userProfile: res }));

        this.userProfile$.subscribe(res => {
          console.log(res);
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
        this.store.dispatch(loadedCountries(
          { countries: response }
        ))

      })
  }


  // --- PAGINATION ----

  handlePage(e: PageEvent) {
    console.log(e);
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }



  // --- ORDER AND FILTERS ----

  handlePriceMin(event: any) {
    this.minPrice = event.target.value
    console.log(this.minPrice, this.maxPrice, this.allowpets, this.wifi)
    this.handleFilters()
  }

  handlePriceMax(event: any) {
    this.maxPrice = event.target.value
    this.handleFilters()

  }

  handleCheckboxP(pets: boolean): void {
    this.allowpets = pets
    this.handleFilters()
  }

  handleCheckboxW(wifi: boolean): void {
    this.wifi = wifi
    this.handleFilters()
  }

  handleCountry(country: string) {
    this.selectedCountry = country
    this.handleFilters()
    let nombrecualquier = this.allHouses?.filter((elemten) => elemten.country === country)
    this.city = nombrecualquier?.map(elemt => elemt.city)

  }

  handleFilters() {
    this.store.dispatch(handleFilters({
      payload: {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        allowPets: this.allowpets,
        wifi: this.wifi,
        selectedCountry: this.selectedCountry,
        selectedCity: this.selectedCity
      }
    }))
    this.paginator.firstPage()
  }

  handleCity(city: string) {
    console.log("Console City: ", city)
    this.selectedCity = city
    console.log("city", city)
    this.handleFilters()
    // let nombrecualquier = this.allHouses?.filter((elemten) => elemten.city === city)

    // console.log("Nombre cualquiera: ", nombrecualquier)
  }

}
