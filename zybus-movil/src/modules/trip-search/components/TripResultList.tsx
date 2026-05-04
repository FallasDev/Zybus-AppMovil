import type { ReactElement } from 'react';
import { FlatList } from 'react-native';
import { EmptyState, LoadingState } from '../../../shared/components';
import { TripResultCard } from './TripResultCard';
import type { TripSearchResult } from '../models/trip-search.model';
import { SEARCH_RESULTS_TEXT } from '../constants/trip-search.constants';

interface TripResultListProps {
  results: TripSearchResult[];
  isLoading: boolean;
  header?: ReactElement;
  onSelectTrip: (tripId: string) => void;
}

export function TripResultList({
  results,
  isLoading,
  header,
  onSelectTrip,
}: TripResultListProps): ReactElement {
  if (isLoading) {
    return <LoadingState message={SEARCH_RESULTS_TEXT.LOADING} />;
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.tripId}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <EmptyState
          title={SEARCH_RESULTS_TEXT.EMPTY_TITLE}
          description={SEARCH_RESULTS_TEXT.EMPTY_SUBTITLE}
        />
      }
      renderItem={({ item }) => (
        <TripResultCard result={item} onPress={() => onSelectTrip(item.tripId)} />
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
