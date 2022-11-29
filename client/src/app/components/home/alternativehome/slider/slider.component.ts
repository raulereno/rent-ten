import { animation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';
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


  @Input() array: House[]
  @Input() dbProfile: userProfile
  @Input() slider_sliced: House[]

  prueba: Observable<House[]>

  constructor(public http: DataServiceService, private store: Store<any>) { 
  }


  // Local inneeded variables
  allHouses: House[] = []
  public userProfile: userProfile;
  userProfile$: Observable<any> = new Observable()
  animate: boolean = true
  animationside: string = 'foward'


  // Slider of houses sorted by quality/price

  page_index: number = 1
  page_size: number = 1
  page_firstslice: number = 0
  page_secondslice: number = 5


  ngOnInit(): void {

    this.animation()

  }


  animation() {
    setTimeout(() => {
      const animate = () => {
        if (this.animate && this.array) { this.page_index < this.array.length && this.animationside == 'foward' ? this.slice_goFoward() : this.slice_goBack() }
      }
      setInterval(animate, 5500);
    }, Math.floor(Math.random() * (2000 - 800) + 800));
  }

  slice_goFoward() {
    if (this.page_index + 4 == this.array.length || this.page_index + 4 >= this.array.length) { this.animationside = 'back'; return }
    this.page_firstslice = this.page_firstslice + this.page_size
    this.page_secondslice = this.page_secondslice + this.page_size
    this.page_index = this.page_index + 1
    this.slider_sliced = this.array.slice(this.page_firstslice, this.page_secondslice)
  }

  slice_goBack() {
    if (this.page_index == 1) {this.animationside = 'foward'; return }
    this.page_firstslice = this.page_firstslice - this.page_size
    this.page_secondslice = this.page_secondslice - this.page_size
    this.page_index = this.page_index - 1
    this.slider_sliced = this.array.slice(this.page_firstslice, this.page_secondslice)
  }

  enableArrow(arrow: string) {
    if (arrow === 'foward') { return this.page_index + 4 >= this.array.length }
    if (arrow === 'back') { return this.page_index == 1 }

    return true
  }

  onMouseEnter() {
    this.animate = false
  }

  onMouseOut() {
    this.animate = true
  }

}
