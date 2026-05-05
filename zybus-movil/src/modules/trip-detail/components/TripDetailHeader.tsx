import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TripDetail } from '../models/trip-detail.model';
import { TRIP_DETAIL_TEXT } from '../constants/trip-detail.constants';

interface TripDetailHeaderProps {
  detail: TripDetail;
}

const formatTime = (iso: string): string =>
  new Date(iso).toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit', hour12: false });

export function TripDetailHeader({ detail }: TripDetailHeaderProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <View style={styles.companyRow}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>{detail.company.name.charAt(0)}</Text>
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{detail.company.name}</Text>
          <Text style={styles.routeName}>{detail.route.name}</Text>
        </View>
        <View style={styles.stateBadge}>
          <Text style={styles.stateName}>{detail.stateName}</Text>
        </View>
      </View>

      <View style={styles.timeRow}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeValue}>{formatTime(detail.departureTime)}</Text>
          <Text style={styles.timeLabel}>Salida</Text>
        </View>
        <View style={styles.timeCenter}>
          <Text style={styles.duration}>
            {detail.route.durationMinutes}
            {TRIP_DETAIL_TEXT.MINUTES_SUFFIX}
          </Text>
          <View style={styles.durationLine} />
        </View>
        <View style={[styles.timeBlock, styles.timeBlockRight]}>
          <Text style={styles.timeValue}>{formatTime(detail.estimatedArrival)}</Text>
          <Text style={styles.timeLabel}>Llegada</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {detail.route.distanceKm}
            {TRIP_DETAIL_TEXT.KM_SUFFIX}
          </Text>
          <Text style={styles.statLabel}>{TRIP_DETAIL_TEXT.DISTANCE_LABEL}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {detail.bus.capacity}
            {TRIP_DETAIL_TEXT.SEATS_SUFFIX}
          </Text>
          <Text style={styles.statLabel}>{TRIP_DETAIL_TEXT.CAPACITY_LABEL}</Text>
        </View>
      </View>
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
    companyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
      gap: 10,
    },
    logoCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      color: theme.colors.white,
      fontWeight: '700',
      fontSize: 18,
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    routeName: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    stateBadge: {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    stateName: {
      fontSize: theme.typography.xs,
      color: theme.colors.success,
      fontWeight: '600',
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
    },
    timeBlock: {
      alignItems: 'flex-start',
    },
    timeBlockRight: {
      alignItems: 'flex-end',
    },
    timeValue: {
      fontSize: theme.typography.xl,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    timeLabel: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    timeCenter: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    duration: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    durationLine: {
      height: 1,
      width: '100%',
      backgroundColor: theme.colors.border,
    },
    statsRow: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: 14,
    },
    stat: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    statLabel: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.colors.border,
    },
  });
}
