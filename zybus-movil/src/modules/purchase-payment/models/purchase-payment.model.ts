export interface PurchasePayment {
  id: string;
  ticketId: string;
  title: string;
  route: string;
  seatNumber: string;
  ownerUserId: string;
  paymentMethodId: number;
  total: number;
  paymentStatus: string;
  salesChannelId: number;
  purchaseDate: string;
}

export interface PurchasePaymentFormData {
  ticketId: string;
  title: string;
  route: string;
  seatNumber: string;
  ownerUserId: string;
  paymentMethodId: number;
  total: number;
}

export const createPurchasePaymentModel = ({
  id,
  ticketId,
  title,
  route,
  seatNumber,
  ownerUserId,
  paymentMethodId,
  total,
  paymentStatus,
  salesChannelId,
  purchaseDate,
}: PurchasePayment): PurchasePayment => ({
  id,
  ticketId,
  title,
  route,
  seatNumber,
  ownerUserId,
  paymentMethodId,
  total,
  paymentStatus,
  salesChannelId,
  purchaseDate,
});