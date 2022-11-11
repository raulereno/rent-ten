import { createReducer, on } from '@ngrx/store';
import { HousesState } from 'src/app/models/Country.state';
import { loadedCountries } from '../actions/countries.actions';
import { loadHouses } from '../actions/houses.actions';

export const initialState: HousesState = { loading: false, allHouses: [] }

export const housesReducer = createReducer(
    initialState,
    on(loadHouses, (state, { allHouses }) => {
        return { ...state, loading: false, allHouses: allHouses }
    })
);