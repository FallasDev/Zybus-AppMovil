export interface PurchasePaymentDto {
  id: string;
  ticket_id: string;
  title: string;
  route: string;
  seat_number: string;
  owner_user_id: string;
  payment_method_id: number;
  total: number;
  payment_status: string;
  sales_channel_id: number;
  purchase_date: string;
}