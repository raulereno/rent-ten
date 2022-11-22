import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CREATORS, About } from '../../models/about.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  creators: About[] = CREATORS;
  info = [];
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
