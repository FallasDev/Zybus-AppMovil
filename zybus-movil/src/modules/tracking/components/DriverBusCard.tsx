import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TrackingDriver, TrackingBus } from '../models/tracking.model';
import { TRACKING_TEXT } from '../constants/tracking.constants';

interface DriverBusCardProps {
  driver: TrackingDriver;
  bus: TrackingBus;
}

export function DriverBusCard({ driver, bus }: DriverBusCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-circle-outline" size={26} color={theme.colors.brandBlue} />
        </View>
        <Text style={styles.label}>{TRACKING_TEXT.DRIVER_SECTION}</Text>
        <Text style={styles.value} numberOfLines={2}>{driver.name}</Text>
        <Text style={styles.sub}>
          {TRACKING_TEXT.LICENSE_LABEL}: {driver.licenseNumber}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="bus-outline" size={24} color={theme.colors.brandBlue} />
        </View>
        <Text style={styles.label}>{TRACKING_TEXT.BUS_SECTION}</Text>
        <Text style={styles.value} numberOfLines={2}>{bus.model}</Text>
        <Text style={styles.sub}>
          {TRACKING_TEXT.PLATE_LABEL}: {bus.licensePlate}
        </Text>
        <Text style={styles.sub}>{bus.typeName}</Text>
      </View>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 10,
    },
    card: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 14,
      gap: 4,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.brandBlue + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
    },
    label: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    value: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    sub: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
    },
  });
}
