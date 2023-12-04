import { IPainting } from "./paintings";


export interface IOrder {
    _id: string,
    user: string,
    email: string,
    phoneNumber: string,
    address: string,
    zipCode: number,
    referenceID: string,
    orderedPaintings: [IPainting] | any,
    status: string,
    createdAt: Date
}

export enum IOrderStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Completed = 'Completed',
    Declined = 'Declined'
}