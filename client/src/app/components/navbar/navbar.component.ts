import { HelperService } from './../../services/helper.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectorListHouses,
  selectorListProfile,
} from 'src/app/redux/selectors/selectors';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DataServiceService } from '../../services/data-service.service';

import { House } from '../../models/House';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { loadProfile } from 'src/app/redux/actions/location.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DataServiceService],
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public http: DataServiceService,
    private _store: Store<any>,
    @Inject(DOCUMENT) private doc: Document,
    private _helper:HelperService,
    private router: Router,
    private localStorageSvc:LocalStorageService,
    private modalService: NgbModal,
  ) {}

  public active:boolean=false;
  profileJson: any;
  dbProfile: any = {};
  isLogged: boolean = true;
  userProfile: any;

  allHouses: House[] = [];
  favoritesHouses: House[] = [];
  allHouses$: Observable<any> = new Observable();
  favorites: string[];

  userProfile$: Observable<any> = new Observable();

  darkmode: boolean;

  ngOnInit(): void {
    this.auth.user$.subscribe((res) => {
      const mail = res?.email;
      if (res === null) this.isLogged = false;
      if (mail !== undefined) {
        this.http.getUser(mail).subscribe((res) => {
          this._store.dispatch(loadProfile({ userProfile: res }));
          this.userProfile = res;
        });
      }
    });

    this.allHouses$ = this._store.select(selectorListHouses);

    this.allHouses$.subscribe((res) => {
      let favorites = this.localStorageSvc.getFavoritesHouses();
      this.favoritesHouses = res.filter((house: House) =>
        favorites.some((h: string) => h === house.id)
      );
    });
    this.userProfile$ = this._store.select(selectorListProfile);
    this.userProfile$.subscribe((res) => {
      this.userProfile = res;
    });

    this._helper.customDarkMode.subscribe(
      (active: boolean) => (this.darkmode = active)
    );
  }
  validateUser(): void {
    if (!this.userProfile.id) {
      if (confirm('You need login for post your place')) {
        this.auth.loginWithRedirect();
      }
    }
    else if (this.userProfile.verified !== 'verified'){console.log(this.userProfile.verified)
      alert('Your account must to be verificated')
      this.router.navigate(['profile']);
     }
    }



  darkMode() : void{
     this.darkmode = !this.darkmode;
     localStorage.setItem('darkmode',JSON.stringify(this.darkmode));

     this._helper.changeMode(this.darkmode);
  }

  loginWithRedirect = async (): Promise<void> => {
    this.auth.loginWithRedirect({
      authorizationParams: { redirect_uri: window.location.origin },
    });
  };

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  showInfo(): void {}

  getFavoriteLS(): void {
    this.favorites = this.localStorageSvc.getFavoritesHouses();
  }

  removeFavoriteLS(id: string): void {
    this.localStorageSvc.removeFavorite(id);
    this.ngOnInit();
  }

  openModalFav(favorites: any) {
    this.ngOnInit();
    this.modalService.open(favorites, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  fullDatabase(): void {
    this.http.fullDatabase();
    this.ngOnInit();
  }
  setActive():void{
    this.active=!this.active
  }
}