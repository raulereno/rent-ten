import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import { userProfile } from '../models/UserProfile';
import { House } from '../models/House';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})

export class ProfileComponent implements OnInit {

  dbProfile: userProfile = {
    id: '',
    name: '',
    picture: '',
    sub: '',
    lastname: '',
    mail: '',
    country: '',
    admin: false,
    favoriteshouses: []
  }

  allHouses: House[] = []
  favoritesHouses: House[] = []
  profileJson: any

  constructor(public auth: AuthService, private http: DataServiceService) { }


  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data);
      this.http.updateUser(this.profileJson.email, this.profileJson.picture, this.profileJson.sub)
      this.http.getHouses().subscribe(data => {
        this.allHouses = data;
        this.favoritesHouses = this.allHouses.filter((house: House) => this.dbProfile.favoriteshouses.some((h: string) => h == house.id))
      }
      );

    });
  }

  deleteFavorite(houseId: string, userId: string): void {
    this.ngOnInit()
    this.http.deleteFavorite(houseId, userId)
    setTimeout(() => {
      this.ngOnInit()
      this.http.deleteFavorite(houseId, userId)
    }, 500);
  }

  showInfo(): void {
    console.log(this.allHouses)
    console.log(this.favoritesHouses)
    console.log(this.dbProfile.favoriteshouses)
    this.ngOnInit()
  }

}
