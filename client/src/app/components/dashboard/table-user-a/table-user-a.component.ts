import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProfile } from 'src/app/redux/actions/location.actions';
import { Observable, pipe } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { userProfile } from 'src/app/models/UserProfile';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '@auth0/auth0-angular';

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
    public http: DataService,
    public auth: AuthService,
    ) { }

  profileJson: any;
  ngOnInit(): void {


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

}
