import { HelperService } from './services/helper.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string="hola";
  
  constructor(private _helper:HelperService){}

  darkmode:boolean;

  ngOnInit(): void {
    this._helper.customDarkMode.subscribe((active:boolean )=> this.darkmode=active);
  }



}
