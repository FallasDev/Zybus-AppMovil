import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { useTripSearch } from '../hooks/useTripSearch';
import { TripSearchForm } from '../components/TripSearchForm';
import type { TripSearchFormData } from '../models/trip-search.model';
import { TRIP_SEARCH_TEXT } from '../constants/trip-search.constants';

type TripSearchNavProp = NativeStackNavigationProp<RootStackParamList, 'TripSearch'>;

const initialFormData: TripSearchFormData = {
  originStopId: '',
  destinationStopId: '',
  date: '',
  passengers: 1,
};

export function TripSearchScreen(): ReactElement {
  const navigation = useNavigation<TripSearchNavProp>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { stopOptions, isLoading, error, handleSearch } = useTripSearch();
  const [formData, setFormData] = useState<TripSearchFormData>(initialFormData);

  const handleChange = <K extends keyof TripSearchFormData>(
    field: K,
    value: TripSearchFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const success = await handleSearch(formData);
    if (success) {
      navigation.navigate('SearchResults', {
        originStopId: formData.originStopId,
        destinationStopId: formData.destinationStopId,
        date: formData.date,
        passengers: formData.passengers,
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{TRIP_SEARCH_TEXT.TITLE}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TripSearchForm
        formData={formData}
        stopOptions={stopOptions}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </ScrollView>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 20,
      paddingTop: 52,
      paddingBottom: 40,
    },
    title: {
      fontSize: theme.typography.xxl,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    error: {
      backgroundColor: theme.colors.errorSurface,
      color: theme.colors.error,
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      fontSize: theme.typography.sm,
    },
  });
}
