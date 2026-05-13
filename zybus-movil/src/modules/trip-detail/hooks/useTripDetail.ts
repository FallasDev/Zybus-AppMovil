import { useCallback, useEffect } from 'react';
import { tripDetailService } from '../services/trip-detail.service';
import { useTripDetailStore } from '../store/trip-detail.store';
import { mapTripDetailFromDTO } from '../models/trip-detail.mapper';
import { getDetailErrorMessage } from '../constants/trip-detail.constants';
import type { TripDetail } from '../models/trip-detail.model';

interface UseTripDetailResult {
  tripDetail: TripDetail | null;
  isLoading: boolean;
  error: string | null;
}

export const useTripDetail = (tripId: string): UseTripDetailResult => {
  const { tripDetail, isLoading, error, setTripDetail, setIsLoading, setError } =
    useTripDetailStore();

  const withRequest = useCallback(
    async (requestFn: () => Promise<void>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        await requestFn();
        return true;
      } catch (requestError) {
        if (requestError instanceof Error) {
          setError(getDetailErrorMessage(requestError.message));
        } else {
          setError(getDetailErrorMessage('UNKNOWN_ERROR'));
        }
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading]
  );

  const loadTripDetail = useCallback(async () => {
    await withRequest(async () => {
      const dto = await tripDetailService.getTripDetail(tripId);
      setTripDetail(mapTripDetailFromDTO(dto));
    });
  }, [tripId, setTripDetail, withRequest]);

  useEffect(() => {
    loadTripDetail();
  }, [loadTripDetail]);

  return { tripDetail, isLoading, error };
};
