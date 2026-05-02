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
import type { SeatMapData } from '../models/seat-selection.model';

interface SeatSelectionStoreValue {
  seatMapData: SeatMapData | null;
  selectedSeatIds: string[];
  isLoading: boolean;
  error: string | null;
  setSeatMapData: Dispatch<SetStateAction<SeatMapData | null>>;
  setSelectedSeatIds: Dispatch<SetStateAction<string[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

interface SeatSelectionProviderProps {
  children: ReactNode;
}

const SeatSelectionStoreContext = createContext<SeatSelectionStoreValue | null>(null);

export const SeatSelectionProvider = ({
  children,
}: SeatSelectionProviderProps): ReactElement => {
  const [seatMapData, setSeatMapData] = useState<SeatMapData | null>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: SeatSelectionStoreValue = useMemo(
    () => ({
      seatMapData,
      selectedSeatIds,
      isLoading,
      error,
      setSeatMapData,
      setSelectedSeatIds,
      setIsLoading,
      setError,
    }),
    [seatMapData, selectedSeatIds, isLoading, error]
  );

  return (
    <SeatSelectionStoreContext.Provider value={value}>{children}</SeatSelectionStoreContext.Provider>
  );
};

export const useSeatSelectionStore = () => {
  const context = useContext(SeatSelectionStoreContext);
  if (!context) {
    throw new Error('useSeatSelectionStore must be used inside SeatSelectionProvider');
  }
  return context;
};
