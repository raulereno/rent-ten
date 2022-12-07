import { HelperService } from 'src/app/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { CREATORS, About } from '../../models/about.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  creators: About[] = CREATORS;
  info = [];
  darkmode: boolean = false;

  constructor(public auth: AuthService, private _helper: HelperService) {}

  ngOnInit(): void {
    this._helper.customDarkMode.subscribe(
      (active: boolean) => (this.darkmode = active)
    );
  }
}
