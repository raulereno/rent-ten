import { createReducer, on } from '@ngrx/store';
import { ProfileState } from 'src/app/models/Country.state';
import { loadedCountries } from '../actions/countries.actions';
import { loadHouses } from '../actions/houses.actions';
import { userProfile } from 'src/app/models/UserProfile';
import { addFavoriteHouse, deleteFavoriteHouse, loadProfile } from '../actions/userprofile.actions';

export const initialState: ProfileState = { 
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
    } 
}

export const profileReducer = createReducer(
    initialState,

    on(loadProfile, (state, { userProfile }) => {
        return { ...state, loading: false, userProfile: userProfile }
    }),

    on(addFavoriteHouse, (state, {payload}) => {
        console.log(payload)
        return { 
            ...state, 
            loading: true,
            userProfile: {
                ...state.userProfile,
                favoriteshouses: [...state.userProfile.favoriteshouses, payload]
            }
        }
    }),

    on(deleteFavoriteHouse, (state, {payload}) => {
        console.log(payload)

        return { 
            ...state, 
            loading: true,
            userProfile: {
                ...state.userProfile,
                favoriteshouses: state.userProfile.favoriteshouses.filter(h => h !== payload)
            }
        }
    })


);

