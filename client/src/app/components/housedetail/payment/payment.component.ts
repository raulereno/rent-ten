import { Booking } from 'src/app/models/Booking';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { selectorPayment } from 'src/app/redux/selectors/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private store:Store<any>,

    ) { }

  paymentInfo$:Observable<any> = new Observable();

  ngOnInit(): void {
    this.paymentInfo$ = this.store.select(selectorPayment)

    this.paymentInfo$.subscribe(res =>{
      console.log(res);
    })
  }

}
