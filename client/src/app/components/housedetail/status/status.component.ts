import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public http: DataServiceService) { }

  paramsId: string | null = ''
  code: string | null = ''
  houseId: string | null = ''
  seconds:number = 10


  ngOnInit(): void {
    this.paramsId = this.route.snapshot.paramMap.get('id')
    this.code = this.route.snapshot.paramMap.get('code')
    this.houseId = this.route.snapshot.paramMap.get('houseId')

    if (this.houseId && this.code && this.paramsId) { this.http.updateBookingStatus(this.houseId, this.code, this.paramsId) }

    setInterval(() => {
      this.seconds !== 0 ? this.seconds-- : this.router.navigate(['home'], { relativeTo: this.route })
    }
      , 1000);
  }

  showInfo() {
    console.log(this.paramsId)
  }

}