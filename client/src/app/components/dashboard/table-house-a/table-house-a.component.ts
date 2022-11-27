import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-table-house-a',
  templateUrl: './table-house-a.component.html',
  styleUrls: ['./table-house-a.component.css']
})
export class TableHouseAComponent implements OnInit {


  constructor(public http: DataServiceService, private router: Router,) { }
  headers = ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Salary'];
  public houses: any[];

  ngOnInit(): void {

    this.getHouses();

  }

  getHouses() {
    this.http.getHouses().subscribe(res => this.houses = res)
    console.log(this.houses)
  }

  back() { this.router.navigate(['dashboard']) }

  showInfo() {
    console.log(this.houses)
  }


}
