export interface Booking {
    paymentId?:string,
    userId?: string;
    start: string;
    end: string;
    people?: number;
    totalPay?: number;
    houseId?: string;
}
