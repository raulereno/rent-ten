import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  changeAuthorizedUser,
  loadProfile,
} from 'src/app/redux/actions/location.actions';
import { Observable, pipe, subscribeOn } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { userProfile } from 'src/app/models/UserProfile';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';

@Component({
  selector: 'app-table-user-a',
  templateUrl: './table-user-a.component.html',
  styleUrls: ['./table-user-a.component.css'],
})
export class TableUserAComponent implements OnInit {
  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;

  constructor(
    private store: Store<any>,
    public http: DataService,
    public auth: AuthService,
    private router: Router,
    private _admindashboard: AdmindashboardService
  ) {}
  profileJson: any;

  public users: any[];

  id: string;

  customChangeAutorized: string;

  public page: number = 1;
  public pageSize: number = 5;

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile);
    this.loadProfile();

    this._admindashboard.setUsersA();
    this._admindashboard.getUsersA$.subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
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
    });
  }

  back() {
    this.router.navigate(['dashboard']);
  }

  showInfo() {
    console.log(this.users);
  }

  desactiveAccount(id: string) {
    this._admindashboard.delete_set(id, 'not');
  }
}
