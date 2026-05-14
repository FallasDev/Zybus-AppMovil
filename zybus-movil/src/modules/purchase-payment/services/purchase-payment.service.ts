import {
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  SALES_CHANNEL,
} from '../constants/purchase-payment.constants';

import {
  PurchasePayment,
  PurchasePaymentFormData,
  createPurchasePaymentModel,
} from '../models/purchase-payment.model';

let purchases: PurchasePayment[] = [];

export const purchasePaymentService = {
  getAll: (): PurchasePayment[] => {
    return purchases;
  },

  getById: (id: string): PurchasePayment | undefined => {
    return purchases.find((purchase) => purchase.id === id);
  },

  create: (formData: PurchasePaymentFormData): PurchasePayment => {
    const paymentMethodExists = PAYMENT_METHODS.some(
      (method) => method.id === formData.paymentMethodId
    );

    if (!paymentMethodExists) {
      throw new Error('INVALID_PAYMENT_METHOD');
    }

    const newPurchase = createPurchasePaymentModel({
      id: Date.now().toString(),
      ticketId: formData.ticketId,
      title: formData.title,
      route: formData.route,
      seatNumber: formData.seatNumber,
      ownerUserId: formData.ownerUserId,
      paymentMethodId: formData.paymentMethodId,
      total: formData.total,
      paymentStatus: PAYMENT_STATUS.APPROVED,
      salesChannelId: SALES_CHANNEL.APP,
      purchaseDate: new Date().toISOString(),
    });

    purchases = [...purchases, newPurchase];

    return newPurchase;
  },

  clear: (): void => {
    purchases = [];
  },
};