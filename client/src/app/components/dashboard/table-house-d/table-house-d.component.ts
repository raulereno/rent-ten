import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { loadProfile } from 'src/app/redux/actions/location.actions';
import { Observable } from 'rxjs';
import { userProfile } from 'src/app/models/UserProfile';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { House } from 'src/app/models/House';

@Component({
  selector: 'app-table-house-d',
  templateUrl: './table-house-d.component.html',
  styleUrls: ['./table-house-d.component.css'],
})
export class TableHouseDComponent implements OnInit {
  constructor(
    public http: DataService,
    private router: Router,
    private _admindashboard: AdmindashboardService,
    private store: Store<any>,
    public auth: AuthService
  ) { }

  public houses: any[];
  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;

  public filtered_house: string;
  public filtered_house_result: House | null

  public page = 1;
  public pageSize = 5;

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile);
    this.loadProfile();

    this.userProfile$ = this.store.select(selectorListProfile);
    this.loadProfile()

    this._admindashboard.setHousesD()
    this._admindashboard.getHousesD$.subscribe(res => this.houses = res)
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


  back() { this.router.navigate(['dashboard']) }


  showInfo() {
    console.log(this.houses);
  }

  changeHouseStatus(houseId: string) {
    let newValues = { deleted: false };
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
