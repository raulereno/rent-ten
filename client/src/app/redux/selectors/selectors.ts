import { createSelector } from '@ngrx/store';
import { CountryState, HousesState, ProfileState } from 'src/app/models/Country.state';
import { AppState } from '../store/app.state';

// Es el selector que tiene relacion con la propiedad del Store (storeCountries)
export const selectorItemsCountries = (state: AppState) => state.storeCountries;
export const selectorItemsAllHouses = (state: AppState) => state.allHouses;
export const selectorItemsUserProfile = (state: AppState) => state.userProfile;

//Ingreso a la propiedad del estado en este caso (countries)
export const selectorListCountries = createSelector(
    selectorItemsCountries,
    (state: CountryState) => state.countries
)

export const selectorListLoading = createSelector(
    selectorItemsCountries,
    (state: CountryState) => state.loading
)

export const selectorListHouses= createSelector(
    selectorItemsAllHouses,
    (state: HousesState) => state.allHouses
)

export const selectorListProfile= createSelector(
    selectorItemsUserProfile,
    (state: ProfileState) => state.userProfile
)
