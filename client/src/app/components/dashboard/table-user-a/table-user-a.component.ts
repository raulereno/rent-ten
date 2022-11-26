import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeAuthorizedUser, loadProfile } from 'src/app/redux/actions/location.actions';
import { Observable, pipe } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { userProfile } from 'src/app/models/UserProfile';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';


@Component({
  selector: 'app-table-user-a',
  templateUrl: './table-user-a.component.html',
  styleUrls: ['./table-user-a.component.css']
})
export class TableUserAComponent implements OnInit {

  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;


  constructor(
    private store: Store<any>,
    public http: DataServiceService,
    public auth: AuthService,
    private router: Router,
    private _admindashboard: AdmindashboardService,

  ) { }
  profileJson: any;

  public users: any[];

  id: string;

  customChangeAutorized: string


  ngOnInit(): void {


    this.userProfile$ = this.store.select(selectorListProfile);
    this.desactiveAccount(this.id);

    this._admindashboard.customChangeAutorized.subscribe((res: string) => {
      this.customChangeAutorized = res
      if (this.customChangeAutorized === "all") {
        console.log("click tabla A")
        this.getUsers()
        this.loadProfile();
      }
    })

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

  getUsers() {
    this.http.getUsers().subscribe(res => this.users = res)
  }

  back() { this.router.navigate(['dashboard']) }

  showInfo() {
    console.log(this.users)
  }

  desactiveAccount(id: string) {
    this.id = id
    this.store.dispatch(changeAuthorizedUser({ payload: 'not' }));
    this.http.deleteAccount(this.id, 'not')
    this._admindashboard.changeModeAutorized("not")
    this.getUsers()
  }

}