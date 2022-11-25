import { createReducer, on } from '@ngrx/store';
import { GlobalState } from 'src/app/models/Country.state';
import { loadData, loadedCountries, addFavoriteHouse, deleteFavoriteHouse, loadProfile, loadHouses, handleFilters, changeVerifiedStatusProfile, handleOrder, loadPayment, changeAuthorizedUser, deleteHouse } from '../actions/location.actions';

// *********** ESTADO INICIAL ********** //
//Creo una interfaz de estado inicial con sus propiedades
export const initialState: GlobalState = {
    countries: [],
    state: [],
    cities: [],
    backupHouses: [],
    allHouses: [],
    loading: false,
    userProfile: {
        id: '',
        name: '',
        picture: '',
        sub: '',
        lastname: '',
        mail: '',
        country: '',
        admin: false,
        authorized: '',
        verified: '',
        verificationCode: '',
        favoriteshouses: []
    },
    paymentInfo:[]

    // {
    //   userId: '',
    //   start: "",
    //   end: "",
    //   people: 0,
    //   totalPay: 0,
    //   houseId: ""
    // }
}


// ********** REDUCERS ********* //
//El state es el estado actual antes de que se cambie
export const countriesReducer = createReducer(
    initialState,

    on(loadData, (state) => {
        return { ...state, loading: true }
    }),

    on(loadedCountries, (state, { countries }) => {
        return { ...state, loading: false, countries: countries }
    }),

    on(loadHouses, (state, { allHouses }) => {
        return {
            ...state,
            loading: false,
            backupHouses: allHouses,
            allHouses: allHouses
        }
    }),

    on(loadProfile, (state, { userProfile }) => {
        return {
            ...state,
            loading: false,
            userProfile: userProfile
        }
    }),

    on(addFavoriteHouse, (state, { payload }) => {
        return {
            ...state,
            userProfile: {
                ...state.userProfile!,
                favoriteshouses: [...state.userProfile!.favoriteshouses!, payload]
            }
        }
    }),

    on(deleteFavoriteHouse, (state, payload) => {
        return {
            ...state,
            userProfile: {
                ...state.userProfile!,
                favoriteshouses: state.userProfile!.favoriteshouses!.filter(h => h !== payload.payload)
            }
        }
    }),

    on(changeVerifiedStatusProfile, (state, { payload }) => {
        return {
            ...state,
            userProfile: {
                ...state.userProfile!,
                verified: payload
            }
        }
    }),

    on(handleFilters, (state, payload) => {
        let superFilter = state.backupHouses

        const { minPrice, maxPrice, maxPeople, allowPets, wifi, selectedCountry, selectedCity } = payload.payload

        if (minPrice) {
            superFilter = superFilter?.filter((house: any) => house.price > minPrice)
        }

        if (maxPrice) {
            superFilter = superFilter?.filter((house: any) => house.price < maxPrice)
        }

        if (maxPeople) {
            superFilter = superFilter?.filter((house: any) => house.maxpeople < maxPeople)
        }

        if (allowPets) {
            superFilter = superFilter?.filter((house: any) => house.allowpets === true)
        }

        if (wifi) {
            superFilter = superFilter?.filter((house: any) => house.wifi === true)
        }

        if (selectedCountry) {
            superFilter = superFilter?.filter((house: any) => house.country === selectedCountry)
        }

        if (selectedCity) {
            superFilter = superFilter?.filter((house: any) => house.city === selectedCity)
        }

        return {
            ...state,
            allHouses: superFilter
        }
    }),

    on(handleOrder, (state, payload) => {

        let auxHouses = [...state.allHouses!];

        if (payload.payload == 'min') {
            auxHouses = auxHouses.sort((a, b) => a.price - b.price);
        }

        if (payload.payload == "max") {
            auxHouses = auxHouses.sort((a, b) => b.price - a.price);
        }

        if (!payload.payload) {
            auxHouses = [...state.backupHouses!]
        }

        return {
            ...state,
            allHouses: auxHouses
        }
    }),
    on(loadPayment, (state,payload) => {
      return{
        ...state,
        paymentInfo:[...state.paymentInfo!, payload.payload]
      }
    }),

    on(changeAuthorizedUser, (state, { payload }) => {
        return {
            ...state,
            userProfile: {
                ...state.userProfile!,
                authorized: payload
            }
        }
    }),

    on(deleteHouse, (state, payload) => {
        return {
            ...state, 
        }
    }),

);
