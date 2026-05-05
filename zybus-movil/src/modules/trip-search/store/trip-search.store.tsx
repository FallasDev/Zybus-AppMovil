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
import type { StopOption, TripSearchResult } from '../models/trip-search.model';

interface TripSearchStoreValue {
  results: TripSearchResult[];
  stopOptions: StopOption[];
  isLoading: boolean;
  error: string | null;
  setResults: Dispatch<SetStateAction<TripSearchResult[]>>;
  setStopOptions: Dispatch<SetStateAction<StopOption[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

interface TripSearchProviderProps {
  children: ReactNode;
}

const TripSearchStoreContext = createContext<TripSearchStoreValue | null>(null);

export const TripSearchProvider = ({ children }: TripSearchProviderProps): ReactElement => {
  const [results, setResults] = useState<TripSearchResult[]>([]);
  const [stopOptions, setStopOptions] = useState<StopOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: TripSearchStoreValue = useMemo(
    () => ({
      results,
      stopOptions,
      isLoading,
      error,
      setResults,
      setStopOptions,
      setIsLoading,
      setError,
    }),
    [results, stopOptions, isLoading, error]
  );

  return (
    <TripSearchStoreContext.Provider value={value}>{children}</TripSearchStoreContext.Provider>
  );
};

export const useTripSearchStore = () => {
  const context = useContext(TripSearchStoreContext);
  if (!context) {
    throw new Error('useTripSearchStore must be used inside TripSearchProvider');
  }
  return context;
};
