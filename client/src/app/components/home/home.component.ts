import { Component, OnInit } from '@angular/core';
import { Country, City } from '../../models/model.interface';
import { filter, map, take } from 'rxjs/operators'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../models/Booking';
import { Data } from '../../services/data.service';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../../models/House';
<<<<<<< HEAD
=======
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Store } from '@ngrx/store';
import { loadCountries, loadedCountries } from 'src/app/redux/actions/countries.actions';
import { Observable } from 'rxjs';
import { selectorListCountries, selectorListLoading } from 'src/app/redux/selectors/selectors';
import { PageEvent } from '@angular/material/paginator';
>>>>>>> develop
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

  public selectedCountry: Country = {
    id: 0,
    name: '',
  }

  public countries: Country[] | undefined;
  public cities: City[] | undefined;

<<<<<<< HEAD
  constructor(private dataSvc: Data, public http: DataServiceService, public auth: AuthService) { }
=======
  // ****** CONSTRUCTOR ******* //
  constructor(
    private dataSvc: Data,
    public http: DataServiceService,
    public auth: AuthService,
    private fb: FormBuilder,
    private store: Store<any>,
    //Inyectamos un servicio para mostrar datos
    private data: Data
  ) { }
>>>>>>> develop

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

<<<<<<< HEAD
  ngOnInit(): void {
    this.getContries()
    this.http.getHouses().subscribe(data => {
      this.allHouses = data
      this.countries2 = this.allHouses.map(h => h.country)})
=======


  // Cuando se ejecute el On Init (Ciclos de Vida)
  ngOnInit(): void {

    //variable para escuchar y que se declara para poder imrpimir/pintar en pagina
    this.loading$ = this.store.select(selectorListLoading);
    this.countries$ = this.store.select(selectorListCountries);

    // DISPARADOR DE ACTIONS
    this.store.dispatch(loadCountries())

    this.data?.getCountries()
      .subscribe((response: Country[]) => {
        console.log('_______', response)
        this.store.dispatch(loadedCountries(
          { countries: response }
        ))
      })


    ///////////////

    // this.countries = this.dataSvc.getCountries();
    this.getContries();
    // this.getCities();
    // this.cities = this.dataSvc.getCities();
    // console.log(this.cities);
    // console.log(this.countries);
>>>>>>> develop

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

<<<<<<< HEAD


=======
  handlePage(e: PageEvent){
    this.page_size = e.pageSize
    this.page_number= e.pageIndex + 1

  }

  page_size: number = 3
  page_number: number = 1
  page_size_options = [5,10,20,50,100] 
>>>>>>> develop
}


