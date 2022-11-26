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
  selector: 'app-table-house-a',
  templateUrl: './table-house-a.component.html',
  styleUrls: ['./table-house-a.component.css']
})
export class TableHouseAComponent implements OnInit {
 
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
  houseId: string;
  userId: string;
 

  ngOnInit(): void {

    this.getHouses();
    console.log(this.houses)
    this.userProfile$ = this.store.select(selectorListProfile);
    
    this.loadProfile();
    console.log('usserprofile',this.userProfile)
    
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
    this.http. getHouses().subscribe(res=>this.houses = res.filter((elem:any)=>elem.deleted ===false))
    console.log(this.houses)
  }
 

  
  deleteHouse(houseId:string){
    console.log(this.userProfile)
    console.log('houseId',houseId)
    console.log('userprofileid',this.userProfile.id)
    
    this.houseId= houseId

    let newValues:any ={
      deleted: true
    }
    this.http.handleHouseState(this.userProfile.id, this.houseId, newValues)
   console.log(this.userProfile)
  
    
  } 
  
  back(){this.router.navigate(['dashboard'])}
 
 showInfo() {
   console.log(this.houses)
 }
}
