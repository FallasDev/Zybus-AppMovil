import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface SeatSelectionSummaryProps {
  selectedSeatCodes: string[];
  maxPassengers: number;
  canConfirm: boolean;
  onConfirm: () => void;
}

export function SeatSelectionSummary({
  selectedSeatCodes,
  maxPassengers,
  canConfirm,
  onConfirm,
}: SeatSelectionSummaryProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const seatLabel = selectedSeatCodes.length > 0 ? selectedSeatCodes.join(', ') : '—';

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.infoLabel}>ASIENTO</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {seatLabel}
          </Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {selectedSeatCodes.length}/{maxPassengers}
          </Text>
        </View>
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
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingHorizontal: 20,
      paddingTop: 14,
      paddingBottom: 30,
      gap: 14,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      letterSpacing: 1,
      marginBottom: 2,
    },
    infoValue: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      maxWidth: 220,
    },
    countBadge: {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    countText: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.textSecondary,
    },
    confirmBtn: {
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
