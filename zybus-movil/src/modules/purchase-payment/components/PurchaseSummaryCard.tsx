import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { PurchaseData } from '../models/purchase-payment.model';

type PurchaseSummaryCardProps = {
  purchaseData: PurchaseData;
};

export function PurchaseSummaryCard({ purchaseData }: PurchaseSummaryCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Pasajero</Text>
      <Text style={styles.value}>{purchaseData.passengerName}</Text>

      <Text style={styles.label}>Identificación</Text>
      <Text style={styles.value}>{purchaseData.passengerId}</Text>

      <Text style={styles.label}>Ruta</Text>
      <Text style={styles.value}>
        {purchaseData.origin} → {purchaseData.destination}
      </Text>

      <Text style={styles.label}>Fecha y hora</Text>
      <Text style={styles.value}>
        {purchaseData.date} - {purchaseData.time}
      </Text>

      <Text style={styles.label}>Asiento</Text>
      <Text style={styles.value}>{purchaseData.seat}</Text>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>₡{purchaseData.finalPrice}</Text>
      </View>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 20,
      marginBottom: 24,
    },
    label: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginTop: 12,
    },
    value: {
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
      fontWeight: '600',
      marginTop: 2,
    },
    totalBox: {
      marginTop: 24,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    totalLabel: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },
    total: {
      fontSize: theme.typography.xl,
      color: theme.colors.brandBlue,
      fontWeight: '700',
      marginTop: 4,
    },
  });
}