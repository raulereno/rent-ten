export interface Booking {
    userId?: string;
    start: string;
    end: string;
    people?: number;
    totalPay?: number;
    houseId?: string;
}
