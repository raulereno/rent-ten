import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { loadProfile } from 'src/app/redux/actions/location.actions';
import { userProfile } from 'src/app/models/UserProfile';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';

@Component({
  selector: 'app-table-house-d',
  templateUrl: './table-house-d.component.html',
  styleUrls: ['./table-house-d.component.css']
})


export class TableHouseDComponent implements OnInit {
 

  constructor(
    public http: DataServiceService,
    private router: Router,
    public auth: AuthService,
    private store: Store<any>,
    ) { }
  
  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;
  public houses: any[];
  profileJson: any;
  houseId : string;
  userId : string;
  ngOnInit(): void {

    this.getHouses();
    this.userProfile$ = this.store.select(selectorListProfile);
    this.deleteHouse(this.houseId,this.userId);
  }

  loadProfile(): void {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe((res) => {
        this.store.dispatch(loadProfile({ userProfile: res }));
        this.userProfile$.subscribe((res) => {
          this.userProfile = res;
        });
      });

      this.http.updateUser(this.profileJson.email, this.profileJson.sub);
    });
  }
  getHouses(){
    this.http. getHouses().subscribe(res=>this.houses = res)
    console.log(this.houses)
  }
 
   deleteHouse(houseId:string, userId: string){
    this.userId= userId
    this.houseId= houseId
    let newValues :any ={
      deleted: true
    }
    this.http. handleHouseState(this.houseId, this.userId, newValues)
    console.log(this.userProfile.id)
  }  

  back(){this.router.navigate(['dashboard'])}
 
 showInfo() {
   console.log(this.houses)
 }
}
