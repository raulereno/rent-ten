import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsersguardGuard implements CanActivate {

  constructor(public auth: AuthService,
    private http: DataService,) { }

  profileJson: any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.auth.user$.subscribe((profile) => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe((res) => {
        res.authorized === 'not' ? this.notAuthorized() : ''
      });
    });

    return true;

  }


  notAuthorized() {

    Swal.fire({
      icon: 'error',
      title: 'Forbbiden',
      text: 'You have been banned from Rent-Ten. \n Contact us by e-mail (rentten2022@gmail.com) if you think there has been an error.',
    });
    setTimeout(() => {
      this.auth.logout()
    }, 4000);
  }


}
