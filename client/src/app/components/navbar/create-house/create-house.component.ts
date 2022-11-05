import { Component, OnInit } from '@angular/core';

interface NewHouse{
  city:string;
  country:string;
  rooms:number;
  bathrooms:number;
  maxpeople:number;
  allowpets:boolean;
  wifi:boolean;
  type:string;
}

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})


export class CreateHouseComponent implements OnInit {

  newHouse:NewHouse={
    city:"",
    country:"",
    rooms:0,
    bathrooms:0,
    maxpeople:0,
    allowpets:false,
    wifi:false,
    type:"",
  }
  constructor() { }

  ngOnInit(): void {
  }

  get currentHouse(){
    return JSON.stringify(this.newHouse)
  }
  onSubmit(event:Event){
    event.preventDefault()
    console.log(event);
    let value = <HTMLInputElement>event.target

    console.log(value);
  }

}
