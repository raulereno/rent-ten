import { Component, OnInit, Input} from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Review } from 'src/app/models/Review';
import { House } from 'src/app/models/House';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectorListBackup } from 'src/app/redux/selectors/selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  paramsId: string | null
  house: any
  writingReview: boolean = false
  opinion: string
  rating: number

  constructor(public http: DataServiceService,  private store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsId = this.route.snapshot.paramMap.get('id')
    this.paramsId && this.http.getHouse(this.paramsId).subscribe(
      data => this.house = data
      )
  }

  showInfo() {
  }

  returnDate(date:string) {
    return new Date(date).toString().split('GMT', 1)
  }

  writeReview () {
    this.writingReview = !this.writingReview
  }
  handleOpinion(event: any){
    this.opinion = event.target.value
  }

  handleRating(event: any) {
    this.rating = event.target.value
    this.ngOnInit()

  }
}

