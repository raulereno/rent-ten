import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../../models/House';
import { DataServiceService } from '../../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { userProfile } from '../../../models/UserProfile';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { addFavoriteHouse, deleteFavoriteHouse } from 'src/app/redux/actions/location.actions';
import { Store } from '@ngrx/store';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  @Input() house: House;
  @Input() dbProfile: userProfile

  userProfile$: Observable<any> = new Observable()
  public userProfile: userProfile;


  constructor(public http: DataServiceService, public auth: AuthService, private router: Router, private store: Store<any>,) { }

  profileJson: any;
  allHouses: House[] = []
  indexPhoto: number = 0
  starRating: number
  n:number = 0

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile)
    this.userProfile$.subscribe(() => {
      this.house.scores.forEach((score) => this.n = this.n + score)
      this.starRating = this.n / this.house.scores.length
   }) 
  }
  
  setFavorite(houseId: string, userId: string): void {
    if (!userId) {
      this.auth.loginWithRedirect();
    } else {
      this.http.setFavorite(houseId, userId)
      this.store.dispatch(addFavoriteHouse({ payload: houseId }))
    }
  }

  deleteFavorite(houseId: string, userId: string): void {
    this.http.deleteFavorite(houseId, userId)
    this.store.dispatch(deleteFavoriteHouse({ payload: houseId }))
  }


  checkIsFavorite(houseId: string) {
    if (this.dbProfile.favoriteshouses) {
      return this.dbProfile.favoriteshouses.some((h: any) => h == houseId)
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
    if (this.indexPhoto !== (this.house.picture.length - 1)) { this.indexPhoto++ }
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
