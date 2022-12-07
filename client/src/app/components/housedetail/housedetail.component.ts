import { HelperService } from './../../services/helper.service';
import { addFavoriteHouse, deleteFavoriteHouse, loadPayment, loadProfile } from './../../redux/actions/location.actions';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { House } from '../../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { userProfile } from 'src/app/models/UserProfile';
import GalleryModule from 'ng-gallery';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Observable } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css'],
})
export class HousedetailComponent implements OnInit {
  @ViewChild('pay', { static: true }) pay: ElementRef;
  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;
  
  constructor(
    private route: ActivatedRoute,
    public http: DataService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private store: Store<any>,
    private _helper: HelperService,
    public auth: AuthService,
    private modalService: NgbModal,
    private localStorageSvc: LocalStorageService,
  ) {}

  // userProfile: userProfile;
  profileJson: any;
  paramsId: string;
  house: House;
  form: FormGroup;
  booking: boolean = false;
  indexPhoto: number = 0;
  paymentstatus: string;
  darkmode: boolean;
  totalprice: number;
  totaldays: number;

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile);
    this.userProfile$.subscribe((res) => this.userProfile = res)
    
    this.route.params.subscribe((params) => {
      this.paramsId = params['id'];
      this.http
        .getHouse(this.paramsId)
        .subscribe((data) => (this.house = data));
    });

    // this.auth.user$.subscribe((res) => {
    //   this.profileJson = res;
    //   this.http
    //     .getUser(this.profileJson.email)
    //     .subscribe((res) => {
    //       this.userProfile = res

    //     });
    // });


    this.auth.user$.subscribe((profile) => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe((res) => {
        this.store.dispatch(loadProfile({ userProfile: res }));
        this.userProfile$.subscribe((res) => {
          this.userProfile = res;
        });
      });
    });

    
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
    let today = new Date();
    if (today > calendarDate || calendarDate > new Date('12-31-2024')) {
      return false;
    }
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
    let split = date.split('/');
    let formatDate = split[2] + '-' + split[1] + '-' + split[0];
    return formatDate;
  }

  checkItsOccuped(start: Date, end: Date) {
    return this.house.Bookings.some(
      (d: Booking) =>
        start < new Date(d.start) &&
        end > new Date(new Date(d.end).getTime() + 24 * 60 * 60 * 1000)
    );
  }

  reserveHouse(): void {
    if (this.house.Users![0].id == this.userProfile.id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'You cant reserve your own place',
      });
      return;
    }

    let start = this.form.value.daterange.start;
    let end = this.form.value.daterange.end;

    if (!start || !end) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select both dates',
      });
    }
    // if (!start || !end) { alert("Please select both dates"); return }
    if (this.checkItsOccuped(start, end)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This place has bookings between your selected dates. Please make two bookings or change your dates',
      });
    } else {
      let transactionCode = Math.random().toString(36).slice(4);
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

      const newReserve = {
        start: this.formatDate(start.toLocaleDateString('en-GB', options)),
        end: this.formatDate(end.toLocaleDateString('en-GB', options)),
        reservedBy: this.userProfile.id,
        code: transactionCode,
      };

      this.openPayModal(this.pay);
      this.http.makeABook(this.house.id, newReserve, this.userProfile.id);
      this.getPreferenceId(transactionCode);
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
    let start = this.form.value.daterange.start;
    let end = this.form.value.daterange.end;
    let Difference_In_Time = end.getTime() - start.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.totaldays = Difference_In_Days;
    this.totalprice = (Difference_In_Days + 1) * this.house.price;

    const item = {
      title: `Booking for house with ID ${this.house.id}`,
      price: this.totalprice,
      quantity: 1,
      email: this.userProfile.mail,
      userId: this.userProfile.id,
      houseId: this.house.id,
      code: transactionCode,
    };

    this.http.getPaymentLink(item).subscribe((res) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', res.id);
      const form = document.getElementById('payment-form');
      form?.appendChild(script);
      this.paymentstatus = 'ready';
    });
  }

  openPayModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  formatDate_payment(date: any) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options);
  }

  toggleFavorite(houseId: string): void {
    let favoritesLS = this.localStorageSvc.getFavoritesHouses()
    if (!favoritesLS.includes(houseId)) {
    this.localStorageSvc.addToFavorite(houseId)
    this.userProfile.favoriteshouses?.concat(houseId)
  }
  }
  
  setFavorite(houseId: string, userId: string): void {
    if (!userId) {
      this.toggleFavorite(houseId)
    } else {
      this.http.setFavorite(houseId, userId)
      this.store.dispatch(addFavoriteHouse({ payload: houseId }))
    }
  }

  deleteFavorite(houseId: string, userId: string): void {

    this.http.deleteFavorite(houseId, userId)
    this.store.dispatch(deleteFavoriteHouse({ payload: houseId }))
    this.localStorageSvc.removeFavorite(houseId)

  }
  
  checkIsFavorite(houseId: string) {
    let favoritesLS = this.localStorageSvc.getFavoritesHouses()
    // let fh = this.dbProfile.favoriteshouses
    if (this.userProfile?.id) {
      return this.userProfile.favoriteshouses!.some((h: any) => h == houseId)
    } else if (favoritesLS?.length > 0) {
      return favoritesLS.some((h: string) => h == houseId)
    } else {
      return false
    }
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
