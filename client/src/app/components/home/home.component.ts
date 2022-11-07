import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../models/House';
import { userProfile } from '../models/UserProfile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  constructor(public http: DataServiceService, public auth: AuthService) { }

  profileJson: any;
  dbProfile: any = {}
  allHouses: House[] = []

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
}
