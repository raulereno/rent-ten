import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Country, City } from '../models/location.model'
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class LocationService {

    constructor(private _http:HttpClient){}

    getCountries():Observable<any>{
      const data = this._http.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      return data
    }
    getState(country:string):Observable<any>{
      return this._http.post("https://countriesnow.space/api/v0.1/countries/states",{country:country})
    }

    getCities(country:string,state:string):Observable<any>{
      return this._http.post("https://countriesnow.space/api/v0.1/countries/state/cities",{country:country,state:state})
    }

 }
