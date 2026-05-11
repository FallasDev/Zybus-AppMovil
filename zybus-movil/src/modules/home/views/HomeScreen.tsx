import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ActiveTripCard } from '../components/ActiveTripCard';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { images } from '../../../shared/assets/images';
import { nearbyStops } from '../constants/home.mock';
import { BusStopCard } from '../components/BusStopCard';
import { useTripSearch } from '../../trip-search/hooks/useTripSearch';
import { TripSearchForm } from '../../trip-search/components/TripSearchForm';
import type { TripSearchFormData } from '../../trip-search/models/trip-search.model';
import { useUnreadCount } from '../../notifications/store/notifications.store';

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
  const unreadCount = useUnreadCount();

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
      {/* Header: logo izquierda | campana + perfil derecha */}
      <View style={styles.headerBar}>
        <Image source={images.zybusLogo} style={styles.logo} resizeMode="contain" />

        <View style={styles.headerActions}>
          {/* Campana con badge */}
          <TouchableOpacity
            style={styles.bellWrap}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.75}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.colors.textPrimary}
            />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Círculo de perfil */}
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>DS</Text>
          </View>
        </View>
      </View>

      {/* Saludo */}
      <Text style={styles.greeting}>¿A dónde vas hoy?</Text>

      {/* Viaje activo (mock) */}
      <ActiveTripCard
        tripId="t_1"
        routeName="San José – Alajuela Expreso"
        etaMinutes={35}
        onPress={() => navigation.navigate('TripTracking', { tripId: 't_1' })}
      />

      {/* Formulario de búsqueda */}
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

      {/* Paradas cercanas */}
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

    /* Header bar */
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18,
    },
    logo: {
      width: 100,
      height: 36,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    /* Campana con badge */
    bellWrap: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      position: 'absolute',
      top: 4,
      right: 4,
      minWidth: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.error,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 3,
    },
    badgeText: {
      color: theme.colors.white,
      fontSize: 9,
      fontWeight: '700',
    },

    /* Perfil */
    profileCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileText: {
      color: theme.colors.white,
      fontSize: 13,
      fontWeight: '700',
    },

    greeting: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 16,
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
