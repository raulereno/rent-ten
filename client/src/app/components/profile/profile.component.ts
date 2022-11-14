import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import { userProfile } from '../../models/UserProfile';
import { House } from '../../models/House';
import { catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { changeVerifiedStatusProfile } from 'src/app/redux/actions/location.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})

export class ProfileComponent implements OnInit {

  dbProfile: userProfile;
  allHouses: House[] = []
  favoritesHouses: House[] = []
  profileJson: any
  error:any

  userProfile$: Observable<any> = new Observable()
  userProfile: userProfile;

  favoritesHouses$: Observable<any> = new Observable()

  constructor(public auth: AuthService, private http: DataServiceService, private store: Store<any>,) {

    this.userProfile$ = this.store.select(selectorListProfile)
   
   }


  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile)

    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data);
      this.http.getHouses().subscribe(data => {
        this.allHouses = data;
        this.favoritesHouses = this.allHouses.filter((house: House) => this.dbProfile.favoriteshouses!.some((h: string) => h == house.id))
        }
      );
    });
  }

  deleteFavorite(houseId: string, userId: string): void {
    this.http.deleteFavorite(houseId, userId)
    this.favoritesHouses = this.favoritesHouses.filter(house => house.id !== houseId )

  }

  showProfileJson(): void {
    console.log(this.userProfile)
    console.log(this.favoritesHouses)
  }

  verifyAccount(): void {
    this.dbProfile.verified = 'pending'
    this.store.dispatch(changeVerifiedStatusProfile({payload: 'pending'}))
    this.http.verifyAccount(this.dbProfile.mail)
  }

  sendVerificationCode(code:string):any {
    this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data);
    this.http.sendVerificationCode(this.profileJson.email, code)
    .pipe(catchError((error):any => {this.error = error.error.msg}))
    .subscribe(data => {
      this.dbProfile.verified = 'verified'
      this.store.dispatch(changeVerifiedStatusProfile({payload: 'verified'}))
    })
    
  }


}

