import { useState } from 'react';
import type { PurchaseData } from '../models/purchase-payment.model';
import { createPurchase } from '../services/payment-payment.service';
import { validatePaymentMethod, getPurchasePaymentErrorMessage } from '../utils/purchase-payment.validation';

type PaymentResult = {
  status: 'approved' | 'rejected';
  confirmationNumber?: string;
};

export function usePurchasePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePurchase = async (
    purchaseData: PurchaseData,
    paymentMethod: string
  ): Promise<PaymentResult | null> => {
    // limpiar errores previos
    setError(null);

    // validar
    const validationError = validatePaymentMethod(paymentMethod);

    if (validationError) {
      setError(getPurchasePaymentErrorMessage(validationError));
      return null;
    }

    try {
      setIsLoading(true);

      const response = await createPurchase(purchaseData, paymentMethod);

      return response;
    } catch (err) {
      setError('Error al procesar el pago');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleCreatePurchase,
  };
}

// 🔥 helper interno
function mapPaymentMethod(method: string): number {
  const map: Record<string, number> = {
    'Tarjeta': 1,
    'SINPE Móvil': 2,
    'Transferencia': 3,
  };

  return map[method] || 1;
}