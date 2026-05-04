import { useCallback, useEffect } from 'react';
import { tripSearchService } from '../services/trip-search.service';
import { useTripSearchStore } from '../store/trip-search.store';
import { mapTripSearchResultFromDTO, mapStopOptionFromDTO } from '../models/trip-search.mapper';
import { validateTripSearchForm, getErrorMessage } from '../utils/trip-search.validation';
import type { TripSearchFormData, TripSearchResult, StopOption } from '../models/trip-search.model';

interface UseTripSearchResult {
  results: TripSearchResult[];
  stopOptions: StopOption[];
  isLoading: boolean;
  error: string | null;
  handleSearch: (formData: TripSearchFormData) => Promise<boolean>;
}

export const useTripSearch = (): UseTripSearchResult => {
  const {
    results,
    stopOptions,
    isLoading,
    error,
    setResults,
    setStopOptions,
    setIsLoading,
    setError,
  } = useTripSearchStore();

  const withRequest = useCallback(
    async (requestFn: () => Promise<void>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        await requestFn();
        return true;
      } catch (requestError) {
        if (requestError instanceof Error) {
          setError(getErrorMessage(requestError.message));
        } else {
          setError(getErrorMessage('UNKNOWN_ERROR'));
        }
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading]
  );

  const loadStops = useCallback(async () => {
    if (stopOptions.length > 0) return;
    await withRequest(async () => {
      const dtos = await tripSearchService.getStops();
      setStopOptions(dtos.map(mapStopOptionFromDTO));
    });
  }, [stopOptions.length, setStopOptions, withRequest]);

  const handleSearch = useCallback(
    async (formData: TripSearchFormData): Promise<boolean> => {
      const validationError = validateTripSearchForm(formData);
      if (validationError) {
        setError(getErrorMessage(validationError));
        return false;
      }
      return withRequest(async () => {
        const dtos = await tripSearchService.searchTrips(formData);
        setResults(dtos.map(mapTripSearchResultFromDTO));
      });
    },
    [setError, setResults, withRequest]
  );

  useEffect(() => {
    loadStops();
  }, [loadStops]);

  return { results, stopOptions, isLoading, error, handleSearch };
};
