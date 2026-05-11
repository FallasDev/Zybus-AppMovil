import { useState } from 'react';

import { PurchasePayment, PurchasePaymentFormData } from '../models/purchase-payment.model';
import { purchasePaymentService } from '../services/payment-payment.service';

export const usePurchasePayment = () => {
  const [purchase, setPurchase] = useState<PurchasePayment | null>(null);
  const [purchases, setPurchases] = useState<PurchasePayment[]>(
    purchasePaymentService.getAll()
  );

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<number | null>(null);

  const createPurchase = (formData: PurchasePaymentFormData): PurchasePayment => {
    const newPurchase = purchasePaymentService.create(formData);

    setPurchase(newPurchase);
    setPurchases(purchasePaymentService.getAll());
    setSelectedPaymentMethodId(formData.paymentMethodId);

    return newPurchase;
  };

  const clearPurchases = () => {
    purchasePaymentService.clear();
    setPurchase(null);
    setPurchases([]);
    setSelectedPaymentMethodId(null);
  };

  return {
    purchase,
    purchases,
    selectedPaymentMethodId,
    setSelectedPaymentMethodId,
    createPurchase,
    clearPurchases,
  };
};