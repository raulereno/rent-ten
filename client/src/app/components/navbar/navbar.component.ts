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


  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data);
      setTimeout(() => {
        this.http.updateUser(this.profileJson.email, this.profileJson.picture, this.profileJson.sub)
      }, 500);
    });

  }

  showInfo(): void {
    console.log(this.dbProfile)
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin })
  }

}
