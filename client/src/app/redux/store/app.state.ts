import { ActionReducerMap } from "@ngrx/store";
import { CountryState, HousesState, ProfileState } from "src/app/models/Country.state";
import { countriesReducer } from "../reducers/countries.reducers";
import { housesReducer } from "../reducers/houses.reducer"
import { profileReducer } from "../reducers/userprofile.reducer";

// Interfaz para poder crear el Store
export interface AppState {
    // Se le asigna el estado incial que viene del REDUCER
    storeCountries: CountryState;
    allHouses: HousesState;
    userProfile: ProfileState;
}

// Debe de tener el mismo nombre de la Interface storeCountries y el mismo nombre del Reducer
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    storeCountries: countriesReducer,
    allHouses: housesReducer,
    userProfile: profileReducer,
}
