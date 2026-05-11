import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TrackingStop } from '../models/tracking.model';
import { TRACKING_TEXT } from '../constants/tracking.constants';

interface StopProgressTimelineProps {
  stops: TrackingStop[];
}

function PulsingDot({ color }: { color: string }): ReactElement {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.4, duration: 700, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [scale]);

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: color, borderColor: color, transform: [{ scale }] },
      ]}
    />
  );
}

export function StopProgressTimeline({ stops }: StopProgressTimelineProps): ReactElement {
  const { theme } = useAppTheme();
  const styles2 = useMemo(() => makeStyles(theme), [theme]);

  const sorted = [...stops].sort((a, b) => a.sortOrder - b.sortOrder);
  const currentIndex = sorted.findIndex((s) => !s.isCompleted);

  return (
    <View style={styles2.card}>
      <Text style={styles2.sectionTitle}>{TRACKING_TEXT.STOPS_SECTION}</Text>
      {sorted.map((stop, index) => {
        const isCompleted = stop.isCompleted;
        const isCurrent = index === currentIndex;
        const isLast = index === sorted.length - 1;

        return (
          <View key={stop.id} style={styles2.stopRow}>
            <View style={styles2.lineColumn}>
              {isCurrent ? (
                <PulsingDot color={theme.colors.brandBlue} />
              ) : (
                <View
                  style={[
                    styles2.dot,
                    isCompleted
                      ? { backgroundColor: theme.colors.brandBlue, borderColor: theme.colors.brandBlue }
                      : { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                  ]}
                />
              )}
              {!isLast && (
                <View
                  style={[
                    styles2.line,
                    isCompleted && { backgroundColor: theme.colors.brandBlue },
                  ]}
                />
              )}
            </View>
            <View style={styles2.stopInfo}>
              <Text
                style={[
                  styles2.stopName,
                  isCompleted && styles2.completedName,
                  isCurrent && { color: theme.colors.brandBlue, fontWeight: '700' },
                ]}
              >
                {stop.name}
              </Text>
              {isCompleted && !isCurrent && (
                <Text style={styles2.completedLabel}>Completada</Text>
              )}
              {isCurrent && (
                <Text style={[styles2.completedLabel, { color: theme.colors.brandBlue }]}>
                  Próxima parada
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginTop: 3,
  },
});

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },
    stopRow: {
      flexDirection: 'row',
      minHeight: 48,
    },
    lineColumn: {
      width: 26,
      alignItems: 'center',
    },
    dot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 2,
      marginTop: 3,
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
      paddingLeft: 10,
      paddingBottom: 14,
    },
    stopName: {
      fontSize: theme.typography.sm,
      color: theme.colors.textPrimary,
    },
    completedName: {
      color: theme.colors.textSecondary,
    },
    completedLabel: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
  });
}
