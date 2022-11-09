import { createSelector } from '@ngrx/store';
import { CountryState } from 'src/app/models/Country.state';
import { AppState } from '../store/app.state';

// Es el selector que tiene relacion con la propiedad del Store (storeCountries)
export const selectorItemsCountries = (state: AppState) => state.storeCountries;

//Ingreso a la propiedad del estado en este caso (countries)
export const selectorListCountries = createSelector(
    selectorItemsCountries,
    (state: CountryState) => state.countries
)

export const selectorListLoading = createSelector(
    selectorItemsCountries,
    (state: CountryState) => state.loading
)
