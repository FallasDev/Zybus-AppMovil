import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

interface PaymentSummaryCardProps {
  ticketUnitPrice: number;
  ticketQuantity: number;
  total: number;
}

export function PaymentSummaryCard({
  ticketUnitPrice,
  ticketQuantity,
  total,
}: PaymentSummaryCardProps): ReactElement {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Text style={[styles.cardTitle, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
        Resumen de pago
      </Text>

      <View style={styles.paymentRow}>
        <Text style={[styles.label, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
          Precio unitario por boleto
        </Text>

        <Text style={[styles.value, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
          ₡{ticketUnitPrice}
        </Text>
      </View>

      <View style={styles.paymentRow}>
        <Text style={[styles.label, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
          Cantidad total
        </Text>

        <Text style={[styles.value, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
          {ticketQuantity}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <View style={styles.paymentRow}>
        <Text style={[styles.totalLabel, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
          Total a pagar
        </Text>

        <Text style={[styles.totalPrice, { fontSize: theme.typography.xl, color: theme.colors.brandBlue }]}>
          ₡{total}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  label: {
    marginBottom: 3,
  },
  value: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 6,
  },
  totalLabel: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  totalPrice: {
    fontWeight: '800',
  },
});