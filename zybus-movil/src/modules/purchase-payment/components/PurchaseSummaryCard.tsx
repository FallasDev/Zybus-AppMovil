import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { PurchasePaymentFormData } from '../models/purchase-payment.model';

type PurchaseSummaryCardProps = {
  purchaseData: PurchasePaymentFormData;
};

export function PurchaseSummaryCard({
  purchaseData,
}: PurchaseSummaryCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const departurePoint =
    purchaseData.departurePoint ?? purchaseData.route.split(' - ')[0] ?? 'Salida pendiente';

  const arrivalPoint =
    purchaseData.arrivalPoint ?? purchaseData.route.split(' - ')[1] ?? 'Llegada pendiente';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Viaje</Text>
      <Text style={styles.value}>{purchaseData.title}</Text>

      <Text style={styles.label}>Ruta</Text>
      <Text style={styles.value}>
        {departurePoint} → {arrivalPoint}
      </Text>

      <Text style={styles.label}>Fecha y hora</Text>
      <Text style={styles.value}>
        {purchaseData.date ?? 'Fecha pendiente'} -{' '}
        {purchaseData.departureTime ?? 'Hora pendiente'}
      </Text>

      <Text style={styles.label}>Asiento(s)</Text>
      <Text style={styles.value}>{purchaseData.seatNumber}</Text>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>₡{purchaseData.total}</Text>
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