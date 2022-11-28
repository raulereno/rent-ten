import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { DataServiceService } from 'src/app/services/data-service.service';
import { userProfile } from 'src/app/models/UserProfile';
import { Observable } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { loadProfile } from 'src/app/redux/actions/location.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {



  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
 

  constructor(
    private breakpointObserver: BreakpointObserver,
    public http: DataServiceService,
    private router: Router,   
    public auth: AuthService,
    private store: Store<any>,) {}
  
  
  public users: [];
  public houses: any[];
  profileJson: any;
  houseId: string;
  userId: string;
  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;

  ngOnInit(): void {

    this.http.getHouses().subscribe(res=>this.houses = res)
    console.log(this.houses)
  
  }
 
   /*  this.userProfile$ = this.store.select(selectorListProfile);
    
    this.loadProfile();
    console.log('usserprofile',this.userProfile)
    
  

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
    // this.http. getHouses().subscribe(res=>this.houses = res.filter((elem:any)=>elem.deleted ===false))
    this.http. getHouses().subscribe(res=>this.houses = res)
    console.log(this.houses)
  } 
*/
redirectHA(){this.router.navigate(['dashboard/housesA'])}

redirectHD(){this.router.navigate(['dashboard/housesD'])}

redirectUA(){this.router.navigate(['dashboard/usersA'])}

redirectUD(){this.router.navigate(['dashboard/usersD'])}
  
  /* getUsers(){
    this.http.getUsers().subscribe(res=>this.users = res)
     console.log(this.users)
  } */
}
