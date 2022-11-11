
import { City, Country, State } from "src/app/models/location.model";
import { House } from "./House";
import { userProfile } from "./UserProfile";
// export interface CountryState {
//     loading: boolean,
//     countries: ReadonlyArray<Country>;
// }

// export interface HousesState {
//     loading: boolean,
//     allHouses: ReadonlyArray<House>;
// }

// export interface ProfileState {
//     loading: boolean,
//     userProfile: userProfile;
// }

export interface GlobalState {
    loading?: boolean;
    countries?: ReadonlyArray<Country>;
    state?:ReadonlyArray<State>
    cities?:ReadonlyArray<City>
    userProfile?: userProfile;
    allHouses?: ReadonlyArray<House>;

}
