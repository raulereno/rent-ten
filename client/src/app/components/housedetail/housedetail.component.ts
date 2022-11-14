import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { House } from '../../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Location } from '@angular/common';
@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css'],

})
export class HousedetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, public http: DataServiceService, private fb: FormBuilder, private location: Location) { }


  // booking: boolean = false
  paramsId: string | null
  house: House
  form: FormGroup
  booking: boolean = false
  pagado: boolean; 

  ngOnInit(): void {
    this.paramsId = this.route.snapshot.paramMap.get('id')
    this.paramsId && this.http.getHouse(this.paramsId).subscribe(data => this.house = data)

    this.form = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    })
  }

  unavailableDays = (calendarDate: Date): boolean => {
    if (!this.house.bookings) return true
    return !this.house.bookings.some((d: Booking) => calendarDate > new Date(d.start) && calendarDate <= new Date(new Date(d.end).getTime() + (24 * 60 * 60 * 1000)))
  }

  showInfo() {

  }

  goBack(): void {
    this.location.back()
  }


  formatDate(date:string) {
    let split = date.split("/")
    let formatDate = split[2] + "-" + split[1] + "-" + split[0] 
    return formatDate
  }

  reserveHouse(): void {
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };    
    let startDate = this.formatDate(this.form.value.daterange.start.toLocaleDateString("en-GB", options))
    let endDate = this.formatDate(this.form.value.daterange.end.toLocaleDateString("en-GB", options))
    
    console.log(startDate)

    let newReserve = {
      start: startDate,
      end: endDate,
      reservedBy: 'falta agregar userId'
    }
    console.log(newReserve)
    if (this.pagado) {this.http.makeABook(this.house.id, newReserve)}
  }

  pagar(): void {
    this.pagado = !this.pagado
  }
}