import type { PaymentStatus } from './purchase-payment.model';

export type CreatePurchaseRequestDto = {
  user_id?: number;
  seller_user_id?: number | null;
  sales_channel_id: number;
  payment_method_id: number;
  total: number;
  notes?: string | null;
  state_id: number;
};

export type CreatePurchaseResponseDto = {
  id: number;
  status: PaymentStatus;
  confirmation_number: string;
  ticket_qr?: string;
};