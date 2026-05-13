import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TripStop } from '../models/trip-detail.model';
import { TRIP_DETAIL_TEXT } from '../constants/trip-detail.constants';

interface TripStopsTimelineProps {
  stops: TripStop[];
}

export function TripStopsTimeline({ stops }: TripStopsTimelineProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const sorted = [...stops].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{TRIP_DETAIL_TEXT.STOPS_SECTION}</Text>
      {sorted.map((stop, index) => {
        const isFirst = index === 0;
        const isLast = index === sorted.length - 1;
        return (
          <View key={stop.id} style={styles.stopRow}>
            <View style={styles.lineColumn}>
              <View style={[styles.dot, (isFirst || isLast) && styles.dotAccent]} />
              {!isLast && <View style={styles.line} />}
            </View>
            <View style={styles.stopInfo}>
              <Text style={[styles.stopName, (isFirst || isLast) && styles.stopNameAccent]}>
                {stop.name}
              </Text>
            </View>
          </View>
        );
      })}
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
      marginBottom: 16,
    },
    stopRow: {
      flexDirection: 'row',
      minHeight: 44,
    },
    lineColumn: {
      width: 24,
      alignItems: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.colors.border,
      marginTop: 4,
    },
    dotAccent: {
      backgroundColor: theme.colors.brandBlue,
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    line: {
      flex: 1,
      width: 2,
      backgroundColor: theme.colors.border,
      marginTop: 2,
      marginBottom: 2,
    },
    stopInfo: {
      flex: 1,
      paddingLeft: 12,
      paddingBottom: 16,
    },
    stopName: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },
    stopNameAccent: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
  });
}
