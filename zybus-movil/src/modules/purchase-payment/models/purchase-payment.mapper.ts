import type { PurchasePaymentDto } from './purchase-payment.dto';
import type { PurchasePayment } from './purchase-payment.model';

export const fromDtoToPurchasePayment = (
  dto: PurchasePaymentDto
): PurchasePayment => ({
  id: dto.id,
  ticketId: dto.ticket_id,
  title: dto.title,
  route: dto.route,
  seatNumber: dto.seat_number,
  ownerUserId: dto.owner_user_id,
  paymentMethodId: dto.payment_method_id,
  total: dto.total,
  paymentStatus: dto.payment_status,
  salesChannelId: dto.sales_channel_id,
  purchaseDate: dto.purchase_date,
});

export const fromPurchasePaymentToDto = (
  purchase: PurchasePayment
): PurchasePaymentDto => ({
  id: purchase.id,
  ticket_id: purchase.ticketId,
  title: purchase.title,
  route: purchase.route,
  seat_number: purchase.seatNumber,
  owner_user_id: purchase.ownerUserId,
  payment_method_id: purchase.paymentMethodId,
  total: purchase.total,
  payment_status: purchase.paymentStatus,
  sales_channel_id: purchase.salesChannelId,
  purchase_date: purchase.purchaseDate,
});