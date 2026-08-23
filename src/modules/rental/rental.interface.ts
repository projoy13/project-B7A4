export interface IRentalItem {
  gearId: string;
  quantity: number;
}

export interface ICreateRental {
  customerId: string;
  startDate: string;
  endDate: string;
  items: IRentalItem[];
}

export interface IUpdateRentalStatus {
  status:
    | "PLACED"
    | "CONFIRMED"
    | "CANCELLED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED";
}