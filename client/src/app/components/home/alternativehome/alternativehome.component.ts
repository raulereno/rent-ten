import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../../models/House';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { Store } from '@ngrx/store';
import { userProfile } from 'src/app/models/UserProfile';



@Component({
  selector: 'app-alternativehome',
  templateUrl: './alternativehome.component.html',
  styleUrls: ['./alternativehome.component.css']
})


export class AlternativehomeComponent implements OnInit {


  @Input() dbProfile: userProfile

  // Local inneeded variables
  allHouses: House[] = []
  public userProfile: userProfile;
  userProfile$: Observable<any> = new Observable()

  // Slider of houses sorted by quality/price
  housesSorted_byqualityprice: House[]
  slider_priceval: House[] = []

  // Slider of houses sorted by rating
  housesSorted_byRating: House[]
  slider_rating: House[] = []


  constructor(public http: DataService, private store: Store<any>) { }


  ngOnInit(): void {

    this.userProfile$ = this.store.select(selectorListProfile)

    this.http.getHouses_withOrder('byqualityprice').subscribe(res => {
      this.housesSorted_byqualityprice = res.slice(0,15)
      this.slider_priceval = this.housesSorted_byqualityprice.slice(0,5)
    })

    this.http.getHouses_withOrder('rating').subscribe(res => {
      this.housesSorted_byRating = res.slice(0,15)
      this.slider_rating = this.housesSorted_byRating.slice(0,5)
    })

    this.userProfile$.subscribe(res => {
      this.userProfile = res
      this.dbProfile = res
    })
  }


  showInfo() {
  }

}
