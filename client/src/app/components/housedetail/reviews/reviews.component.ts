import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userProfile } from 'src/app/models/UserProfile';
import { AuthService } from '@auth0/auth0-angular';
import { Booking } from 'src/app/models/Booking';
import { Observable } from 'rxjs';
import { House } from 'src/app/models/House';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  userProfile$: Observable<any> = new Observable();
  userProfile: userProfile;
  
  profileJson: any

  paramsId: string | null
  house: any
  opinion: string
  rating: number
  errors: string;
  ableToPostReview: boolean = false

  newReviewInput: string = ''
  newRatingInput: number

  constructor(public http: DataServiceService, private store: Store<any>, private route: ActivatedRoute, private modalService: NgbModal, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {

      this.userProfile$ = this.store.select(selectorListProfile)
      this.userProfile$.subscribe(profile => {
        this.userProfile = profile;
      });

      this.paramsId = this.route.snapshot.paramMap.get('id')
      this.paramsId && this.http.getHouse(this.paramsId).subscribe(
        data => {
          this.house = data;
          this.ableToPostReview = this.house.Bookings.some((booking: Booking) => booking.UserId === this.userProfile.id)
        }
      )

  }

  showInfo() {

  }

  returnDate(date: string) {
    return new Date(date).toString().split('GMT', 1)
  }

  handleOpinion(event: any) {
    this.opinion = event.target.value
  }

  handleRating(event: any) {
    this.rating = event.target.value
    this.ngOnInit()
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  openLetReviewModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  userWasOnPlace() {

    if (this.house.Bookings.find((booking: Booking) => booking.UserId === this.userProfile.id)) {
      this.ableToPostReview = true
    }

  }

  getRating(e: number) {
    this.newRatingInput = e
  }

  setReview(e: any) {
    this.newReviewInput = e.target.value
  }

  postNewReview() {
    this.errors = ''
    if (!this.userProfile.id) { this.errors = 'Login before let a review for this house!'; return }
    if (this.newReviewInput.length < 10) { this.errors = 'Review must have more than 10 characters.'; return }
    if (!this.newRatingInput) { this.errors = 'Please select a valoration.'; return }
    this.http.postNewReview(this.newReviewInput, this.newRatingInput, this.userProfile.id, this.house.id, this.userProfile.mail)
      .subscribe((res) => { this.house.Reviews = [...this.house.Reviews, res] })
    document.getElementById('closeModalButton')!.click();
    alert('Thank you for your time!')

  }

}
