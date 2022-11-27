import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-table-house-d',
  templateUrl: './table-house-d.component.html',
  styleUrls: ['./table-house-d.component.css']
})


export class TableHouseDComponent implements OnInit {


  constructor(public http: DataServiceService, private router: Router) { }

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