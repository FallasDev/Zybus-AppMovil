import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TrackingStop } from '../models/tracking.model';
import { TRACKING_TEXT } from '../constants/tracking.constants';

interface TripStatusBarProps {
  stateName: string;
  etaMinutes: number | null;
  nextStop: TrackingStop | null;
}

function stateColor(stateName: string, theme: AppTheme): string {
  if (stateName === 'Demorado') return '#F59E0B';
  if (stateName === 'Completado') return theme.colors.success;
  return theme.colors.brandBlue;
}

export function TripStatusBar({ stateName, etaMinutes, nextStop }: TripStatusBarProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const badgeColor = stateColor(stateName, theme);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: badgeColor + '22' }]}>
          <View style={[styles.dot, { backgroundColor: badgeColor }]} />
          <Text style={[styles.badgeText, { color: badgeColor }]}>{stateName}</Text>
        </View>

        {etaMinutes !== null && (
          <View style={styles.eta}>
            <Text style={styles.etaLabel}>{TRACKING_TEXT.ETA_LABEL}</Text>
            <Text style={styles.etaValue}>
              ~{etaMinutes} {TRACKING_TEXT.ETA_MINUTES}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.nextStopRow}>
        <Text style={styles.nextStopLabel}>{TRACKING_TEXT.NEXT_STOP_LABEL}</Text>
        <Text style={styles.nextStopName} numberOfLines={1}>
          {nextStop?.name ?? TRACKING_TEXT.NO_NEXT_STOP}
        </Text>
      </View>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 10,
      gap: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    badgeText: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
    },
    eta: {
      alignItems: 'flex-end',
    },
    etaLabel: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
    },
    etaValue: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    nextStopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    nextStopLabel: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },
    nextStopName: {
      flex: 1,
      fontSize: theme.typography.sm,
      fontWeight: '600',
      color: theme.colors.brandBlue,
    },
  });
}
