import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-mp',
  templateUrl: './container-mp.component.html',
  styleUrls: ['./container-mp.component.css']
})
export class ContainerMPComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.reload()
  }

}
