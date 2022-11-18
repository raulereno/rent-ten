import { ActivatedRoute } from '@angular/router';
import { selectorListHouses } from './../../../redux/selectors/selectors';
import { Booking } from 'src/app/models/Booking';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { selectorPayment } from 'src/app/redux/selectors/selectors';
import { Observable } from 'rxjs';
import { House } from 'src/app/models/House';
import { Location } from '@angular/common';
var mercadopago = require('./')
//No funciona bien
// declare var MercadoPago: any;
// declare global {
//   interface Window {
//     cardPaymentBrickController: any;
//     statusScreenBrickController:any;
//   }
// }

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(private store: Store<any>, private route: ActivatedRoute, private location:Location) {}

  paymentInfo$: Observable<any> = new Observable();
  paymentInfo: Booking;

  house$: Observable<any> = new Observable();
  house: House;

  payState:any;
  reload:boolean=true


  ngOnInit(): void {
    this.initMp()
    // this.loadMp();
    this.paymentInfo$ = this.store.select(selectorPayment);
    this.house$ = this.store.select(selectorListHouses);
    this.route.queryParams.subscribe((query) => {
      //paymentcode y houseId
      this.paymentInfo$.subscribe((payment) => {
        this.paymentInfo = payment.filter(
          (e: Booking) => e.paymentId === query['paymentcode']
        )[0];

        this.house$.subscribe((res) => {
          this.house = res.filter((e: House) => e.id === query['houseId'])[0];

        });
      });
    });
  }
  initMp(){

  }
  reloadPage(){
    window.location.reload()
  }
  showInfo(){
    console.log(this.payState);
    console.log(this.house);
  }
}


//No funciona bien
// loadMp() {
//   const mp = new MercadoPago('TEST-5e794334-bb92-4bf9-8833-a6e409c170ec');
//   const bricksBuilder = mp.bricks();

//   const renderCardPaymentBrick = async (bricksBuilder: any) => {
//     const settings = {
//       initialization: {
//         amount: 100, // monto a ser pago
//       },
//       callbacks: {
//         onReady: () => {
//           // callback llamado cuando Brick esté listo
//         },
//         onSubmit: (cardFormData: any) => {
//           // callback llamado cuando el usuario haga clic en el botón enviar los datos
//           console.log(cardFormData);
//           // ejemplo de envío de los datos recolectados por el Brick a su servidor
//           return new Promise<void>((resolve, reject) => {
//             fetch('http://localhost:3001/houses/process_payment', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(cardFormData),
//             })
//               .then((response) => response.json()).then(data=> {
//                 this.payState=data;
//                 this.loadStatus(data.id)
//                 resolve()
//               })
//               .catch((error) => {
//                 console.log(error);
//                 this.payState = error
//                 // tratar respuesta de error alintentar crear el pago
//                 reject();
//               });
//           });
//         },
//         onError: (error: any) => {
//           // callback llamado para todos los casos de error de Brick
//           console.log("ERROR",error);
//         },
//       },
//     };
//     window.cardPaymentBrickController = await bricksBuilder.create(
//       'cardPayment',
//       'cardPaymentBrick_container',
//       settings
//     );
//   };
//   renderCardPaymentBrick(bricksBuilder);
// }


// loadStatus(paymentId:string){
//   const mp = new MercadoPago('TEST-5e794334-bb92-4bf9-8833-a6e409c170ec');
//   const bricksBuilder = mp.bricks();
//   const renderStatusScreenBrick = async (bricksBuilder:any) => {
//   const settings = {
//           initialization: {
//               paymentId: paymentId, // valor del procesamiento a realizar
//           },
//           callbacks: {
//               onReady: () => {
//               // callback llamado cuando Brick está listo
//               },
//               onError: (error:any) => {
//               // callback llamado para todos los casos de error de Brick
//               },
//           },
//       };
//       window.statusScreenBrickController = await bricksBuilder.create('statusScreen', 'statusScreenBrick_container', settings);
//   };
//   renderStatusScreenBrick(bricksBuilder);
// }
