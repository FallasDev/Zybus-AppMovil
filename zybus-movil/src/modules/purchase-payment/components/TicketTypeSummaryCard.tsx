import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

interface TicketTypeSummaryCardProps {
  normalTickets: number;
  seniorTickets: number;
  ticketUnitPrice: number;
}

export function TicketTypeSummaryCard({
  normalTickets,
  seniorTickets,
  ticketUnitPrice,
}: TicketTypeSummaryCardProps): ReactElement {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Text style={[styles.cardTitle, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
        Tipo de boleto
      </Text>

      {normalTickets > 0 ? (
        <View style={[styles.ticketRow, { borderBottomColor: theme.colors.border }]}>
          <View>
            <Text style={[styles.value, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
              Boleto normal
            </Text>
            <Text style={[styles.label, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
              Cantidad: {normalTickets}
            </Text>
          </View>

          <Text style={[styles.price, { fontSize: theme.typography.md, color: theme.colors.brandBlue }]}>
            ₡{ticketUnitPrice}
          </Text>
        </View>
      ) : null}

      {seniorTickets > 0 ? (
        <View style={[styles.ticketRow, { borderBottomColor: theme.colors.border }]}>
          <View>
            <Text style={[styles.value, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
              Boleto adulto mayor
            </Text>
            <Text style={[styles.label, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
              Cantidad: {seniorTickets}
            </Text>
          </View>

          <Text style={[styles.price, { fontSize: theme.typography.md, color: theme.colors.brandBlue }]}>
            ₡{ticketUnitPrice}
          </Text>
        </View>
      ) : null}
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
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  value: {
    fontWeight: '600',
  },
  label: {
    marginTop: 3,
  },
  price: {
    fontWeight: '700',
  },
});