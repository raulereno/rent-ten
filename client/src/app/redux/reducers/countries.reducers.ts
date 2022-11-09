import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { CountryState } from 'src/app/models/Country.state';
import { Country } from 'src/app/models/model.interface';
import { loadCountries, loadedCountries } from '../actions/countries.actions';

// *********** ESTADO INICIAL ********** //
//Creo una interfaz de estado inicial con sus propiedades
export const initialState: CountryState = { loading: false, countries: [] }


// ********** REDUCERS ********* //
//El state es el estado actual antes de que se cambie
export const countriesReducer = createReducer(
    initialState,
    on(loadCountries, (state) => {
        return { ...state, loading: true }
    }),
    on(loadedCountries, (state, { countries }) => {
        return { ...state, loading: false, countries: countries }
    })
);