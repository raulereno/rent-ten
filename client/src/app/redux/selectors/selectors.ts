import { createSelector } from '@ngrx/store';
// import { CountryState, HousesState, ProfileState } from 'src/app/models/Country.state';
import { AppState } from '../store/app.state';
import {  GlobalState} from 'src/app/models/Country.state';

// Es el selector que tiene relacion con la propiedad del Store (storeCountries)
export const selectorItemsCountries = (state: AppState) => state.globalState;
export const selectorItemsAllHouses = (state: AppState) => state.globalState;
export const selectorItemsUserProfile = (state: AppState) => state.globalState;

// Es el selector que tiene relacion con la propiedad del Store (storeCountries)

//Ingreso a la propiedad del estado en este caso (countries)
export const selectorListCountries = createSelector(
    selectorItemsCountries,
    (state: GlobalState) => state.countries
)

export const selectorListLoading = createSelector(
    selectorItemsCountries,
    (state: GlobalState) => state.loading
)

export const selectorListHouses= createSelector(
    selectorItemsAllHouses,
    (state: GlobalState) => state.allHouses
)

export const selectorListProfile= createSelector(
    selectorItemsUserProfile,
    (state: GlobalState) => state.userProfile
)
