import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
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

function getTodayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const initialFormData: TripSearchFormData = {
  originStopId: '',
  destinationStopId: '',
  date: getTodayString(),
  passengers: 1,
  normales: 1,
  adultosMayores: 0,
  identificaciones: [],
};

export function TripSearchScreen(): ReactElement {
  const navigation = useNavigation<TripSearchNavProp>();
  const { theme } = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();
  const isTablet = windowWidth >= 600;
  const styles = useMemo(() => makeStyles(theme, isTablet, windowWidth), [theme, isTablet, windowWidth]);
  const { stopOptions, isLoading, error, handleSearch } = useTripSearch();
  const [formData, setFormData] = useState<TripSearchFormData>(initialFormData);

  const handleChange = <K extends keyof TripSearchFormData>(
    field: K,
    value: TripSearchFormData[K]
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
     
      if (field === 'adultosMayores') {
        const newCount = (value as number) || 0;
        const current = updated.identificaciones || [];
        if (newCount > current.length) {
          updated.identificaciones = [...current, ...Array(newCount - current.length).fill('')];
        } else {
          updated.identificaciones = current.slice(0, newCount);
        }
      }
      
     
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
        <View style={styles.inner}>
          <Text style={styles.title}>{TRIP_SEARCH_TEXT.TITLE}</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TripSearchForm
            formData={formData}
            stopOptions={stopOptions}
            isLoading={isLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function makeStyles(theme: AppTheme, isTablet: boolean, windowWidth: number) {
  const horizontalPadding = isTablet ? Math.min(windowWidth * 0.12, 80) : 20;
  const maxContentWidth = 560;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flex: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      paddingTop: isTablet ? 40 : 52,
      paddingBottom: 40,
      alignItems: isTablet ? 'center' : undefined,
    },
    inner: {
      width: '100%',
      maxWidth: isTablet ? maxContentWidth : undefined,
      paddingHorizontal: horizontalPadding,
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
