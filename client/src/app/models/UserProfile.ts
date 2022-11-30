import { Booking } from "./Booking";
import { House } from "./House";

export interface userProfile {
        id: string;
        name: string;
        picture: string;
        sub: string;
        lastname: string;
        mail: string;
        authorized: string;
        country: string;
        admin: boolean;
        verified: string;
        verificationCode: string;
        favoriteshouses?: string[];
        Reviews?: any[];
        Houses?: House[];
        Bookings?: Booking[];

}