import { ActivatedRoute } from '@angular/router';
import { selectorListHouses } from './../../../redux/selectors/selectors';
import { GlobalState } from 'src/app/models/Country.state';
import { Booking } from 'src/app/models/Booking';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { selectorPayment } from 'src/app/redux/selectors/selectors';
import { Observable } from 'rxjs';
import { House } from 'src/app/models/House';




@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private store:Store<any>,
    private route:ActivatedRoute,
    ) { }

  paymentInfo$:Observable<any> = new Observable();
  paymentInfo:Booking;

  house$:Observable<any> = new Observable();
  house:House;

  ngOnInit(): void {
    this.paymentInfo$ = this.store.select(selectorPayment);
    this.house$ = this.store.select(selectorListHouses )
    this.route.queryParams.subscribe(query=>{
      //paymentcode y houseId
      this.paymentInfo$.subscribe(payment=>{
        this.paymentInfo=payment.filter((e:Booking)=> e.paymentId === query["paymentcode"])[0];

        this.house$.subscribe(res=>{
          this.house= res.filter((e:House) => e.id === query["houseId"])[0];
        })
      })
    })
  }

}
