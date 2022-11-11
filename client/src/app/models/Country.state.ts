import { Country } from "src/app/models/model.interface";
import { House } from "./House";
import { userProfile } from "./UserProfile";
export interface CountryState {
    loading: boolean,
    countries: ReadonlyArray<Country>;
}

export interface HousesState {
    loading: boolean,
    allHouses: ReadonlyArray<House>;
}

export interface ProfileState {
    loading: boolean,
    userProfile: userProfile;
}