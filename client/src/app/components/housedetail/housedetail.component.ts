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
  styleUrls: ['./housedetail.component.css']
})
export class HousedetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, public http: DataServiceService, private fb: FormBuilder, private location: Location, ) {}

  paramsId: string | null
  house: House
  form: FormGroup


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

  unavailableDays = (calendarDate: Date):boolean => {
    console.log(calendarDate)
    if (!this.house.bookings) return true
    return !this.house.bookings.some((d:Booking) => calendarDate > new Date(d.start) && calendarDate <= new Date(new Date(d.end).getTime() + (24 * 60 * 60 * 1000)))
}

  goBack(): void {
    this.location.back()
  }

}




// router.get('/:id', async (req, res) => {
//   const { id } = req.params

//   try {
//       const house = await House.findByPk(id, { include: User })
//       res.status(200).json(house)
//   } catch (error) {
//       console.log(error)
//   }

// })