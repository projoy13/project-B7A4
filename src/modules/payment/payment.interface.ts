export interface ICreatePayment {
  rentalOrderId: string;
  transactionId: string;
  amount: number;
  method: "STRIPE" | "SSLCOMMERZ";
}