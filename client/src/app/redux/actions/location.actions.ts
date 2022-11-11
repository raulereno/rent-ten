import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/models/location.model';

//Constantes de para las Actions
export const LOAD_DATA = '[COUNTRIES List] Load Data';
export const LOADED_COUNTRIES = '[COUNTRIES List] Loaded Countries';
export const LOADED_STATE = '[STATE List] Loaded States';
export const LOADED_CITIES = '[CITIES List] Loaded Cities';


// *********** CREACION DE LAS  ACTIONS *********** //
// Tener presente que no necesariamente necesita de props/

// Cuando se cargan los articulos
export const loadData= createAction(
    LOAD_DATA
);

// Cuando se terminan de cargar
export const loadedCountries = createAction(
    LOADED_COUNTRIES,
    props<{ countries: Country[] }>()
);
export const loadedStates = createAction(
    LOADED_STATE,
    props<{ states: any[] }>() //HACER UNA INTERFACE DE STATES
);
export const loadedCities = createAction(
    LOADED_CITIES,
    props<{ cities: any[] }>() //HACER UNA INTERFACE DE CITIES
);
