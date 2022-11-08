import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service'
import { AuthService } from '@auth0/auth0-angular';
import { House } from '../models/House';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  constructor(public http: DataServiceService, public auth: AuthService) { }

// --- LOCAL VARIABLES ---

  profileJson: any;
  dbProfile: any = {}
  allHouses: House[] = []

 // --- ON INIT ---

  ngOnInit(): void {
   
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data)
      this.http.updateUser(this.profileJson.email, this.profileJson.picture, this.profileJson.sub)
      }) 
  
    this.http.getHouses().subscribe(data => this.allHouses = data); 

  }

// --- LOCAL FUNCTIONS ----

  showInfo() {
    console.log(this.allHouses)
  }
}
