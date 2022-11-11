// import { createReducer, on } from '@ngrx/store';
// import { GlobalState } from 'src/app/models/Country.state';
// import { loadedCountries } from '../actions/countries.actions';
// import { loadHouses } from '../actions/houses.actions';

// export const initialState: GlobalState = { loading: false, allHouses: [] }

// export const housesReducer = createReducer(
//     initialState,
//     on(loadHouses, (state, { allHouses }) => {
//         return { ...state, loading: false, allHouses: allHouses }
//     })
// );