import {
  createContext,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { PurchasePayment } from '../models/purchase-payment.model';
import type { Ticket } from '../../tickets/models/ticket.model';

interface PurchasePaymentStoreValue {
  purchase: PurchasePayment | null;
  purchases: PurchasePayment[];
  selectedTicket: Ticket | null;
  selectedPaymentMethodId: number | null;
  isLoading: boolean;
  error: string | null;

  setPurchase: Dispatch<SetStateAction<PurchasePayment | null>>;
  setPurchases: Dispatch<SetStateAction<PurchasePayment[]>>;
  setSelectedTicket: Dispatch<SetStateAction<Ticket | null>>;
  setSelectedPaymentMethodId: Dispatch<SetStateAction<number | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

interface PurchasePaymentProviderProps {
  children: ReactNode;
}

const PurchasePaymentStoreContext =
  createContext<PurchasePaymentStoreValue | null>(null);

export const PurchasePaymentProvider = ({
  children,
}: PurchasePaymentProviderProps): ReactElement => {
  const [purchase, setPurchase] = useState<PurchasePayment | null>(null);
  const [purchases, setPurchases] = useState<PurchasePayment[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: PurchasePaymentStoreValue = useMemo(
    () => ({
      purchase,
      purchases,
      selectedTicket,
      selectedPaymentMethodId,
      isLoading,
      error,
      setPurchase,
      setPurchases,
      setSelectedTicket,
      setSelectedPaymentMethodId,
      setIsLoading,
      setError,
    }),
    [
      purchase,
      purchases,
      selectedTicket,
      selectedPaymentMethodId,
      isLoading,
      error,
    ]
  );

  return (
    <PurchasePaymentStoreContext.Provider value={value}>
      {children}
    </PurchasePaymentStoreContext.Provider>
  );
};

export const usePurchasePaymentStore = (): PurchasePaymentStoreValue => {
  const context = useContext(PurchasePaymentStoreContext);

  if (!context) {
    throw new Error(
      'usePurchasePaymentStore must be used inside PurchasePaymentProvider'
    );
  }

  return context;
};