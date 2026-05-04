import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TripBus } from '../models/trip-detail.model';
import { TRIP_DETAIL_TEXT } from '../constants/trip-detail.constants';

interface TripBusInfoProps {
  bus: TripBus;
}

export function TripBusInfo({ bus }: TripBusInfoProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const items = [
    { label: 'Modelo', value: bus.model },
    { label: 'Placa', value: bus.licensePlate },
    { label: 'Tipo', value: bus.typeName },
    { label: TRIP_DETAIL_TEXT.CAPACITY_LABEL, value: `${bus.capacity}${TRIP_DETAIL_TEXT.SEATS_SUFFIX}` },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{TRIP_DETAIL_TEXT.BUS_SECTION}</Text>
      {items.map((item, index) => (
        <View
          key={item.label}
          style={[styles.row, index < items.length - 1 && styles.rowBorder]}
        >
          <Text style={styles.itemLabel}>{item.label}</Text>
          <Text style={styles.itemValue}>{item.value}</Text>
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
      alignItems: 'center',
      paddingVertical: 12,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    itemLabel: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },
    itemValue: {
      fontSize: theme.typography.sm,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
  });
}
