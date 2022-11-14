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
import { LocalStorageService } from 'src/app/services/local-storage.service';


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

  constructor(public http: DataServiceService, public auth: AuthService, private router: Router, private store: Store<any>, private localStorageSvc:LocalStorageService) { }

  profileJson: any;
  allHouses: House[] = []
  indexPhoto:number = 0

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile)
  }

  setFavorite(houseId: string, userId: string): void {
    
    if (!userId) {    
      this.auth.loginWithRedirect();
    } else {
      this.http.setFavorite(houseId, userId)
      this.store.dispatch(addFavoriteHouse({payload: houseId}))
    }
  }

  /* setFavoriteVisitor(favorites: House){
    let favoritesHouses: House[] = [];
     if(localStorage.getItem('favorite')===null){
      favoritesHouses.push(favorites)
      // this.store.dispatch(addFavoriteHouse({payload: houseId}))
      localStorage.setItem('favorite', JSON.stringify(favorites));
     } else {
      favoritesHouses = JSON.parse(localStorage.getItem('favorite')!);
     favoritesHouses.push(favorites)
    //   // this.store.dispatch(addFavoriteHouse({payload: houseId}))
    localStorage.setItem('favorite', JSON.stringify(favorites))}
    console.log(favoritesHouses)} */
  

  /* setFavoriteVisitor2(houseId: string): void {
    let favoritesHouses:any = [];
    // if(localStorage.getItem('favorite')===null){
      // favoritesHouses.push(houseId)
      // this.store.dispatch(addFavoriteHouse({payload: houseId}))
      localStorage.setItem('favorite', JSON.stringify(houseId));
    // } else {
    //   favoritesHouses = JSON.parse(localStorage.getItem('favorite')!);
    // //  favoritesHouses.push(houseId)
    //   // this.store.dispatch(addFavoriteHouse({payload: houseId}))
    // localStorage.setItem('favorite', JSON.stringify(houseId))}
  } */

  toggleFavorite(houseId:string):void{
    this.localStorageSvc.addToFavorite(houseId)
  }


  deleteFavorite(houseId: string, userId: string): void {
    this.http.deleteFavorite(houseId, userId)
    this.store.dispatch(deleteFavoriteHouse({payload: houseId}))
  }


  checkIsFavorite(houseId: string) {
    if (this.dbProfile.favoriteshouses) {
      return this.dbProfile.favoriteshouses.some((h: any) => h == houseId)
    } else {
      return false
    }
  }

  showInfo() {
    console.log(this.userProfile$)
  }

  giveMePhoto() {
    return this.house.picture[this.indexPhoto]
  }

  paginationForward() {
    if (this.indexPhoto !== (this.house.picture.length- 1) ){ this.indexPhoto++ }
  }

  paginationBack() {
    if (this.indexPhoto !== 0 ){ this.indexPhoto-- }
  }

}
