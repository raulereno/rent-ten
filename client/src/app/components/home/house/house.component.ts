import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../../models/House';
import { DataServiceService } from '../../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { userProfile } from '../../../models/UserProfile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  @Input() house: House;
  @Input() dbProfile: userProfile

  constructor(public http: DataServiceService, public auth: AuthService, private router: Router) { }

  profileJson: any;
  allHouses: House[] = []
  indexPhoto:number = 0


  ngOnInit(): void {
  }

  setFavorite(houseId: string, userId: string): void {
    if (!userId) {
        this.auth.loginWithRedirect();
    } else {
      this.http.setFavorite(houseId, userId)
      this.dbProfile.favoriteshouses.push(houseId)
    }
  }


  deleteFavorite(houseId: string, userId: string): void {
    this.http.deleteFavorite(houseId, userId)
    let index = this.dbProfile.favoriteshouses.indexOf(houseId)
    this.dbProfile.favoriteshouses.splice(index, 1)
  }


  checkIsFavorite(houseId: string) {
    if (this.dbProfile.favoriteshouses) {
      return this.dbProfile.favoriteshouses.some((h: any) => h == houseId)
    } else {
      return false
    }

  }

  showInfo() {
    console.log(this.dbProfile)
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
