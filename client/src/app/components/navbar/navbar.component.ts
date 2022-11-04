import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) { }

  profileJson: any;

  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {this.profileJson = profile});
  }

  showInfo(): void {
    console.log(this.profileJson.sub)
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin})
  }

}
