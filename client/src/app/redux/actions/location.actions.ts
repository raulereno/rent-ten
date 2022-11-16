import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/models/location.model';
import { House } from 'src/app/models/House';
import { userProfile } from 'src/app/models/UserProfile';
import { Booking } from 'src/app/models/Booking';

export const LOAD_DATA = '[COUNTRIES List] Load Data';
export const LOADED_COUNTRIES = '[COUNTRIES List] Loaded Countries';
export const LOADED_STATE = '[STATE List] Loaded States';
export const LOADED_CITIES = '[CITIES List] Loaded Cities';
export const LOAD_COUNTRIES = '[COUNTRIES List] Carga de Paises'
export const LOAD_HOUSES = '[HOUSES List] Houses Cargadas'
export const LOAD_PROFILE = '[PROFILE List] Profile Cargado'
export const ADD_FAVORITEHOUSE = '[FAVORITE ADD] ADD_FAVORITEHOUSE'
export const DELETE_FAVORITEHOUSE = '[FAVORITE DELETE] DELETE_FAVORITEHOUSE'
export const HANDLE_FILTERS = '[HANDLE FILTERS] HANDLE_FILTERS'
export const CHANGE_VERIFIED = '[CHANGE_VERIFIED] CHANGE_VERIFIED'
export const HANDLE_ORDER = '[HANDLE_ORDER] HANDLE_ORDER'
export const LOAD_PAYMENT = '[LOAD_PAYMENT] LOAD_PAYMENT'

export const loadData= createAction(
    LOAD_DATA
);

export const loadedCountries = createAction(
    LOADED_COUNTRIES,
    props<{ countries: Country[] }>()
);

export const loadedStates = createAction(
    LOADED_STATE,
    props<{ states: any[] }>()
);

export const loadedCities = createAction(
    LOADED_CITIES,
    props<{ cities: any[] }>()
);

export const loadHouses = createAction(
    LOAD_HOUSES,
    props<{ allHouses: House[]}>()
);

export const loadCountries = createAction(
    LOAD_COUNTRIES
);

export const loadProfile = createAction(
    LOAD_PROFILE,
    props<{ userProfile: userProfile}>()
)

export const addFavoriteHouse = createAction (
    ADD_FAVORITEHOUSE,
    props<{payload: string}>()
    )

export const deleteFavoriteHouse = createAction (
    DELETE_FAVORITEHOUSE,
    props<{ payload: string}>()
    )


export const handleFilters = createAction (
    HANDLE_FILTERS,
    props<{payload: any}>()
)

export const changeVerifiedStatusProfile = createAction (
    CHANGE_VERIFIED,
    props<{payload: string}>()
)

export const handleOrder = createAction (
    HANDLE_ORDER,
    props<{payload: string}>()
)

export const loadPayment = createAction(
  LOAD_PAYMENT,
  props<{ payload: Booking}>()
)
