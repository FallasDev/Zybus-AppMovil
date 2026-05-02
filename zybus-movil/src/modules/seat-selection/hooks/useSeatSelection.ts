import { useCallback, useEffect, useMemo } from 'react';
import { seatSelectionService } from '../services/seat-selection.service';
import { useSeatSelectionStore } from '../store/seat-selection.store';
import { mapSeatMapFromDTO } from '../models/seat-selection.mapper';
import { getSeatErrorMessage } from '../constants/seat-selection.constants';
import type { SeatMapData, SelectedSeat } from '../models/seat-selection.model';

interface UseSeatSelectionResult {
  seatMapData: SeatMapData | null;
  selectedSeats: SelectedSeat[];
  selectedSeatIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  canConfirm: boolean;
  addSelectedSeat: (seat: SelectedSeat) => void;
  removeSelectedSeat: (seatId: string) => void;
}

export const useSeatSelection = (
  tripId: string,
  maxPassengers: number
): UseSeatSelectionResult => {
  const {
    seatMapData,
    selectedSeats,
    isLoading,
    error,
    setSeatMapData,
    setSelectedSeats,
    setIsLoading,
    setError,
  } = useSeatSelectionStore();

  const withRequest = useCallback(
    async (fn: () => Promise<void>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        await fn();
        return true;
      } catch (requestError) {
        if (requestError instanceof Error) {
          setError(getSeatErrorMessage(requestError.message));
        } else {
          setError(getSeatErrorMessage('UNKNOWN_ERROR'));
        }
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading]
  );

  const loadSeats = useCallback(async () => {
    setSelectedSeats([]);
    await withRequest(async () => {
      const dto = await seatSelectionService.getTripSeats(tripId);
      setSeatMapData(mapSeatMapFromDTO(dto));
    });
  }, [tripId, setSeatMapData, setSelectedSeats, withRequest]);

  const addSelectedSeat = useCallback(
    (seat: SelectedSeat) => {
      setSelectedSeats((prev) => {
        if (prev.some((s) => s.seatId === seat.seatId)) return prev;
        if (prev.length >= maxPassengers) return prev;
        return [...prev, seat];
      });
    },
    [maxPassengers, setSelectedSeats]
  );

  const removeSelectedSeat = useCallback(
    (seatId: string) => {
      setSelectedSeats((prev) => prev.filter((s) => s.seatId !== seatId));
    },
    [setSelectedSeats]
  );

  useEffect(() => {
    loadSeats();
  }, [loadSeats]);

  const selectedSeatIds = useMemo(
    () => new Set(selectedSeats.map((s) => s.seatId)),
    [selectedSeats]
  );

  const canConfirm = selectedSeats.length === maxPassengers;

  return {
    seatMapData,
    selectedSeats,
    selectedSeatIds,
    isLoading,
    error,
    canConfirm,
    addSelectedSeat,
    removeSelectedSeat,
  };
};
