import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

interface PaymentStatusCardProps {
  totalPaid: number;
}

export function PaymentStatusCard({
  totalPaid,
}: PaymentStatusCardProps): ReactElement {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          {
            fontSize: theme.typography.md,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        Pago
      </Text>

      <View style={styles.paymentRow}>
        <Text
          style={[
            styles.label,
            {
              fontSize: theme.typography.sm,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Total pagado
        </Text>

        <Text
          style={[
            styles.total,
            {
              fontSize: theme.typography.lg,
              color: theme.colors.brandBlue,
            },
          ]}
        >
          ₡{totalPaid}
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: theme.colors.inputBackground,
          },
        ]}
      >
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={theme.colors.success}
        />

        <Text
          style={[
            styles.statusText,
            {
              fontSize: theme.typography.sm,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          Pago aprobado
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
    marginBottom: 14,
  },
  label: {
    marginBottom: 3,
  },
  total: {
    fontWeight: '800',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
  },
  statusText: {
    fontWeight: '700',
  },
});