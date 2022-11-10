import { City, Country, State } from "src/app/models/location.model";

export interface GlobalState {
    loading: boolean;
    countries: ReadonlyArray<Country>;
    state?:ReadonlyArray<State>
    cities?:ReadonlyArray<City>
}
