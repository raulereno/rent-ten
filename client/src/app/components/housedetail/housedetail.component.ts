import { loadPayment } from './../../redux/actions/location.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { House } from '../../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { userProfile } from 'src/app/models/UserProfile';
import GalleryModule from 'ng-gallery';

const generateRandomString = () => {
  let result = Math.random().toString(36).substring(0, 12);

  return result;
};

@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css'],
})
export class HousedetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public http: DataServiceService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    public auth: AuthService,
    private _store: Store<any>
  ) {}

  userProfile: userProfile;
  profileJson: any;
  paramsId: string | null;
  house: House;
  form: FormGroup;
  booking: boolean = false;
  // pagado: boolean;

  indexPhoto: number = 0;

  ngOnInit(): void {
    this.paramsId = this.route.snapshot.paramMap.get('id');
    this.paramsId &&
      this.http
        .getHouse(this.paramsId)
        .subscribe((data) => (this.house = data));

    this.auth.user$.subscribe((res) => {
      this.profileJson = res;
      this.http
        .getUser(this.profileJson.email)
        .subscribe((res) => (this.userProfile = res));
    });

    this.form = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    });
  }

  unavailableDays = (calendarDate: Date): boolean => {
    if (!this.house.bookings) return true;
    return !this.house.bookings.some(
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
    let split = date.split('/');
    let formatDate = split[2] + '-' + split[1] + '-' + split[0];
    return formatDate;
  }

  reserveHouse(): void {
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let startDate = this.formatDate(
      this.form.value.daterange.start.toLocaleDateString('en-GB', options)
    );
    let endDate = this.formatDate(
      this.form.value.daterange.end.toLocaleDateString('en-GB', options)
    );
    let newReserve = {
      start: startDate,
      end: endDate,
      reservedBy: this.userProfile.id,
    };

    // if (this.pagado) {
    // } las tres lineas siguientes iban en este condicional
    this.http.makeABook(this.house.id, newReserve);
    this.house.bookings = [...this.house.bookings, newReserve];
    alert('We sent you a email with the specifications of your reservation');

    let paymentCode = generateRandomString(); //
    this._store.dispatch(
      loadPayment({
        payload: {
          paymentId: paymentCode,
          userId: this.userProfile.id,
          start: startDate,
          end: endDate,
          totalPay: this.house.price,
          houseId: this.house.id,
        },
      })
    );
    //?paymentcode=${paymentCode}&houseId=${this.house.id}`

    this.router.navigate(['/place/payment'], {
      queryParams: { paymentcode: paymentCode, houseId: this.house.id },
    });

    // this.router.navigate(

    //   ["/place/payment"],
    //   {queryParams:
    //     {paymentcode:paymentCode,houseId:this.house.id}
    // })
  }

  // pagar(): void {
  //   this.pagado = !this.pagado;
  // }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
