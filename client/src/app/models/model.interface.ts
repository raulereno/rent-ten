export interface Country {
    id: number;
    name: String;
}

export interface City {
    id: number;
    countryId: number;
    name: String
}