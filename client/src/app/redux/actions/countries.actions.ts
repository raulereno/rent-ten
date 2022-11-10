import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/models/model.interface';

//Constantes de para las Actions
export const LOAD_COUNTRIES = '[COUNTRIES List] Carga de Paises'
export const LOADED_COUNTRIES = '[COUNTRIES List] Paises Cargados'


// *********** CREACION DE LAS  ACTIONS *********** //
// Tener presente que no necesariamente necesita de props/

// Cuando se cargan los articulos
export const loadCountries = createAction(
    LOAD_COUNTRIES
);

// Cuando se terminan de cargar
export const loadedCountries = createAction(
    LOADED_COUNTRIES,
    props<{ countries: Country[] }>()
);