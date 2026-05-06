import { SALES_CHANNEL } from '../constants/purchase-payment.constants';
import type { CreatePurchaseRequestDto } from './purchase-payment.dto';
import type { PurchaseData } from './purchase-payment.model';

export const mapPaymentMethodToId = (paymentMethod: string): number => {
  const map: Record<string, number> = {
    Tarjeta: 1,
    'SINPE Móvil': 2,
    Transferencia: 3,
  };

  return map[paymentMethod] ?? 1;
};

export const mapPurchaseToCreatePurchaseDto = (
  purchaseData: PurchaseData,
  paymentMethod: string
): CreatePurchaseRequestDto => {
  return {
    user_id: 1,
    seller_user_id: null,
    sales_channel_id: SALES_CHANNEL.APP,
    payment_method_id: mapPaymentMethodToId(paymentMethod),
    total: purchaseData.finalPrice,
    notes: null,
    state_id: 1,
  };
};