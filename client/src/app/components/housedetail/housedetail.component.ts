import { HelperService } from './../../services/helper.service';
import { loadPayment } from './../../redux/actions/location.actions';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { House } from '../../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { userProfile } from 'src/app/models/UserProfile';
import GalleryModule from 'ng-gallery';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css'],
})
export class HousedetailComponent implements OnInit {

  @ViewChild("pay",{static:true}) pay:ElementRef;

  constructor(private route: ActivatedRoute,
    public http: DataServiceService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private _helper: HelperService,
    public auth: AuthService,
    private modalService: NgbModal
    ) { }


  userProfile: userProfile
  profileJson: any
  paramsId: string 
  house: House
  form: FormGroup
  booking: boolean = false
  indexPhoto: number = 0
  paymentstatus: string;
  darkmode: boolean;
  totalprice: number;
  totaldays: number;

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.paramsId= params["id"];
      this.http
        .getHouse(this.paramsId)
        .subscribe((data) => (this.house = data));
    });

    this.auth.user$.subscribe((res) => {
      this.profileJson = res
      this.http.getUser(this.profileJson.email).subscribe((res) => this.userProfile = res)
    })

    this.form = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    });

    this._helper.customDarkMode.subscribe(
      (active: boolean) => (this.darkmode = active)
    );
  }

  unavailableDays = (calendarDate: Date): boolean => {
    if (!this.house.Bookings) return true;
    return !this.house.Bookings.some(
      (d: Booking) =>
        calendarDate > new Date(d.start) &&
        calendarDate <=
        new Date(new Date(d.end).getTime() + 24 * 60 * 60 * 1000)
    );
  };

  goBack(): void {
    this.location.back();
  }

  giveMePhoto() {
    return this.house.picture[this.indexPhoto];
  }

  formatDate(date: string) {
    let split = date.split("/")
    let formatDate = split[2] + "-" + split[1] + "-" + split[0]
    return formatDate
  }

  checkItsOccuped(start: Date, end: Date) {
    console.log(this.house.Bookings)
    return this.house.Bookings.some(
      (d: Booking) =>
        start < new Date(d.start) &&
        end >
        new Date(new Date(d.end).getTime() + 24 * 60 * 60 * 1000)
    )
  }

  reserveHouse(): void {

    let start = this.form.value.daterange.start
    let end = this.form.value.daterange.end


    if (!start || !end) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select both dates'
      })
    }
    // if (!start || !end) { alert("Please select both dates"); return }
    if (this.checkItsOccuped(start, end)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This place has bookings between your selected dates. Please make two bookings or change your dates'
      })
      // alert('This place has bookings between your selected dates. Please make two bookings or change your dates'); return

    } else {
      let transactionCode = Math.random().toString(36).slice(4)
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

      const newReserve = {
        start: this.formatDate(start.toLocaleDateString("en-GB", options)),
        end: this.formatDate(end.toLocaleDateString("en-GB", options)),
        reservedBy: this.userProfile.id,
        code: transactionCode
      }

      this.openPayModal(this.pay)
      this.http.makeABook(this.house.id, newReserve, this.userProfile.id)
      this.getPreferenceId(transactionCode)
    }

  }

  // getPaymentLink(transactionCode: string) {

  //   const item = {
  //     title: `Booking for house with ID ${this.house.id}`,
  //     price: this.house.price,
  //     quantity: 1,
  //     email: this.userProfile.mail,
  //     userId: this.userProfile.id,
  //     houseId: this.house.id,
  //     code: transactionCode
  //   }

  //   this.http.getPaymentLink(item).subscribe(res => 
  //     window.open(`${res.init_point}`, '_blank'))

  // }

  getPreferenceId(transactionCode: string) {

    let start = this.form.value.daterange.start
    let end = this.form.value.daterange.end
    let Difference_In_Time = end.getTime() - start.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.totaldays = Difference_In_Days
    this.totalprice = (Difference_In_Days + 1) * this.house.price

    const item = {
      title: `Booking for house with ID ${this.house.id}`,
      price: this.totalprice,
      quantity: 1,
      email: this.userProfile.mail,
      userId: this.userProfile.id,
      houseId: this.house.id,
      code: transactionCode
    }

    this.http.getPaymentLink(item).subscribe(res => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', res.id);
      const form = document.getElementById('payment-form');
      form?.appendChild(script);
      this.paymentstatus = 'ready'
    }
    )

  }

  openPayModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  formatDate_payment(date: any) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString("en-GB", options)
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
