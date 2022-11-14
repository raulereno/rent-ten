import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  private darkMode = new BehaviorSubject<boolean>(false);

  public customDarkMode = this.darkMode.asObservable();

  public changeMode(active: boolean): void {
    this.darkMode.next(active);
  }
}
