import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { GlobalState } from 'src/app/models/Country.state';
import { Country } from 'src/app/models/location.model';
import { loadData, loadedCountries } from '../actions/location.actions';

// *********** ESTADO INICIAL ********** //
//Creo una interfaz de estado inicial con sus propiedades
export const initialState: GlobalState = { loading: false, countries: [], state:[],cities:[] }


// ********** REDUCERS ********* //
//El state es el estado actual antes de que se cambie
export const countriesReducer = createReducer(
    initialState,
    on(loadData, (state) => {
        return { ...state, loading: true }
    }),
    on(loadedCountries, (state, { countries }) => {
        return { ...state, loading: false, countries: countries }
    })
);
