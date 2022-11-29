import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private _local: LocalStorageService,
  ) { }

  private darkmodeLocal: boolean = this._local.darkmode()

  private darkMode = new BehaviorSubject<boolean>(this.darkmodeLocal);

  public customDarkMode = this.darkMode.asObservable();

  public changeMode(active: boolean): void {
    this.darkMode.next(active);
  }
}
