import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import { EmptyState, LoadingState } from '../../../shared/components';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { useSeatSelection } from '../hooks/useSeatSelection';
import { SeatMap } from '../components/SeatMap';
import { SeatLegend } from '../components/SeatLegend';
import { SeatSelectionSummary } from '../components/SeatSelectionSummary';
import { SEAT_SELECTION_TEXT } from '../constants/seat-selection.constants';

type SeatSelectionNavProp = NativeStackNavigationProp<RootStackParamList, 'SeatSelection'>;
type SeatSelectionRouteProp = NativeStackScreenProps<RootStackParamList, 'SeatSelection'>['route'];

export function SeatSelectionScreen(): ReactElement {
  const navigation = useNavigation<SeatSelectionNavProp>();
  const route = useRoute<SeatSelectionRouteProp>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { tripId, passengers } = route.params;
  const { seatMapData, selectedSeatIds, isLoading, error, canConfirm, toggleSeat } =
    useSeatSelection(tripId, passengers);

  const selectedIdSet = useMemo(() => new Set(selectedSeatIds), [selectedSeatIds]);
  const selectedSeatCodes = useMemo(
    () =>
      seatMapData?.seats
        .filter((s) => selectedIdSet.has(s.id))
        .sort((a, b) => a.position - b.position)
        .map((s) => s.seatCode) ?? [],
    [seatMapData, selectedIdSet]
  );

  const handleConfirm = () => {
    Alert.alert(
      'Asientos confirmados',
      `Asientos seleccionados: ${selectedSeatCodes.join(', ')}. ¡Listo para continuar!`,
      [{ text: 'OK', onPress: () => navigation.navigate('MainTabs') }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
          {/* Leyenda */}
          <SeatLegend />

          {/* Mapa */}
          <View style={styles.mapWrapper}>
            <SeatMap
              seats={seatMapData.seats}
              columnsCount={seatMapData.columnsCount}
              selectedSeatIds={selectedSeatIds}
              onSeatPress={toggleSeat}
            />
          </View>

          {/* Footer */}
          <SeatSelectionSummary
            selectedSeatCodes={selectedSeatCodes}
            maxPassengers={passengers}
            canConfirm={canConfirm}
            onConfirm={handleConfirm}
          />
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
