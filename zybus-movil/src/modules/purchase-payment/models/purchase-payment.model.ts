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
  hasNumberedSeats?: boolean;
}

export interface PurchasePaymentFormData {
  ticketId: string;
  title: string;
  route: string;
  seatNumber: string;
  ownerUserId: string;
  paymentMethodId: number;
  total: number;

  departurePoint?: string;
  arrivalPoint?: string;
  duration?: string;
  date?: string;
  departureTime?: string;
  hasNumberedSeats?: boolean;
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