import { createContext, useContext, useMemo, useState, type ReactElement, type ReactNode } from 'react';
import type { PaymentResult, PurchaseData } from '../models/purchase-payment.model';

type PurchasePaymentStore = {
  purchaseData: PurchaseData | null;
  selectedPaymentMethod: string;
  paymentResult: PaymentResult | null;

  setPurchaseData: (data: PurchaseData) => void;
  setSelectedPaymentMethod: (method: string) => void;
  setPaymentResult: (result: PaymentResult) => void;
  clearPurchasePayment: () => void;
};

const PurchasePaymentContext = createContext<PurchasePaymentStore | null>(null);

type PurchasePaymentProviderProps = {
  children: ReactNode;
};

export function PurchasePaymentProvider({
  children,
}: PurchasePaymentProviderProps): ReactElement {
  const [purchaseData, setPurchaseDataState] = useState<PurchaseData | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethodState] = useState<string>('Tarjeta');
  const [paymentResult, setPaymentResultState] = useState<PaymentResult | null>(null);

  const value = useMemo<PurchasePaymentStore>(
    () => ({
      purchaseData,
      selectedPaymentMethod,
      paymentResult,

      setPurchaseData: setPurchaseDataState,
      setSelectedPaymentMethod: setSelectedPaymentMethodState,
      setPaymentResult: setPaymentResultState,

      clearPurchasePayment: () => {
        setPurchaseDataState(null);
        setSelectedPaymentMethodState('Tarjeta');
        setPaymentResultState(null);
      },
    }),
    [purchaseData, selectedPaymentMethod, paymentResult]
  );

  return (
    <PurchasePaymentContext.Provider value={value}>
      {children}
    </PurchasePaymentContext.Provider>
  );
}

export function usePurchasePaymentStore(): PurchasePaymentStore {
  const context = useContext(PurchasePaymentContext);

  if (!context) {
    throw new Error('usePurchasePaymentStore debe usarse dentro de PurchasePaymentProvider');
  }

  return context;
}