import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { useTripSearchStore } from '../store/trip-search.store';
import { TripResultList } from '../components/TripResultList';
import { SEARCH_RESULTS_TEXT } from '../constants/trip-search.constants';

type SearchResultsNavProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;
type SearchResultsRouteProp = NativeStackScreenProps<RootStackParamList, 'SearchResults'>['route'];

export function SearchResultsScreen(): ReactElement {
  const navigation = useNavigation<SearchResultsNavProp>();
  const route = useRoute<SearchResultsRouteProp>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { results, isLoading } = useTripSearchStore();

  const { passengers } = route.params;

  const header = (
    <View style={styles.headerCard}>
      <Text style={styles.title}>{SEARCH_RESULTS_TEXT.TITLE}</Text>
      <Text style={styles.subtitle}>
        {results.length} viaje{results.length !== 1 ? 's' : ''} encontrado
        {results.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹ Volver</Text>
      </TouchableOpacity>
      <TripResultList
        results={results}
        isLoading={isLoading}
        header={header}
        onSelectTrip={(tripId) => navigation.navigate('TripDetail', { tripId, passengers })}
      />
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backBtn: {
      paddingHorizontal: 20,
      paddingTop: 52,
      paddingBottom: 4,
    },
    backText: {
      fontSize: theme.typography.md,
      color: theme.colors.brandBlue,
      fontWeight: '600',
    },
    headerCard: {
      marginBottom: 12,
    },
    title: {
      fontSize: theme.typography.xl,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },
  });
}
