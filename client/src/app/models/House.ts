import { Booking } from "./Booking";

export interface House {
    Users?: any[];
    allowpets: boolean;
    bathrooms: number;
    city: string;
    country: string;
    address: string;
    id: string;
    maxpeople: number;
    picture: string[];
    rooms: number;
    type: string;
    price: number;
    wifi: boolean;
    Bookings: Booking[];
    scores: number[];
    Reviews?: any[];
    rating?: number;
    price_quality_relation: number;
}
