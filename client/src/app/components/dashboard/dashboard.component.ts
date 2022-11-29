import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { userProfile } from 'src/app/models/UserProfile';
import { Observable } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { loadProfile } from 'src/app/redux/actions/location.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {




  /** Based on the screen size, switch from standard to one column per row */
/*   cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
  */

  constructor(
    private breakpointObserver: BreakpointObserver,
    public http: DataService,
    private router: Router,
    public auth: AuthService,
    private store: Store<any>
  ) { }

  public users: [];
  public houses: any[];
  profileJson: any;
  houseId: string;
  userId: string;
  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;


  ngOnInit(): void {
    this.http.getHouses().subscribe((res) => (this.houses = res));
    console.log(this.houses);
  

  /*  this.userProfile$ = this.store.select(selectorListProfile); */

   
    console.log('usserprofile',this.userProfile)
  }


redirectHA(){this.router.navigate(['dashboard/housesA'])}

  redirectHD() { this.router.navigate(['dashboard/housesD']) }

  redirectUA() {
    this.router.navigate(['dashboard/usersA']);
  }

redirectUD(){this.router.navigate(['dashboard/usersD'])}
  
 
}
