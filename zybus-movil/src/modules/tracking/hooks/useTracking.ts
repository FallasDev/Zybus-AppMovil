import { useEffect } from 'react';
import { trackingService } from '../services/tracking.service';
import { useTrackingStore } from '../store/tracking.store';

export function useTracking(tripId: string) {
  const { tracking, busPosition, stops, isLoading, error, setTracking, updateBusPosition, setLoading, setError, reset } =
    useTrackingStore();

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    async function load() {
      setLoading(true);
      try {
        const data = await trackingService.getTripTracking(tripId);
        setTracking(data);
        unsubscribe = trackingService.subscribeToBusPosition(tripId, (position, updatedStops) => {
          updateBusPosition(position, updatedStops);
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => {
      unsubscribe?.();
      reset();
    };
  }, [tripId]);

  const nextStop = stops.find((s) => !s.isCompleted) ?? null;

  return { tracking, busPosition, stops, nextStop, isLoading, error };
}
