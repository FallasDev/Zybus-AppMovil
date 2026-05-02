import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { nearbyStops } from '../constants/home.mock';
import { BusStopCard } from '../components/BusStopCard';
import { useTripSearch } from '../../trip-search/hooks/useTripSearch';
import { TripSearchForm } from '../../trip-search/components/TripSearchForm';
import type { TripSearchFormData } from '../../trip-search/models/trip-search.model';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const initialFormData: TripSearchFormData = {
  originStopId: '',
  destinationStopId: '',
  date: '',
  passengers: 1,
};

export function HomeScreen(): ReactElement {
  const navigation = useNavigation<HomeNavigationProp>();
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.smallText}>Hola,</Text>
          <Text style={styles.title}>¿A dónde vas hoy?</Text>
        </View>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>D</Text>
        </View>
      </View>

      <View style={styles.searchSection}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TripSearchForm
          formData={formData}
          stopOptions={stopOptions}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Paradas Cercanas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BusRoute')}>
          <Text style={styles.viewAll}>Ver ruta</Text>
        </TouchableOpacity>
      </View>

      {nearbyStops.map((stop) => (
        <BusStopCard
          key={stop.id}
          name={stop.name}
          distance={stop.distance}
          route={stop.route}
          onPress={() => navigation.navigate('BusRoute')}
        />
      ))}
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
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    smallText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    profileCircle: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
    searchSection: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 16,
      marginBottom: 24,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    error: {
      backgroundColor: theme.colors.errorSurface,
      color: theme.colors.error,
      borderRadius: 10,
      padding: 12,
      marginBottom: 8,
      fontSize: 13,
    },
    sectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    viewAll: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.brandBlue,
    },
  });
}
