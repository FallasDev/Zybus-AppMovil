import {
  PAYMENT_METHODS,
  PURCHASE_PAYMENT_ERRORS,
  type PurchasePaymentErrorCode,
} from '../constants/purchase-payment.constants';
import type { PurchaseData } from '../models/purchase-payment.model';

export const validatePurchaseData = (
  purchaseData: PurchaseData
): PurchasePaymentErrorCode | null => {
  if (!purchaseData.passengerName.trim()) return PURCHASE_PAYMENT_ERRORS.PASSENGER_NAME_REQUIRED;
  if (!purchaseData.passengerId.trim()) return PURCHASE_PAYMENT_ERRORS.PASSENGER_ID_REQUIRED;
  if (!purchaseData.seat.trim()) return PURCHASE_PAYMENT_ERRORS.SEAT_REQUIRED;
  if (purchaseData.finalPrice <= 0) return PURCHASE_PAYMENT_ERRORS.INVALID_TOTAL;
  if (!purchaseData.origin.trim()) return PURCHASE_PAYMENT_ERRORS.ORIGIN_REQUIRED;
  if (!purchaseData.destination.trim()) return PURCHASE_PAYMENT_ERRORS.DESTINATION_REQUIRED;
  if (!purchaseData.date.trim()) return PURCHASE_PAYMENT_ERRORS.DATE_REQUIRED;
  if (!purchaseData.time.trim()) return PURCHASE_PAYMENT_ERRORS.TIME_REQUIRED;

  return null;
};

export const validatePaymentMethod = (
  paymentMethod: string
): PurchasePaymentErrorCode | null => {
  if (!paymentMethod.trim()) return PURCHASE_PAYMENT_ERRORS.PAYMENT_METHOD_REQUIRED;

  const exists = PAYMENT_METHODS.some((method) => method.label === paymentMethod);

  if (!exists) return PURCHASE_PAYMENT_ERRORS.INVALID_PAYMENT_METHOD;

  return null;
};

export const getPurchasePaymentErrorMessage = (
  errorCode: string
): string => {
  const messageMap: Record<PurchasePaymentErrorCode, string> = {
    [PURCHASE_PAYMENT_ERRORS.PASSENGER_NAME_REQUIRED]: 'El nombre del pasajero es requerido.',
    [PURCHASE_PAYMENT_ERRORS.PASSENGER_ID_REQUIRED]: 'La identificación del pasajero es requerida.',
    [PURCHASE_PAYMENT_ERRORS.SEAT_REQUIRED]: 'Debes seleccionar un asiento.',
    [PURCHASE_PAYMENT_ERRORS.INVALID_TOTAL]: 'El total de la compra es inválido.',
    [PURCHASE_PAYMENT_ERRORS.ORIGIN_REQUIRED]: 'El origen del viaje es requerido.',
    [PURCHASE_PAYMENT_ERRORS.DESTINATION_REQUIRED]: 'El destino del viaje es requerido.',
    [PURCHASE_PAYMENT_ERRORS.DATE_REQUIRED]: 'La fecha del viaje es requerida.',
    [PURCHASE_PAYMENT_ERRORS.TIME_REQUIRED]: 'La hora del viaje es requerida.',
    [PURCHASE_PAYMENT_ERRORS.PAYMENT_METHOD_REQUIRED]: 'Selecciona un método de pago.',
    [PURCHASE_PAYMENT_ERRORS.INVALID_PAYMENT_METHOD]: 'Método de pago inválido.',
  };

  if (errorCode in messageMap) {
    return messageMap[errorCode as PurchasePaymentErrorCode];
  }

  return 'Error inesperado.';
};