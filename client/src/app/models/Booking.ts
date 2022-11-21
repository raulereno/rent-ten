export interface Booking {
    id?: string;
    UserId?: string;
    start: string;
    end: string;
    people?: number;
    totalPay?: number;
    HouseId?: string;
    code: string;
    createdAt?: string;
    updatedAt?: string;
    status?: string;
}
