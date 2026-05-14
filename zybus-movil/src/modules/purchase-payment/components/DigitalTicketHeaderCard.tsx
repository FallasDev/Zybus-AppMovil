import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

interface DigitalTicketHeaderCardProps {
  confirmationNumber: string;
}

export function DigitalTicketHeaderCard({
  confirmationNumber,
}: DigitalTicketHeaderCardProps): ReactElement {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.ticketHeaderCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.brand,
          {
            fontSize: theme.typography.xl,
            color: theme.colors.brandBlue,
          },
        ]}
      >
        ZYBUS
      </Text>

      <View
        style={[
          styles.qrBox,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.qrText,
            {
              fontSize: theme.typography.xl,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          QR
        </Text>
      </View>

      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.sm,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        Número de confirmación
      </Text>

      <Text
        style={[
          styles.confirmation,
          {
            fontSize: theme.typography.md,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        {confirmationNumber}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ticketHeaderCard: {
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  brand: {
    fontWeight: '800',
    marginBottom: 18,
    letterSpacing: 1,
  },
  qrBox: {
    width: 160,
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrText: {
    fontWeight: '800',
  },
  label: {
    marginBottom: 3,
  },
  confirmation: {
    fontWeight: '800',
    marginTop: 4,
  },
});