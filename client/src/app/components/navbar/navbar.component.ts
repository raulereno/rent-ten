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
import { DataService } from '../../services/data.service';

import { House } from '../../models/House';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { loadProfile } from 'src/app/redux/actions/location.actions';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DataService],
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public http: DataService,
    private _store: Store<any>,
    @Inject(DOCUMENT) private doc: Document,
    private _helper: HelperService,
    private router: Router,
    private localStorageSvc: LocalStorageService,
    private modalService: NgbModal
  ) {}

  public active: boolean = false;
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
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    if (!this.userProfile.id) {
      // alert('You need login for post your place')
      Swal.fire({
        title: 'You must be a user to be able to create a house',
        text: 'Do you want to register?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        background: this.darkmode ? '#303030' : 'white',
        color: this.darkmode ? 'white' : 'black',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes I want to register',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.auth.loginWithRedirect();
        }
      });
    } else if (this.userProfile.verified !== 'verified') {
      // alert('Your account must to be verification')
      Swal.fire({
        html: '<h2> Your account must be verified </h2> <br> <p>Do you want to verify your account?</p>',
        icon: 'warning',
        background: this.darkmode ? '#303030' : 'white',
        color: this.darkmode ? 'white' : 'black',
      }).then((result) => {
        this.router.navigate(['profile']);
      });
      // this.router.navigate(['profile']);
    } else {
      this.router.navigate(['createhouse']);
    }
  }

  darkMode(): void {
    this.darkmode = !this.darkmode;
    localStorage.setItem('darkmode', JSON.stringify(this.darkmode));

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
  setActive(): void {
    this.active = !this.active;
  }
}
