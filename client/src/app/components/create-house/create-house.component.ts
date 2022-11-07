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
let notNum=(string:string)=>{
  

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
  files: File[] = [];

  onSelect(event:any) {
    console.log(event.addedFiles[0].name);
    if(this.files.some(e=>e.name === event.addedFiles[0].name)){
      return
    }
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
  onSubmit(event:any){
    event.preventDefault()
    console.log(event);
    if(!this.files[0]){
      alert("Ingresa al menos una foto de portada")
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  get currentHouse(){
    console.log(this.newHouse);
    return JSON.stringify(this.newHouse)
  }
  

}
