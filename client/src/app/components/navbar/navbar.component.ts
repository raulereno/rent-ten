import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DataServiceService } from '../../services/data-service.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DataServiceService]
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, public http: DataServiceService, @Inject(DOCUMENT) private doc: Document) { }

  profileJson: any;
  dbProfile: any = {}
  isLogged: boolean;

  ngOnInit(): void {
  }

  loginWithRedirect = async ():Promise<void> => {
    this.auth.loginWithRedirect({authorizationParams: {redirect_uri: window.location.origin}})
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin })
  }

  showInfo(): void {
  }

  fullDatabase(): void {
    console.log('asdasd')
    this.http.fullDatabase()
    this.ngOnInit()
  }

}
