import { Country } from "src/app/models/model.interface";

export interface CountryState {
    loading: boolean,
    countries: ReadonlyArray<Country>;
}