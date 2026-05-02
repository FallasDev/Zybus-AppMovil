import { useCallback, useEffect } from 'react';
import { seatSelectionService } from '../services/seat-selection.service';
import { useSeatSelectionStore } from '../store/seat-selection.store';
import { mapSeatMapFromDTO } from '../models/seat-selection.mapper';
import { getSeatErrorMessage } from '../constants/seat-selection.constants';
import type { SeatMapData } from '../models/seat-selection.model';

interface UseSeatSelectionResult {
  seatMapData: SeatMapData | null;
  selectedSeatIds: string[];
  isLoading: boolean;
  error: string | null;
  canConfirm: boolean;
  toggleSeat: (seatId: string) => void;
}

export const useSeatSelection = (
  tripId: string,
  maxPassengers: number
): UseSeatSelectionResult => {
  const {
    seatMapData,
    selectedSeatIds,
    isLoading,
    error,
    setSeatMapData,
    setSelectedSeatIds,
    setIsLoading,
    setError,
  } = useSeatSelectionStore();

  const withRequest = useCallback(
    async (requestFn: () => Promise<void>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        await requestFn();
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
    setSelectedSeatIds([]);
    await withRequest(async () => {
      const dto = await seatSelectionService.getTripSeats(tripId);
      setSeatMapData(mapSeatMapFromDTO(dto));
    });
  }, [tripId, setSeatMapData, setSelectedSeatIds, withRequest]);

  const toggleSeat = useCallback(
    (seatId: string) => {
      if (!seatMapData) return;
      const seat = seatMapData.seats.find((s) => s.id === seatId);
      if (!seat || seat.status === 'occupied') return;

      setSelectedSeatIds((prev) => {
        if (prev.includes(seatId)) return prev.filter((id) => id !== seatId);
        if (prev.length >= maxPassengers) return prev;
        return [...prev, seatId];
      });
    },
    [seatMapData, maxPassengers, setSelectedSeatIds]
  );

  useEffect(() => {
    loadSeats();
  }, [loadSeats]);

  const canConfirm = selectedSeatIds.length === maxPassengers;

  return { seatMapData, selectedSeatIds, isLoading, error, canConfirm, toggleSeat };
};
