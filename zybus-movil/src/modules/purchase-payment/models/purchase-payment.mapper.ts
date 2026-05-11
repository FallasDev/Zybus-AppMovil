import { Purchase } from './purchase-payment.model';
import { PurchaseDto } from './purchase-payment.dto';

export const fromDtoToPurchase = (
  dto: PurchaseDto
): Purchase => ({
  id: dto.id,
  userId: dto.user_id,
  sellerUserId: dto.seller_user_id,
  salesChannelId: dto.sales_channel_id,
  paymentMethodId: dto.payment_method_id,
  total: dto.total,
  purchaseDate: dto.purchase_date,
  notes: dto.notes,
  stateId: dto.state_id,
  isActive: dto.is_active,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
  deletedAt: dto.deleted_at,
});

export const fromPurchaseToDto = (
  purchase: Purchase
): PurchaseDto => ({
  id: purchase.id,
  user_id: purchase.userId,
  seller_user_id: purchase.sellerUserId,
  sales_channel_id: purchase.salesChannelId,
  payment_method_id: purchase.paymentMethodId,
  total: purchase.total,
  purchase_date: purchase.purchaseDate,
  notes: purchase.notes,
  state_id: purchase.stateId,
  is_active: purchase.isActive,
  created_at: purchase.createdAt,
  updated_at: purchase.updatedAt,
  deleted_at: purchase.deletedAt,
});