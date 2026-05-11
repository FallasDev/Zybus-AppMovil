import type { ReactElement, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import type { TripTracking, BusPosition, TrackingStop } from '../models/tracking.model';

interface TrackingState {
  tracking: TripTracking | null;
  busPosition: BusPosition | null;
  stops: TrackingStop[];
  isLoading: boolean;
  error: string | null;
}

interface TrackingActions {
  setTracking: (tracking: TripTracking) => void;
  updateBusPosition: (position: BusPosition, stops: TrackingStop[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

type TrackingContextValue = TrackingState & TrackingActions;

const TrackingContext = createContext<TrackingContextValue | null>(null);

const initialState: TrackingState = {
  tracking: null,
  busPosition: null,
  stops: [],
  isLoading: false,
  error: null,
};

export function TrackingProvider({ children }: { children: ReactNode }): ReactElement {
  const [state, setState] = useState<TrackingState>(initialState);

  const setTracking = useCallback((tracking: TripTracking) => {
    setState((prev) => ({
      ...prev,
      tracking,
      stops: tracking.stops,
      busPosition: tracking.currentPosition,
    }));
  }, []);

  const updateBusPosition = useCallback((position: BusPosition, stops: TrackingStop[]) => {
    setState((prev) => ({ ...prev, busPosition: position, stops }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  return (
    <TrackingContext.Provider
      value={{ ...state, setTracking, updateBusPosition, setLoading, setError, reset }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

export function useTrackingStore(): TrackingContextValue {
  const ctx = useContext(TrackingContext);
  if (!ctx) throw new Error('useTrackingStore must be used within TrackingProvider');
  return ctx;
}
