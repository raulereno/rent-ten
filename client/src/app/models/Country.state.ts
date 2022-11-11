import { City, Country, State } from "src/app/models/location.model";
import { House } from "./House";
import { userProfile } from "./UserProfile";
export interface GlobalState {
    loading?: boolean;
    countries?: ReadonlyArray<Country>;
    state?:ReadonlyArray<State>
    cities?:ReadonlyArray<City>
    userProfile?: userProfile
    allHouses?: ReadonlyArray<House>;
    backupHouses?: ReadonlyArray<House>

}
