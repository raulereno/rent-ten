// import { createReducer, on } from '@ngrx/store';
// import { GlobalState } from 'src/app/models/Country.state';
// import { loadedCountries } from '../actions/countries.actions';
// import { loadHouses } from '../actions/houses.actions';
// import { userProfile } from '../../models/UserProfile';
// import { addFavoriteHouse, deleteFavoriteHouse, loadProfile } from '../actions/location.actions';

// export const initialState: GlobalState = { 
//     countries: [],
//     state: [],
//     cities: [],
//     allHouses: [],
//     loading: false, 
//     userProfile: {
//         id: '',
//         name: '',
//         picture: '',
//         sub: '',
//         lastname: '',
//         mail: '',
//         country: '',
//         admin: false,
//         authorized: '',
//         verified: '',
//         verificationCode: '',
//         favoriteshouses: []
//     } 
// }

// export const profileReducer = createReducer(
//     initialState,

//     on(loadHouses, (state, { allHouses }) => {
//         console.log('llego a load hosue')
//         return { ...state, loading: false, allHouses: allHouses }
//     }),

//     on(loadProfile, (state, {userProfile}) => {
//         console.log('llego a load profiel')
//         return { ...state, 
//             loading: false, 
//             userProfile: userProfile
//         }
//     }),

//     on(addFavoriteHouse, (state, {payload}) => {
//         console.log(payload)
//         return { 
//             ...state, 
//             loading: true,
//             userProfile: {
//                 ...state.userProfile,
//                 favoriteshouses: [...state.userProfile.favoriteshouses, payload]
//             }
//         }
//     }),

//     on(deleteFavoriteHouse, (state, {payload}) => {
//         console.log(payload)

//         return { 
//             ...state, 
//             loading: true,
//             userProfile: {
//                 ...state.userProfile,
//                 favoriteshouses: state.userProfile.favoriteshouses.filter(h => h !== payload)
//             }
//         }
//     })


// );

