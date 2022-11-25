import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProfile } from 'src/app/redux/actions/location.actions';
import { Observable, pipe } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { userProfile } from 'src/app/models/UserProfile';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table-user-d',
  templateUrl: './table-user-d.component.html',
  styleUrls: ['./table-user-d.component.css']
})
export class TableUserDComponent implements OnInit {

  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;
 
  
  constructor(
    private store: Store<any>,
    public http: DataServiceService,
    public auth: AuthService,
    private router: Router
    ) { }
    profileJson: any;
    
    public users: any[];
  
    
 
  
    ngOnInit(): void {
   
    this.getUsersD();
    this.userProfile$ = this.store.select(selectorListProfile);
    this.loadProfile();
    
  
  
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

  getUsersD(){
   this.http.getUsersD().subscribe(res=>this.users = res)
   console.log(this.users)
 }

 back(){this.router.navigate(['dashboard'])}

showInfo() {
  console.log(this.users)
}
}
