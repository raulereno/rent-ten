import { createAction, props } from '@ngrx/store';
import { userProfile } from 'src/app/models/UserProfile';

export const LOAD_PROFILE = '[PROFILE List] Profile Cargado'
export const ADD_FAVORITEHOUSE = '[FAVORITE ADD] ADD_FAVORITEHOUSE'
export const DELETE_FAVORITEHOUSE = '[FAVORITE DELETE] DELETE_FAVORITEHOUSE'

export const loadProfile = createAction(
    LOAD_PROFILE,
    props<{ userProfile: userProfile}>()
)

export const addFavoriteHouse = createAction (
    ADD_FAVORITEHOUSE,
    props<{ payload: string}>()
    )

export const deleteFavoriteHouse = createAction (
    DELETE_FAVORITEHOUSE,
    props<{ payload: string}>()
    )
