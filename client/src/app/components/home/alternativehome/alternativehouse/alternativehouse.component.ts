import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../../../models/House';
import { DataServiceService } from '../../../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { userProfile } from '../../../../models/UserProfile';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { addFavoriteHouse, deleteFavoriteHouse } from 'src/app/redux/actions/location.actions';
import { Store } from '@ngrx/store';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-alternativehouse',
  templateUrl: './alternativehouse.component.html',
  styleUrls: ['./alternativehouse.component.css']
})
export class AlternativehouseComponent implements OnInit {

  @Input() house: House;
  @Input() dbProfile: userProfile

  userProfile$: Observable<any> = new Observable()
  public userProfile: userProfile;

  constructor(
    public http: DataServiceService,
    public auth: AuthService,
    private router: Router,
    private store: Store<any>,
    private localStorageSvc: LocalStorageService,
    private _helper: HelperService,
  ) { }

  profileJson: any;
  allHouses: House[] = [];
  indexPhoto: number = 0;
  starRating: number;
  n: number;
  darkmode: boolean;

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile)
    this.userProfile$.subscribe(() => {
      this.n = 0
      this.house.scores.forEach((score) => this.n = this.n + score)
      this.starRating = Math.ceil(this.n / this.house.scores?.length)
    })
    this._helper.customDarkMode.subscribe((active: boolean) => this.darkmode = active)

  }

  setFavorite(houseId: string, userId: string): void {
    if (!userId) {
      this.toggleFavorite(houseId)
    } else {
      this.http.setFavorite(houseId, userId)
      this.store.dispatch(addFavoriteHouse({ payload: houseId }))
    }
  }

  toggleFavorite(houseId: string): void {
    let favoritesLS = this.localStorageSvc.getFavoritesHouses()
    if (!favoritesLS?.includes(houseId)) {
    this.localStorageSvc.addToFavorite(houseId)
    this.dbProfile.favoriteshouses?.concat(houseId)
  }
  }

  deleteFavorite(houseId: string, userId: string): void {

    this.http.deleteFavorite(houseId, userId)
    this.store.dispatch(deleteFavoriteHouse({ payload: houseId }))
    this.localStorageSvc.removeFavorite(houseId)

  }

  checkIsFavorite(houseId: string) {
    let favoritesLS = this.localStorageSvc.getFavoritesHouses()
    // let fh = this.dbProfile.favoriteshouses
    if (this.dbProfile.id) {
      return this.dbProfile.favoriteshouses!.some((h: any) => h == houseId)
    } else if (favoritesLS?.length > 0) {
      return favoritesLS.some((h: string) => h == houseId)
    } else {
      return false
    }
  }

  showInfo() {
    console.log(this.n)
  }

  giveMePhoto() {
    return this.house.picture[this.indexPhoto]
  }

  paginationForward() {
    if (this.indexPhoto !== (this.house.picture?.length - 1)) { this.indexPhoto++ }
  }

  paginationBack() {
    if (this.indexPhoto !== 0) { this.indexPhoto-- }
  }

  getRating() {

    let random_num = [...Array(Math.floor(Math.random() * 5)).keys()]
    const stars = '★'
    const emptystars = "&#x2605";
    let array = random_num.map(() => stars)
    let random = array.join("")
    return random
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);



}
