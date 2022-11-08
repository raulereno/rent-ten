import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Country, City } from '../models/model.interface'

@Injectable({
    providedIn: 'root'
})

export class Data {

    private countries: Country[] = [
        {
            id: 1,
            name: 'Brazil'
        },
        {
            id: 2,
            name: 'Argentina'
        },
        {
            id: 3,
            name: 'Colombia'
        }
    ];

    private cities: City[] = [
        {
            id: 1,
            countryId: 1,
            name: 'Rio de Janeiro'
        },
        {
            id: 2,
            countryId: 1,
            name: 'Sao Pablo'
        },
        {
            id: 3,
            countryId: 1,
            name: 'Brasilia'
        },
        {
            id: 4,
            countryId: 2,
            name: 'Buenos Aires'
        },
        {
            id: 5,
            countryId: 2,
            name: 'Mendoza'
        },
        {
            id: 6,
            countryId: 2,
            name: 'Mar del Plata'
        },
        {
            id: 7,
            countryId: 3,
            name: 'Medellin'
        },
        {
            id: 8,
            countryId: 3,
            name: 'Bogota'
        },
        {
            id: 9,
            countryId: 3,
            name: 'Cartagena'
        }
    ];

    getCountries(): Observable<Country[]> {
        const countries = of(this.countries)
        return countries;
    }

    // getCities(): Observable<City[]> {
    //     const cities = of(this.cities)
    //     return cities;
    // }

    getCities(): City[] {
        return this.cities;
    }
}