import { HelperService } from 'src/app/services/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../../models/House';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import {
  selectorListBackup,
  selectorListHouses,
  selectorListProfile,
} from 'src/app/redux/selectors/selectors';
import { Store } from '@ngrx/store';
import { userProfile } from 'src/app/models/UserProfile';

@Component({
  selector: 'app-alternativehome',
  templateUrl: './alternativehome.component.html',
  styleUrls: ['./alternativehome.component.css'],
})
export class AlternativehomeComponent implements OnInit {
  @Input() dbProfile: userProfile;

  // Local inneeded variables
  allHouses: House[] = [];
  public userProfile: userProfile;
  backupHouses$ = this.store.select(selectorListBackup);
  userProfile$: Observable<any> = new Observable();
  geoloc_value: string;

  // Slider of houses sorted by quality/price
  housesSorted_byqualityprice: House[];
  slider_priceval: House[] = [];

  // Slider of houses sorted by rating
  housesSorted_byRating: House[];
  slider_rating: House[] = [];
  darkmode: boolean;

  housesInArea: House[];
  slider_housesInArea: House[] = [];



  constructor(public http: DataService, private store: Store<any>, private helper: HelperService) { }


  ngOnInit(): void {
    this.helper.customDarkMode.subscribe(
      (res: boolean) => (this.darkmode = res)
    );
    this.userProfile$ = this.store.select(selectorListProfile);

    this.http.getHouses_withOrder('byqualityprice').subscribe((res) => {
      this.housesSorted_byqualityprice = res.slice(0, 15);
      this.slider_priceval = this.housesSorted_byqualityprice.slice(0, 4);
    });

    this.http.getHouses_withOrder('rating').subscribe((res) => {
      this.housesSorted_byRating = res.slice(0, 15);
      this.slider_rating = this.housesSorted_byRating.slice(0, 4);
    });

    this.userProfile$.subscribe((res) => {
      this.userProfile = res;
      this.dbProfile = res;
    });

    this.http.getHouses().subscribe((res) => {
      this.http.fetchGeoLoc().subscribe((geo) => {
        let geolocation = geo.location.country.name;
        this.geoloc_value = geolocation;
        this.housesInArea = res
          .filter(
            (house: House) =>
              house.country.toLowerCase() == geolocation.toLowerCase()
          )
          .slice(0, 15);
        this.slider_housesInArea = this.housesInArea.slice(0, 4);
      });
    });
  }

  showInfo() {

  }

}
