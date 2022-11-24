import { HelperService } from './../../services/helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Country, City } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { DataServiceService } from '../../services/data-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../../models/House';
import { Store } from '@ngrx/store';
import {
  loadCountries,
  loadedCountries,
  loadHouses,
  loadProfile,
  addFavoriteHouse,
  handleFilters,
} from 'src/app/redux/actions/location.actions';
import { Observable, pipe } from 'rxjs';
import {
  selectorListCountries,
  selectorListHouses,
  selectorListLoading,
  selectorListProfile,
  selectorListBackup,
  selectorListCities,
} from 'src/app/redux/selectors/selectors';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { userProfile } from 'src/app/models/UserProfile';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { handleOrder } from 'src/app/redux/actions/location.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';


const calculateFilter = (form: any): number => {
  const { allowPets, city, country, maxPrice, minPrice, order, wifi } = form;
  let count: number = 0;
  if (allowPets === true) {
    count++;
  }
  if (wifi === true) {
    count++;
  }
  if (city.length) {
    count++;
  }
  if (country.length) {
    count++;
  }
  if (maxPrice > 0) {
    count++;
  }
  if (minPrice > 0) {
    count++;
  }
  return count;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocationService],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  loading$: Observable<any> = new Observable();
  countries$: Observable<any> = new Observable();
  allHouses$: Observable<any> = new Observable();
  userProfile$: Observable<any> = new Observable();
  backupHouses$: Observable<any> = new Observable();
  city$: Observable<any> = new Observable();

  public countries: Country[] | undefined;
  public cities: City[] | undefined;
  public allHouses: House[];
  public userProfile: userProfile;
  public backupHouses: string[];
  public city: string[];

  // ****** CONSTRUCTOR ******* //

  constructor(
    public http: DataServiceService,
    public auth: AuthService,
    private store: Store<any>,
    private readonly fb: FormBuilder,
    private _helper: HelperService,
    private modalService: NgbModal,
    private localStorageSvc: LocalStorageService
  ) { }

  filterForm!: FormGroup;

  initForm(): FormGroup {
    return this.fb.group({
      country: [null],
      city: [null],
      order: [null],
      minPrice: [null],
      maxPrice: [null],
      allowPets: [null],
      wifi: [null],
    });
  }

  profileJson: any;
  dbProfile: any = {};

  page_size: number = 20;
  page_number: number = 1;
  page_size_options = [5, 10, 20];

  backupAllHouses: House[] = [];
  countriesInDB: string[];
  backupCountries: string[];

  selectedCountry: string;
  selectedCity: string;
  order: string;

  darkmode: boolean;
  show_div: boolean = false;
  quantityFilter: number = 0;
  // --- ON INIT ---

  ngOnInit(): void {
    this.filterForm = this.initForm();

    // this._helper.customDarkMode.subscribe(
    //   (active: boolean) => (this.darkmode = active)
    // );

    this.loading$ = this.store.select(selectorListLoading);
    this.countries$ = this.store.select(selectorListCountries);
    this.allHouses$ = this.store.select(selectorListHouses);
    this.userProfile$ = this.store.select(selectorListProfile);
    this.backupHouses$ = this.store.select(selectorListBackup);
    this.backupHouses$.subscribe(res=>{
      this.backupAllHouses = res;
    });
    this.city$ = this.store.select(selectorListCities);

    this.store.dispatch(loadCountries());

    this.loadProfile();
    this.loadHouses();

    console.log(this.filterForm.value)

  }

  // --- LOCAL FUNCTIONS ----

  loadHouses(): void {
    this.http.getHouses().subscribe((res) => {
      this.store.dispatch(loadHouses({ allHouses: res }));
      this.allHouses$.subscribe((res) => {
        this.allHouses = res;
        if (!this.backupHouses) {
          let set = new Set(this.allHouses.map((e) => e.country).sort());
          this.backupHouses = [...set];
          this.backupCountries = this.backupHouses;
        }
      });
    });
  }

  loadProfile(): void {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe((res) => {
        this.store.dispatch(loadProfile({ userProfile: res }));
        this.userProfile$.subscribe((res) => {
          this.userProfile = res;
          this.dbProfile = res;

          let favoritesLS = this.localStorageSvc.getFavoritesHouses()
          favoritesLS?.forEach((houseId:string) => {
            this.setFavorite(houseId, res.id)
          })
          localStorage.clear()
          
        });
      });

      this.http.updateUser(this.profileJson.email, this.profileJson.sub);

    });
  }

  // --- PAGINATION ----

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  // --- ORDER AND FILTERS ----

  handleCountry() {

    const {country}= this.filterForm.value;

    let nombrecualquier = this.backupAllHouses?.filter(
        (element) => element.country === country
      );
      this.city = nombrecualquier?.map(elemt => elemt.city);

    this.filterForm.get('city')?.setValue('');


  }

  handleCity(event: any) { //TODO: BUSCAR EL TIPO DEL EVENTO
    let city = event.target.value;
    this.selectedCity = city;
    console.log('city', city);
    // this.handleFilters();

    let nombrecualquier = this.allHouses?.filter(
      (elemten) => elemten.city === city
    );

    // console.log("Nombre cualquiera: ", nombrecualquier)
  }

  handleOrder() {
    const {order}= this.filterForm.value;
    this.store.dispatch(handleOrder({ payload:order }));
  }

  handleFilters() {
    const { allowPets, city, country, maxPrice, minPrice, order, wifi } =
      this.filterForm.value;

    this.store.dispatch(
      handleFilters({
        payload: {
          minPrice: minPrice,
          maxPrice: maxPrice,
          allowPets: allowPets,
          wifi: wifi,
          selectedCountry: country,
          selectedCity: city,
        },
      })
    );
    this.paginator.firstPage();

    this.quantityFilter = calculateFilter(this.filterForm.value);
    console.log(this.quantityFilter);
    // this.store.dispatch(handleOrder({payload: this.order}))
    //this.store.dispatch(handleOrder({payload: this.order}))
  }
  applyFilter() {
    this.handleFilters();
  }

  handleCountryClick() {
    console.log('hiciste click');
    selectedCountry: this.loadHouses();
    this.selectedCity = '';
  }

  openFilterModal(filters: any) {
    this.modalService.open(filters, { ariaLabelledBy: 'modal-basic-title',size:'lg' });
  }

  clearFilters() {

    this.filterForm.reset({
      country: null,
      city: null,
      order: null,
      minPrice: null,
      maxPrice: null,
      allowPets: false,
      wifi: false,
      
    });
    this.selectedCity = '';
    this.loadHouses();
  }

  setFavorite(houseId: string, userId: string): void {
    this.http.setFavorite(houseId, userId)
    this.store.dispatch(addFavoriteHouse({ payload: houseId }))
}


}
