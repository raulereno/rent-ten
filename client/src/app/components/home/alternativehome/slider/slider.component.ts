import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { House } from 'src/app/models/House';
import { userProfile } from 'src/app/models/UserProfile';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() slider_priceval: House[]
  @Input() housesSorted_byqualityprice: House[]
  @Input() dbProfile: userProfile

  constructor(public http: DataServiceService, private store: Store<any>) { }
  

  // Local inneeded variables
  allHouses: House[] = []
  public userProfile: userProfile;
  userProfile$: Observable<any> = new Observable()
  // dbProfile: any = {}

  // Slider of houses sorted by quality/price
  
  page_index: number = 1
  page_size: number = 5
  page_firstslice: number = 0
  page_secondslice: number = 5


  ngOnInit(): void {
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


}
