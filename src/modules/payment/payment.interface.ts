export interface ICreatePayment {
  rentalOrderId: string;
  transactionId: string;
  amount: number;
  method: "STRIPE" | "SSLCOMMERZ";
}
export interface ICreatePayment {
  rentalOrderId: string;
}