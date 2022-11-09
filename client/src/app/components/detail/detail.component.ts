import { Component, OnInit,Input } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _dataService: DataServiceService,
    private location:Location
    ) { }

  ngOnInit(): void {
    this.getHouse()

  }

  getHouse():void{
    const id = this._route.snapshot.paramMap.get('id')
    if(id){
      this._dataService.getHouse(id).subscribe(house =>this.house=house)
    }
    console.log(this.house)
  }

  @Input() house?:any;

  showInfo():void{
    console.log(this.house);
  }
}
