-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "provider" "PaymentProvider" NOT NULL DEFAULT 'STRIPE';
