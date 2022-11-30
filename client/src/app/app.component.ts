import { OverlayContainer } from '@angular/cdk/overlay';
import { HelperService } from './services/helper.service';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'hola';

  constructor(
    private _helper: HelperService,
    private _overlay:OverlayContainer
  ) {}

  private isDarkmode: boolean = false;

  ngOnInit(): void {

    this._helper.customDarkMode.subscribe(
      (active: boolean) => (this.isDarkmode = active)
    );
  }

  @HostBinding('class')
  get themeMode(): string {
    return this.isDarkmode ? 'theme-dark' : 'theme-light';
  }
}
