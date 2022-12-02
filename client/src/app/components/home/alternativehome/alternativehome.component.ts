import { HelperService } from 'src/app/services/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../../models/House';
import { DataService } from 'src/app/services/data.service';
import { distinctUntilChanged, Observable, tap } from 'rxjs';
import {
  selectorListBackup,
  selectorListHouses,
  selectorListProfile,
} from 'src/app/redux/selectors/selectors';
import { Store } from '@ngrx/store';
import { userProfile } from 'src/app/models/UserProfile';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-alternativehome',
  templateUrl: './alternativehome.component.html',
  styleUrls: ['./alternativehome.component.css'],
})
export class AlternativehomeComponent implements OnInit {
  @Input() dbProfile: userProfile;

  readonly breakpoint$ = this.breakpointObserver
    .observe([
      '(min-width:1900px)',
      '(min-width:1700px)',
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small,
      '(max-width:600px)',
    ])
    .pipe(
      tap((value) => console.log(value)),
      distinctUntilChanged()
    );

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

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';

  numberOfCardsInSlide: number = 4;

  constructor(
    public http: DataService,
    private store: Store<any>,
    private helper: HelperService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.helper.customDarkMode.subscribe(
      (res: boolean) => (this.darkmode = res)
    );
    this.breakpoint$.subscribe(() => {
      this.breakpointChanged();
      console.log(this.currentBreakpoint);
    });
    this.userProfile$ = this.store.select(selectorListProfile);

    this.http.getHouses_withOrder('byqualityprice').subscribe((res) => {
      this.housesSorted_byqualityprice = res.slice(0, 15);
      this.slider_priceval = this.housesSorted_byqualityprice.slice(
        0,
        this.numberOfCardsInSlide
      );
    });

    this.http.getHouses_withOrder('rating').subscribe((res) => {
      this.housesSorted_byRating = res.slice(0, 15);
      this.slider_rating = this.housesSorted_byRating.slice(
        0,
        this.numberOfCardsInSlide
      );
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
        this.slider_housesInArea = this.housesInArea.slice(
          0,
          this.numberOfCardsInSlide
        );
      });
    });
  }
  private breakpointChanged() {
    if (this.breakpointObserver.isMatched('(min-width:1900px)')) {
      this.numberOfCardsInSlide = 6;
    } else if (this.breakpointObserver.isMatched('(min-width:1700px)')) {
      this.numberOfCardsInSlide = 5;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.numberOfCardsInSlide = 4;
      this.currentBreakpoint = Breakpoints.Large;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.numberOfCardsInSlide = 3;
      this.currentBreakpoint = Breakpoints.Medium;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.numberOfCardsInSlide = 2;
      this.currentBreakpoint = Breakpoints.Small;
    } else if (this.breakpointObserver.isMatched('(max-width: 600px)')) {
      console.log('celular');
      this.numberOfCardsInSlide = 1;
      this.currentBreakpoint = '(min-width: 500px)';
    }
  }

  showInfo() {}
}
