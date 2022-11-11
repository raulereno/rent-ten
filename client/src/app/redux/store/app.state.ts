import { ActionReducerMap } from "@ngrx/store";
import { GlobalState } from "src/app/models/Country.state";
import { countriesReducer } from "../reducers/location.reducers";
export interface AppState {
    globalState: GlobalState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    globalState: countriesReducer,
}
