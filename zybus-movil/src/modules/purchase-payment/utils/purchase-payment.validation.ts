import {
  PAYMENT_METHODS,
  PURCHASE_PAYMENT_ERRORS,
  type PurchasePaymentErrorCode,
} from '../constants/purchase-payment.constants';

import type { PurchasePaymentFormData } from '../models/purchase-payment.model';
import type { Ticket } from '../../tickets/models/ticket.model';

export const getPaymentMethodLabel = (paymentMethodId: number): string => {
  const paymentMethod = PAYMENT_METHODS.find(
    (method) => method.id === paymentMethodId
  );

  return paymentMethod?.label ?? 'Método desconocido';
};

export const formatCurrency = (amount: number): string => {
  return `₡${amount.toLocaleString('es-CR')}`;
};

export const formatPurchaseDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-CR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const validatePurchasePaymentForm = (
  data: PurchasePaymentFormData
): PurchasePaymentErrorCode | null => {
  if (!data.ticketId) {
    return PURCHASE_PAYMENT_ERRORS.TICKET_REQUIRED;
  }

  if (!data.route) {
    return PURCHASE_PAYMENT_ERRORS.ROUTE_REQUIRED;
  }

  if (!data.seatNumber) {
    return PURCHASE_PAYMENT_ERRORS.SEAT_REQUIRED;
  }

  if (!data.ownerUserId) {
    return PURCHASE_PAYMENT_ERRORS.OWNER_USER_REQUIRED;
  }

  if (!data.total || data.total <= 0) {
    return PURCHASE_PAYMENT_ERRORS.INVALID_TOTAL;
  }

  if (!data.paymentMethodId) {
    return PURCHASE_PAYMENT_ERRORS.PAYMENT_METHOD_REQUIRED;
  }

  const paymentMethodExists = PAYMENT_METHODS.some(
    (method) => method.id === data.paymentMethodId
  );

  if (!paymentMethodExists) {
    return PURCHASE_PAYMENT_ERRORS.INVALID_PAYMENT_METHOD;
  }

  return null;
};

export const mapTicketToPurchaseFormData = (
  ticket: Ticket,
  paymentMethodId: number,
  total: number
): PurchasePaymentFormData => {
  return {
    ticketId: ticket.id,
    title: ticket.title,
    route: ticket.route,
    seatNumber: ticket.seatNumber,
    ownerUserId: ticket.ownerUserId,
    paymentMethodId,
    total,
  };
};