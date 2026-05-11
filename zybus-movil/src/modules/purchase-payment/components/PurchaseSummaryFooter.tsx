import type { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

interface PurchaseSummaryFooterProps {
  total: number;
  onPress: () => void;
}

export function PurchaseSummaryFooter({
  total,
  onPress,
}: PurchaseSummaryFooterProps): ReactElement {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      ]}
    >
      <View>
        <Text style={[styles.totalLabel, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
          Total
        </Text>

        <Text style={[styles.footerTotal, { fontSize: theme.typography.lg, color: theme.colors.textPrimary }]}>
          ₡{total}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.payButton, { backgroundColor: theme.colors.brandBlue }]}
        onPress={onPress}
      >
        <Text style={[styles.payButtonText, { fontSize: theme.typography.md, color: theme.colors.white }]}>
          Continuar al pago
        </Text>

        <Ionicons name="arrow-forward" size={18} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    padding: 16,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  totalLabel: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footerTotal: {
    fontWeight: '800',
  },
  payButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  payButtonText: {
    fontWeight: '700',
  },
});