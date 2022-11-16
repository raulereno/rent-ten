import { HelperService } from './../../services/helper.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectorListHouses, selectorListProfile } from 'src/app/redux/selectors/selectors';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DataServiceService } from '../../services/data-service.service'

import { House } from '../../models/House';
import { LocalStorageService } from 'src/app/services/local-storage.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DataServiceService]
})
export class NavbarComponent implements OnInit {

//-------------DIANA


//---------------


  constructor(
    public auth: AuthService,
    public http: DataServiceService,
    private _store:Store<any>,
    @Inject(DOCUMENT) private doc: Document,
    private _helper:HelperService,
    
    private localStorageSvc:LocalStorageService
    ) { }

  profileJson: any;
  dbProfile: any = {}
  isLogged: boolean;
  userProfile: any;

  allHouses: House[] = [];
  favoritesHouses: House[] = [];
  allHouses$:Observable <any>=new Observable()



  userProfile$: Observable<any> = new Observable()

  darkmode:boolean;

  ngOnInit(): void {
    this.auth.user$.subscribe(res=>{
      const mail = res?.email
      if(mail !== undefined){
        this.http.getUser(mail).subscribe(res=>{
          this.userProfile=res
        })
      }})

     

        this.allHouses$ = this._store.select(selectorListHouses)
        
         this.allHouses$.subscribe(res=>{
         let favorites =this.localStorageSvc.getFavoritesHouses()
         
         console.log(1) 
         this.favoritesHouses = res.filter((house: House) => favorites.some((h: string) => h == house.id))
         console.log('redux',this.favoritesHouses)}) 
          
          
    ;
    //TODO: RAUL -DANGER aca se produce un bucle de llamadas- arreglando
    this.userProfile$ = this._store.select(selectorListProfile);
    this.userProfile$.subscribe(res=>{
      this.userProfile=res
    });

    this._helper.customDarkMode.subscribe((active:boolean)=> this.darkmode= active)

  }
  validateUser():void{
    if(confirm('You need login for post your place')){
      if(!this.userProfile.id){
        this.auth.loginWithRedirect()
      }
    }

  }


  darkMode() : void{
     this.darkmode = !this.darkmode;
     //this._helper.changeMode(this.darkmode)
  }


  loginWithRedirect = async ():Promise<void> => {
    this.auth.loginWithRedirect({authorizationParams: {redirect_uri: window.location.origin}})
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin })
  }

  showInfo(): void {
  }

  //------------------diana---------------------
  favorites: string[]

  getFavoriteLS():void{
    this.favorites=this.localStorageSvc.getFavoritesHouses()
    console.log('localstorage',this.favorites)
  }


}
