import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userProfile } from 'src/app/models/UserProfile';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';
import { Store } from '@ngrx/store';

import { DataService } from 'src/app/services/data.service';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { AuthService } from '@auth0/auth0-angular';
import { loadProfile } from 'src/app/redux/actions/location.actions';
import { House } from 'src/app/models/House';

@Component({
  selector: 'app-table-house-a',
  templateUrl: './table-house-a.component.html',
  styleUrls: ['./table-house-a.component.css'],
})
export class TableHouseAComponent implements OnInit {
  constructor(
    public http: DataService,
    private router: Router,
    private _admindashboard: AdmindashboardService,
    private store: Store<any>,
    public auth: AuthService
  ) {}
  headers = ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Salary'];
  public houses: any[];
  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;

  public filtered_house: any;
  public filtered_house_result: any;

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile);
    this.loadProfile();

    this._admindashboard.setHousesA();
    this._admindashboard.getHousesA$.subscribe((res) => (this.houses = res));
  }

  loadProfile(): void {
    this.auth.user$.subscribe((profile: any) => {
      this.http.getUser(profile.email).subscribe((res) => {
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
    console.log(this.houses);
  }

  changeHouseStatus(houseId: string) {
    let newValues = { deleted: true };
    this._admindashboard.changeHouseStatus(
      this.userProfile.id,
      houseId,
      newValues
    );
    this.resetResults();
  }

  handleInput() {
    this.filtered_house_result = this.houses.find(
      (h: House) => h.id === this.filtered_house.trimRight()
    );
    if (!this.filtered_house_result) {
      alert('No house with that ID');
    }
  }

  resetResults() {
    this.filtered_house_result = null;
    this.filtered_house = '';
  }
}
