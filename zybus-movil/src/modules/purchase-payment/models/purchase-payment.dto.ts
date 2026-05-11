export interface PurchaseDto {
  id: number;
  user_id?: number | null;
  seller_user_id?: number | null;
  sales_channel_id?: number | null;
  payment_method_id: number;
  total: number;
  purchase_date?: string;
  notes?: string;
  state_id: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}