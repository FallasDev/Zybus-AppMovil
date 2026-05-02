import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { Seat } from '../models/seat-selection.model';
import { SeatItem } from './SeatItem';

interface SeatMapProps {
  seats: Seat[];
  columnsCount: number;
  selectedSeatIds: string[];
  onSeatPress: (seatId: string) => void;
}

const COL_LABELS = ['A', 'B', 'C', 'D'];

export function SeatMap({
  seats,
  columnsCount,
  selectedSeatIds,
  onSeatPress,
}: SeatMapProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const rows = useMemo(() => {
    const sorted = [...seats].sort((a, b) => a.position - b.position);
    const grid: Seat[][] = [];
    sorted.forEach((seat) => {
      const rowIndex = Math.floor((seat.position - 1) / columnsCount);
      if (!grid[rowIndex]) grid[rowIndex] = [];
      grid[rowIndex].push(seat);
    });
    return grid;
  }, [seats, columnsCount]);

  const leftCols = Math.floor(columnsCount / 2);
  const leftLabels = COL_LABELS.slice(0, leftCols);
  const rightLabels = COL_LABELS.slice(leftCols, columnsCount);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.busShell}>
        {/* Cabecera conductor */}
        <View style={styles.driverRow}>
          <View style={styles.driverSeat}>
            <Ionicons name="person" size={14} color={theme.colors.white} />
          </View>
          <Text style={styles.driverLabel}>CONDUCTOR</Text>
          <View style={styles.driverSpacer} />
          <View style={styles.doorIcon}>
            <Ionicons name="exit-outline" size={18} color={theme.colors.textSecondary} />
          </View>
        </View>

        {/* Encabezados de columna */}
        <View style={styles.colHeaderRow}>
          <View style={styles.sideGroup}>
            {leftLabels.map((label) => (
              <View key={label} style={styles.colHeader}>
                <Text style={styles.colHeaderText}>{label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.aisleNumberSlot} />
          <View style={styles.sideGroup}>
            {rightLabels.map((label) => (
              <View key={label} style={styles.colHeader}>
                <Text style={styles.colHeaderText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Filas de asientos */}
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.seatRow}>
            <View style={styles.sideGroup}>
              {row.slice(0, leftCols).map((seat) => (
                <SeatItem
                  key={seat.id}
                  seat={seat}
                  isSelected={selectedSeatIds.includes(seat.id)}
                  onPress={() => onSeatPress(seat.id)}
                />
              ))}
            </View>

            <View style={styles.aisleNumberSlot}>
              <Text style={styles.rowNumber}>{rowIndex + 1}</Text>
            </View>

            <View style={styles.sideGroup}>
              {row.slice(leftCols).map((seat) => (
                <SeatItem
                  key={seat.id}
                  seat={seat}
                  isSelected={selectedSeatIds.includes(seat.id)}
                  onPress={() => onSeatPress(seat.id)}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    scrollContent: {
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    busShell: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 14,
      alignItems: 'center',
    },

    /* Conductor */
    driverRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 14,
      paddingHorizontal: 4,
    },
    driverSeat: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    driverLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      letterSpacing: 1,
    },
    driverSpacer: {
      flex: 1,
    },
    doorIcon: {
      width: 32,
      height: 44,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* Encabezados de columna */
    colHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    sideGroup: {
      flexDirection: 'row',
    },
    colHeader: {
      width: 50,
      alignItems: 'center',
    },
    colHeaderText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      letterSpacing: 0.5,
    },

    /* Filas */
    seatRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    aisleNumberSlot: {
      width: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowNumber: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
  });
}
