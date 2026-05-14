import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

interface TicketDetailsCardProps {
  date: string;
  time: string;
  seatNumber: string;
}

export function TicketDetailsCard({
  date,
  time,
  seatNumber,
}: TicketDetailsCardProps): ReactElement {
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
        Detalles del boleto
      </Text>

      <View style={styles.infoRow}>
        <Text
          style={[
            styles.label,
            {
              fontSize: theme.typography.sm,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Fecha
        </Text>

        <Text
          style={[
            styles.value,
            {
              fontSize: theme.typography.md,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          {date}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text
          style={[
            styles.label,
            {
              fontSize: theme.typography.sm,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Hora
        </Text>

        <Text
          style={[
            styles.value,
            {
              fontSize: theme.typography.md,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          {time}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text
          style={[
            styles.label,
            {
              fontSize: theme.typography.sm,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Asiento(s)
        </Text>

        <Text
          style={[
            styles.value,
            {
              fontSize: theme.typography.md,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          {seatNumber}
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
  infoRow: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 3,
  },
  value: {
    fontWeight: '700',
  },
});