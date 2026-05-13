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
import type { TripDetail } from '../models/trip-detail.model';

interface TripDetailStoreValue {
  tripDetail: TripDetail | null;
  isLoading: boolean;
  error: string | null;
  setTripDetail: Dispatch<SetStateAction<TripDetail | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

interface TripDetailProviderProps {
  children: ReactNode;
}

const TripDetailStoreContext = createContext<TripDetailStoreValue | null>(null);

export const TripDetailProvider = ({ children }: TripDetailProviderProps): ReactElement => {
  const [tripDetail, setTripDetail] = useState<TripDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: TripDetailStoreValue = useMemo(
    () => ({ tripDetail, isLoading, error, setTripDetail, setIsLoading, setError }),
    [tripDetail, isLoading, error]
  );

  return (
    <TripDetailStoreContext.Provider value={value}>{children}</TripDetailStoreContext.Provider>
  );
};

export const useTripDetailStore = () => {
  const context = useContext(TripDetailStoreContext);
  if (!context) {
    throw new Error('useTripDetailStore must be used inside TripDetailProvider');
  }
  return context;
};
