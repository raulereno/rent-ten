import { Component, OnInit } from '@angular/core';
import { Country, City } from '../../models/model.interface';
import { filter, map, take } from 'rxjs/operators'

import { Data } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Data]
})
export class HomeComponent implements OnInit {

  public selectedCountry: Country = {
    id: 0,
    name: '',
  }

  public countries: Country[] | undefined;
  public cities: City[] | undefined;

  constructor(private dataSvc: Data) { }

  getContries(): void {
    this.dataSvc.getCountries().subscribe(countries => this.countries = countries)
  }

  // getCities(): void {
  //   this.dataSvc.getCities().subscribe(cities => this.cities = cities)
  // }

  ngOnInit(): void {
    // this.countries = this.dataSvc.getCountries();
    this.getContries();
    // this.getCities();
    // this.cities = this.dataSvc.getCities();
    // console.log(this.cities);
    // console.log(this.countries);
  }

  onSelect(event: any): void {
    let id = parseInt(event.target.value)
    // console.log('Id => ', event.target.value)

    // console.log(id)

    // let filterCities = this.dataSvc.getCities().pipe(map(elemet => elemet.filter(item => item.countryId === id))).subscribe(city => this.cities = city)

    // // let filterCities = this.dataSvc.getCities().forEach(element => element.filter(item => item.countryId === id))


    // console.log(filterCities)

    // this.cities = filterCities

    this.cities = this.dataSvc.getCities().filter(item => item.countryId === id);

  }
}


