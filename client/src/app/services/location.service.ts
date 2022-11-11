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


    // private countries: Country[] = [
    //     {
    //         id: 1,
    //         name: 'Brazil'
    //     },
    //     {
    //         id: 2,
    //         name: 'Argentina'
    //     },
    //     {
    //         id: 3,
    //         name: 'Colombia'
    //     }
    // ];

    // private cities: City[] = [
    //     {
    //         id: 1,
    //         countryId: 1,
    //         name: 'Rio de Janeiro'
    //     },
    //     {
    //         id: 2,
    //         countryId: 1,
    //         name: 'Sao Pablo'
    //     },
    //     {
    //         id: 3,
    //         countryId: 1,
    //         name: 'Brasilia'
    //     },
    //     {
    //         id: 4,
    //         countryId: 2,
    //         name: 'Buenos Aires'
    //     },
    //     {
    //         id: 5,
    //         countryId: 2,
    //         name: 'Mendoza'
    //     },
    //     {
    //         id: 6,
    //         countryId: 2,
    //         name: 'Mar del Plata'
    //     },
    //     {
    //         id: 7,
    //         countryId: 3,
    //         name: 'Medellin'
    //     },
    //     {
    //         id: 8,
    //         countryId: 3,
    //         name: 'Bogota'
    //     },
    //     {
    //         id: 9,
    //         countryId: 3,
    //         name: 'Cartagena'
    //     }
    // ];

//     getCountries(): Observable<Country[]> {
//         const countries = of(this.countries)
//         return countries;
//     }

//     // getCities(): Observable<City[]> {
//     //     const cities = of(this.cities)
//     //     return cities;
//     // }

//     getCities(): City[] {
//         return this.cities;
//     }


 }
