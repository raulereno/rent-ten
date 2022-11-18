import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,) { }

  paramsId: string | null = ''

  ngOnInit(): void {
    this.paramsId = this.route.snapshot.paramMap.get('id')
    setTimeout(() => {
      this.router.navigate(['home'], { relativeTo: this.route });
    }, 2000);
  }

  showInfo() {
    console.log(this.paramsId)
  }

}
