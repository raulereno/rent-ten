import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { DataServiceService } from 'src/app/services/data-service.service';
import { userProfile } from 'src/app/models/UserProfile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public userProfile: userProfile;

  
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

  constructor(private breakpointObserver: BreakpointObserver,public http: DataServiceService,  private router: Router,) {}
  
  
  public users: [];

redirectHA(){this.router.navigate(['dashboard/housesA'])}

redirectHD(){this.router.navigate(['dashboard/housesD'])}

redirectUA(){this.router.navigate(['dashboard/usersA'])}

redirectUD(){this.router.navigate(['dashboard/usersD'])}
  
  /* getUsers(){
    this.http.getUsers().subscribe(res=>this.users = res)
     console.log(this.users)
  } */
}
