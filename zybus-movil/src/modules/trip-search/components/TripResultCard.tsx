import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TripSearchResult } from '../models/trip-search.model';
import { SEARCH_RESULTS_TEXT } from '../constants/trip-search.constants';

interface TripResultCardProps {
  result: TripSearchResult;
  onPress: () => void;
}

const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export function TripResultCard({ result, onPress }: TripResultCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>{result.companyName.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>{result.companyName}</Text>
          <Text style={styles.routeName} numberOfLines={1}>
            {result.routeName}
          </Text>
        </View>
        <View style={styles.priceWrap}>
          <Text style={styles.priceLabel}>{SEARCH_RESULTS_TEXT.PRICE_FROM}</Text>
          <Text style={styles.price}>{result.priceFrom.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.timeRow}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeValue}>{formatTime(result.departureTime)}</Text>
          <Text style={styles.timeLabel}>Salida</Text>
        </View>
        <View style={styles.timeDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerArrow}>›</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.timeBlock}>
          <Text style={styles.timeValue}>{formatTime(result.estimatedArrival)}</Text>
          <Text style={styles.timeLabel}>Llegada</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View
          style={[
            styles.seatsBadge,
            result.availableSeats <= 5 && styles.seatsBadgeLow,
          ]}
        >
          <Text style={styles.seatsText}>
            {result.availableSeats} {SEARCH_RESULTS_TEXT.SEATS_AVAILABLE}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    cardPressed: {
      opacity: 0.85,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      gap: 10,
    },
    logoPlaceholder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      color: theme.colors.white,
      fontWeight: '700',
      fontSize: 16,
    },
    headerInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.brandBlue,
    },
    routeName: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    priceWrap: {
      alignItems: 'flex-end',
    },
    priceLabel: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
    },
    price: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    timeBlock: {
      alignItems: 'center',
    },
    timeValue: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    timeLabel: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    timeDivider: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerArrow: {
      fontSize: 18,
      color: theme.colors.textSecondary,
      marginHorizontal: 4,
    },
    footer: {
      flexDirection: 'row',
    },
    seatsBadge: {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    seatsBadgeLow: {
      backgroundColor: theme.colors.errorSurface,
    },
    seatsText: {
      fontSize: theme.typography.xs,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
  });
}
