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
  normales: 1,
  adultosMayores: 0,
  identificaciones: [],
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
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Si adultosMayores cambió, ajustar el array de identificaciones
      if (field === 'adultosMayores') {
        const newCount = (value as number) || 0;
        const current = updated.identificaciones || [];
        if (newCount > current.length) {
          updated.identificaciones = [...current, ...Array(newCount - current.length).fill('')];
        } else {
          updated.identificaciones = current.slice(0, newCount);
        }
      }
      
      // Mantener passengers sincronizado con normales + adultosMayores
      if (field === 'normales' || field === 'adultosMayores') {
        updated.passengers = (updated.normales || 0) + (updated.adultosMayores || 0);
      }
      
      return updated;
    });
  };

  const handleSubmit = async () => {
    const success = await handleSearch(formData);
    if (success) {
      const totalPassengers = formData.normales + formData.adultosMayores;
      navigation.navigate('SearchResults', {
        originStopId: formData.originStopId,
        destinationStopId: formData.destinationStopId,
        date: formData.date,
        passengers: totalPassengers,
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
