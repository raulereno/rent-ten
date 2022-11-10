import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../../models/House';
import { DataServiceService } from '../../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  @Input() house: House;


  constructor(public http: DataServiceService, public auth: AuthService) { }

  profileJson: any;
  dbProfile: any = {}
  allHouses: House[] = []
  indexPhoto:number = 0


  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data);
      this.http.updateUser(this.profileJson.email, this.profileJson.picture, this.profileJson.sub)
    });

    this.http.getHouses().subscribe(data => this.allHouses = data);
  }

  setFavorite(houseId: string, userId: string): void {
    if (!userId) {
        this.auth.loginWithRedirect();
    } else {
      this.http.setFavorite(houseId, userId)
      setTimeout(() => {
        this.ngOnInit()
      }, 200);
    }
  }


  deleteFavorite(houseId: string, userId: string): void {
    this.http.deleteFavorite(houseId, userId)
    setTimeout(() => {
      this.ngOnInit()
    }, 200);
  }


  checkIsFavorite(houseId: string) {
    if (this.dbProfile.favoriteshouses) {
      return this.dbProfile.favoriteshouses.some((h: any) => h == houseId)
    } else {
      return false
    }

  }

  showInfo() {
    console.log(this.indexPhoto)
    console.log(this.house.picture[this.indexPhoto])
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
