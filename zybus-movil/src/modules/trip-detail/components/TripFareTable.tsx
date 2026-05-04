import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TripFare } from '../models/trip-detail.model';
import { TRIP_DETAIL_TEXT } from '../constants/trip-detail.constants';

interface TripFareTableProps {
  fares: TripFare[];
}

export function TripFareTable({ fares }: TripFareTableProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{TRIP_DETAIL_TEXT.FARES_SECTION}</Text>
      {fares.map((fare, index) => (
        <View
          key={fare.fareTypeId}
          style={[styles.row, index < fares.length - 1 && styles.rowBorder]}
        >
          <Text style={styles.fareType}>{fare.fareTypeName}</Text>
          <Text style={styles.farePrice}>
            {TRIP_DETAIL_TEXT.PRICE_CURRENCY}
            {fare.price.toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 18,
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    fareType: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },
    farePrice: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
  });
}
