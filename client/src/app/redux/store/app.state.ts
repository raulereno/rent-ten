import { ActionReducerMap } from "@ngrx/store";
import { GlobalState } from "src/app/models/Country.state";
import { countriesReducer } from "../reducers/location.reducers";

// Interfaz para poder crear el Store
export interface AppState {
    // Se le asigna el estado incial que viene del REDUCER
    globalState: GlobalState;
}

// Debe de tener el mismo nombre de la Interface storeCountries y el mismo nombre del Reducer
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  globalState: countriesReducer,
}
