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