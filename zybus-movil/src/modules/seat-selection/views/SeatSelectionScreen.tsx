import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import { AppSuccessModal, EmptyState, LoadingState } from '../../../shared/components';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { useSeatSelection } from '../hooks/useSeatSelection';
import { SeatMap } from '../components/SeatMap';
import { SeatLegend } from '../components/SeatLegend';
import { SeatSelectionSummary } from '../components/SeatSelectionSummary';
import { PassengerTypeModal } from '../components/PassengerTypeModal';
import { SEAT_SELECTION_TEXT } from '../constants/seat-selection.constants';
import type { PassengerType, Seat, SelectedSeat } from '../models/seat-selection.model';

type SeatSelectionNavProp = NativeStackNavigationProp<RootStackParamList, 'SeatSelection'>;
type SeatSelectionRouteProp = NativeStackScreenProps<RootStackParamList, 'SeatSelection'>['route'];

export function SeatSelectionScreen(): ReactElement {
  const navigation = useNavigation<SeatSelectionNavProp>();
  const route = useRoute<SeatSelectionRouteProp>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { tripId, passengers: initialPassengers } = route.params;
  const {
    seatMapData,
    selectedSeats,
    selectedSeatIds,
    isLoading,
    error,
    canConfirm,
    addSelectedSeat,
    removeSelectedSeat,
  } = useSeatSelection(tripId, 999);

  const [configuringSeat, setConfiguringSeat] = useState<Seat | null>(null);
  const [pendingConfirm, setPendingConfirm] = useState<SelectedSeat | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSeatPress = (seatId: string) => {
    if (selectedSeatIds.has(seatId)) {
      removeSelectedSeat(seatId);
      return;
    }
    const seat = seatMapData?.seats.find((s) => s.id === seatId);
    if (seat) setConfiguringSeat(seat);
  };

  const handlePassengerConfirm = (type: PassengerType, cedula?: string) => {
    if (!configuringSeat) return;
    const selection: SelectedSeat = {
      seatId: configuringSeat.id,
      seatCode: configuringSeat.seatCode,
      passengerType: type,
      cedula,
    };
    setPendingConfirm(selection);
    setConfiguringSeat(null);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    if (pendingConfirm) {
      addSelectedSeat(pendingConfirm);
      setPendingConfirm(null);
    }
  };

  const handleConfirm = () => {
    Alert.alert(
      'Asientos confirmados',
      `Asientos: ${selectedSeats.map((s: SelectedSeat) => s.seatCode).join(', ')}. ¡Listo para continuar!`,
      [{ text: 'OK', onPress: () => navigation.navigate('MainTabs') }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{SEAT_SELECTION_TEXT.TITLE}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <LoadingState message={SEAT_SELECTION_TEXT.LOADING} />
        </View>
      ) : error ? (
        <View style={styles.errorWrap}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : !seatMapData || seatMapData.seats.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            title={SEAT_SELECTION_TEXT.EMPTY_TITLE}
            description={SEAT_SELECTION_TEXT.EMPTY_SUBTITLE}
          />
        </View>
      ) : (
        <>
          {/* Selector de cantidad de pasajeros */}
          <SeatLegend />
          <View style={styles.mapWrapper}>
            <SeatMap
              seats={seatMapData.seats}
              columnsCount={seatMapData.columnsCount}
              selectedSeatIds={Array.from(selectedSeatIds)}
              onSeatPress={handleSeatPress}
            />
          </View>
          <SeatSelectionSummary
            selectedSeats={selectedSeats}
            maxPassengers={selectedSeats.length}
            canConfirm={selectedSeats.length > 0}
            onConfirm={handleConfirm}
          />
        </>
      )}

      <PassengerTypeModal
        seat={configuringSeat}
        onConfirm={handlePassengerConfirm}
        onCancel={() => setConfiguringSeat(null)}
      />

      <AppSuccessModal
        visible={showSuccess}
        title="¡Asiento reservado!"
        message={
          pendingConfirm
            ? pendingConfirm.passengerType === 'adulto_mayor'
              ? `Asiento ${pendingConfirm.seatCode} — Adulto mayor verificado`
              : `Asiento ${pendingConfirm.seatCode} — Pasajero normal`
            : ''
        }
        onClose={handleSuccessClose}
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 52,
      paddingBottom: 8,
      gap: 12,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      flex: 1,
      textAlign: 'center',
    },
    headerSpacer: {
      width: 36,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    mapWrapper: {
      flex: 1,
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
  });
}
