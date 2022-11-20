import { Component, OnInit } from '@angular/core';
import { House } from '../../../models/House';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Observable } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { Store } from '@ngrx/store';
import { userProfile } from 'src/app/models/UserProfile';



@Component({
  selector: 'app-alternativehome',
  templateUrl: './alternativehome.component.html',
  styleUrls: ['./alternativehome.component.scss']
})
export class AlternativehomeComponent implements OnInit {

  // Local inneeded variables
  allHouses: House[] = []
  public userProfile: userProfile;
  userProfile$: Observable<any> = new Observable()
  dbProfile: any = {}

  // Slider of houses sorted by quality/price
  housesSorted_byqualityprice: House[]
  slider_priceval: House[] = []
  page_index: number = 1
  page_size: number = 5
  page_firstslice: number = 0
  page_secondslice: number = 5


  // Slider of houses sorted by rating
  housesSorted_byRating: House[]
  slider_rating: House[] = []
  page_index_rat: number = 1
  page_size_rat: number = 5
  page_firstslice_rat: number = 0
  page_secondslice_rat: number = 5

  constructor(public http: DataServiceService, private store: Store<any>) { }


  ngOnInit(): void {
    
    this.userProfile$ = this.store.select(selectorListProfile)

    this.http.getHouses_withOrder('byqualityprice').subscribe(res => {
      this.housesSorted_byqualityprice = res.slice(0,15)
      this.slider_priceval = this.housesSorted_byqualityprice.slice(0,5)
      console.log(this.housesSorted_byqualityprice)
    })

    this.http.getHouses_withOrder('rating').subscribe(res => {
      this.housesSorted_byRating = res.slice(0,15)
      this.slider_rating = this.housesSorted_byRating.slice(0,5)
      console.log(this.housesSorted_byRating)
      console.log(this.slider_rating)
    })

    this.userProfile$.subscribe(res => {
      this.userProfile = res
      this.dbProfile = res
    })
  }


  showInfo() {
  }

  slice_goFoward() {
    if (this.page_index == Math.ceil(this.housesSorted_byqualityprice.length / this.page_size)) { return }
    this.page_firstslice = this.page_firstslice + this.page_size
    this.page_secondslice = this.page_secondslice + this.page_size
    this.page_index = this.page_index + 1
    this.slider_priceval = this.housesSorted_byqualityprice.slice(this.page_firstslice, this.page_secondslice)
  }
  
  slice_goBack() {
    if (this.page_index == 1) { return }
    this.page_firstslice = this.page_firstslice - this.page_size
    this.page_secondslice = this.page_secondslice - this.page_size
    this.page_index = this.page_index - 1
    this.slider_priceval = this.housesSorted_byqualityprice.slice(this.page_firstslice, this.page_secondslice)
  }

  slice_rating_goFoward() {
    if (this.page_index_rat == Math.ceil(this.housesSorted_byRating.length / this.page_size_rat)) { return }
    this.page_firstslice_rat = this.page_firstslice_rat + this.page_size_rat
    this.page_secondslice_rat = this.page_secondslice_rat + this.page_size_rat
    this.page_index_rat = this.page_index_rat + 1
    this.slider_rating = this.housesSorted_byRating.slice(this.page_firstslice_rat, this.page_secondslice_rat)
  }
  
  slice_rating_goBack() {
    if (this.page_index_rat == 1) { return }
    this.page_firstslice_rat = this.page_firstslice_rat - this.page_size_rat
    this.page_secondslice_rat = this.page_secondslice_rat - this.page_size_rat
    this.page_index_rat = this.page_index_rat - 1
    this.slider_rating = this.housesSorted_byRating.slice(this.page_firstslice_rat, this.page_secondslice_rat)
  }

}
