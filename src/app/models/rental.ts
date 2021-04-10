export interface Rental {
    Id?:number;
    carId: number;
    customerId:number;
    rentDate?: any;
    returnDate?: any | null;
    status?:boolean;
  }