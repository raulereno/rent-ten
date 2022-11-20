import { UploadImgService } from 'src/app/services/upload-img.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import { userProfile } from '../../models/UserProfile';
import { House } from '../../models/House';
import { catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { changeVerifiedStatusProfile, loadProfile } from 'src/app/redux/actions/location.actions';
import { Review } from 'src/app/models/Review';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})


export class ProfileComponent implements OnInit {

  dbProfile: userProfile;
  allHouses: House[] = [];
  favoritesHouses: House[] = [];
  profileJson: any;
  error: any;
  files: File[] = [];
  userProfile$: Observable<any> = new Observable();
  userProfile: userProfile;
  favoritesHouses$: Observable<any> = new Observable();
  profileImg: string;
  reviewsHouses: Review[] = [];
  housesProfile: House[] = []


  constructor(public auth: AuthService,
    private http: DataServiceService,
    private store: Store<any>,
    private _uploadImg: UploadImgService,
    private localStorageSvc: LocalStorageService,) {
  }


  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile)

    this.userProfile$.subscribe(profile => {
      this.userProfile = profile;

    });

    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;

      this.http.getUser(this.profileJson.email).subscribe(res => {
        this.dbProfile = res
        this.store.dispatch(loadProfile({ userProfile: res }))
      });

      this.http.getHouses().subscribe(data => {
        this.allHouses = data;
        let favoritesLS = this.localStorageSvc.getFavoritesHouses()
        this.favoritesHouses = this.allHouses.filter((house: House) => (this.dbProfile.favoriteshouses!.concat(favoritesLS)).some((h: string) => h == house.id))
        console.log('ver array favorites', this.dbProfile.favoriteshouses)
      }
      );
    });
  }

  deleteFavorite(houseId: string, userId: string): void {
    this.http.deleteFavorite(houseId, userId)
    this.favoritesHouses = this.favoritesHouses.filter(house => house.id !== houseId)

  }

  showProfileJson(): void {
    console.log(this.userProfile)
    console.log(this.favoritesHouses)
    console.log("Console Revw: ", this.reviewsHouses)
  }

  verifyAccount(): void {

    //this.dbProfile.verified = 'pending'
    this.store.dispatch(changeVerifiedStatusProfile({ payload: 'pending' }))
    this.http.verifyAccount(this.dbProfile.mail)
  }

  sendVerificationCode(code: string): any {
    this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data);
    this.http.sendVerificationCode(this.profileJson.email, code)
      .pipe(catchError((error): any => { this.error = error.error.msg }))
      .subscribe(data => {
        this.dbProfile.verified = 'verified'
        this.store.dispatch(changeVerifiedStatusProfile({ payload: 'verified' }))
      })

  }
  onFileSelected(event: any): void {
    const data = new FormData();
    data.set('file', event.path[0].files[0]);
    data.set('upload_preset', 'h4e9cy2g');
    data.set('cloud_name', 'dbgpp8nla');

    this._uploadImg.uploadImage(data).subscribe(res => {
      this.http.updateProfilePicture(res.secure_url, this.userProfile.id, this.userProfile.sub);

      this.userProfile = { ...this.userProfile, picture: res.secure_url };

      // TODO: RAUL -DANGER aca se produce un bucle de llamadas- arreglando
      this.store.dispatch(loadProfile({ userProfile: this.userProfile }));


    });
  }



}

export class NgbdAccordionBasic { }
export class SectionModule { }

