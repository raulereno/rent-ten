import { Component, OnInit } from '@angular/core';
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
import { PageEvent } from '@angular/material/paginator';
import { addFavoriteHouse, loadProfile } from 'src/app/redux/actions/userprofile.actions';
import { userProfile } from 'src/app/models/UserProfile';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Data],
})

export class HomeComponent implements OnInit {

  //variable para escuchar y que se declara para poder imrpimir/pintar en pagina
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
    private dataSvc: Data,
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
  minPrice: number;
  maxPrice: number;


  // --- ON INIT ---

  ngOnInit(): void {

    this.loading$ = this.store.select(selectorListLoading);
    this.countries$ = this.store.select(selectorListCountries);
    this.allHouses$ = this.store.select(selectorListHouses)
    this.userProfile$ = this.store.select(selectorListProfile)

    this.store.dispatch(loadCountries())

    this.getCountries()
    this.getContries();
    this.loadProfile();
    this.loadHouses()

  }

  // --- LOCAL FUNCTIONS ----

  onSelect(event: any): void {
    let id = parseInt(event.target.value)
    this.cities = this.dataSvc.getCities().filter(item => item.countryId === id);

  }
  showInfo() {
    // console.log(this.dbProfile)
    this.store.dispatch(addFavoriteHouse({ payload: '123456' }))
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

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

}
