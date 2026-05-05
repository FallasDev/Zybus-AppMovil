import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import { LoadingState, EmptyState } from '../../../shared/components';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { useTripDetail } from '../hooks/useTripDetail';
import { TripDetailHeader } from '../components/TripDetailHeader';
import { TripStopsTimeline } from '../components/TripStopsTimeline';
import { TripFareTable } from '../components/TripFareTable';
import { TripBusInfo } from '../components/TripBusInfo';
import { TRIP_DETAIL_TEXT } from '../constants/trip-detail.constants';

type TripDetailNavProp = NativeStackNavigationProp<RootStackParamList, 'TripDetail'>;
type TripDetailRouteProp = NativeStackScreenProps<RootStackParamList, 'TripDetail'>['route'];

export function TripDetailScreen(): ReactElement {
  const navigation = useNavigation<TripDetailNavProp>();
  const route = useRoute<TripDetailRouteProp>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { tripId, passengers: initialPassengers } = route.params;
  const [passengerCount] = useState(initialPassengers || 1);
  const { tripDetail, isLoading, error } = useTripDetail(tripId);

  const handleContinue = () => {
    if (!tripDetail) return;
    if (tripDetail.bus.usesSeats) {
      navigation.navigate('SeatSelection', { tripId, passengers: passengerCount });
    } else {
      Alert.alert(
        'Sin selección de asiento',
        'Este servicio no asigna asientos. Tu lugar es de primera llegada.',
        [{ text: 'Entendido' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹ Volver</Text>
      </TouchableOpacity>

      {isLoading ? (
        <LoadingState message={TRIP_DETAIL_TEXT.LOADING} />
      ) : error ? (
        <View style={styles.errorWrap}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : !tripDetail ? (
        <EmptyState title="Sin información" description="No se pudo cargar el viaje." />
      ) : (
        <>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>{TRIP_DETAIL_TEXT.TITLE}</Text>
            <TripDetailHeader detail={tripDetail} />
            <TripStopsTimeline stops={tripDetail.stops} />
            <TripFareTable fares={tripDetail.fares} />
            <TripBusInfo bus={tripDetail.bus} />

           

            <View style={styles.bottomSpacer} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.selectBtnText}>
                {tripDetail.bus.usesSeats
                  ? TRIP_DETAIL_TEXT.SELECT_SEATS_BUTTON
                  : TRIP_DETAIL_TEXT.CONFIRM_TRIP_BUTTON}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
    },
    title: {
      fontSize: theme.typography.xl,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },
    bottomSpacer: {
      height: 20,
    },
    footer: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      padding: 16,
      paddingBottom: 28,
    },
    selectBtn: {
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
    },
    selectBtnText: {
      color: theme.colors.white,
      fontSize: theme.typography.md,
      fontWeight: '700',
    },
    errorWrap: {
      margin: 20,
      padding: 16,
      backgroundColor: theme.colors.errorSurface,
      borderRadius: 12,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.sm,
    },
    passengerSelector: {
      marginTop: 20,
      padding: 16,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    passengerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    passengerLabel: {
      fontSize: theme.typography.md,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    passengerCounter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    counterBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterValue: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      minWidth: 30,
      textAlign: 'center',
    },
  });
}
