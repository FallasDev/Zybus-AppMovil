import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { SelectedSeat } from '../models/seat-selection.model';

interface SeatSelectionSummaryProps {
  selectedSeats: SelectedSeat[];
  maxPassengers: number;
  canConfirm: boolean;
  onConfirm: () => void;
}

export function SeatSelectionSummary({
  selectedSeats,
  maxPassengers,
  canConfirm,
  onConfirm,
}: SeatSelectionSummaryProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {selectedSeats.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.seatsList}
          contentContainerStyle={styles.seatsListContent}
        >
          {selectedSeats.map((s) => (
            <View key={s.seatId} style={styles.seatChip}>
              <Text style={styles.seatChipCode}>{s.seatCode}</Text>
              <Text style={styles.seatChipType}>
                {s.passengerType === 'adulto_mayor' ? 'A. Mayor' : 'Normal'}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <View style={styles.countWrap}>
          <Text style={styles.countText}>
            {selectedSeats.length}/{maxPassengers}
          </Text>
          <Text style={styles.countLabel}>asientos</Text>
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, !canConfirm && styles.confirmBtnDisabled]}
          onPress={onConfirm}
          disabled={!canConfirm}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={18} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: 12,
      paddingBottom: 30,
      gap: 12,
    },
    seatsList: {
      maxHeight: 64,
    },
    seatsListContent: {
      paddingHorizontal: 16,
      gap: 8,
      alignItems: 'center',
    },
    seatChip: {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignItems: 'center',
      minWidth: 60,
    },
    seatChipCode: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    seatChipType: {
      fontSize: 10,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 12,
    },
    countWrap: {
      alignItems: 'center',
    },
    countText: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    countLabel: {
      fontSize: 10,
      color: theme.colors.textSecondary,
    },
    confirmBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      paddingVertical: 16,
      gap: 8,
    },
    confirmBtnDisabled: {
      opacity: 0.45,
    },
    confirmBtnText: {
      color: theme.colors.white,
      fontSize: theme.typography.md,
      fontWeight: '700',
    },
  });
}
