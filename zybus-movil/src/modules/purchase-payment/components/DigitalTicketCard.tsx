import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { PurchaseData } from '../models/purchase-payment.model';

type DigitalTicketCardProps = {
  purchaseData: PurchaseData;
  confirmationNumber: string;
};

export function DigitalTicketCard({
  purchaseData,
  confirmationNumber,
}: DigitalTicketCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.ticketCard}>
      <Text style={styles.brand}>ZYBUS</Text>

      <View style={styles.qrBox}>
        <Text style={styles.qrText}>QR</Text>
      </View>

      <Text style={styles.label}>Número de confirmación</Text>
      <Text style={styles.value}>{confirmationNumber}</Text>

      <Text style={styles.label}>Pasajero</Text>
      <Text style={styles.value}>{purchaseData.passengerName}</Text>

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
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    ticketCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 22,
      padding: 24,
      alignItems: 'center',
    },
    brand: {
      fontSize: theme.typography.xl,
      color: theme.colors.brandBlue,
      fontWeight: '700',
      marginBottom: 20,
    },
    qrBox: {
      width: 150,
      height: 150,
      borderRadius: 12,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    qrText: {
      fontSize: theme.typography.xl,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    label: {
      width: '100%',
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginTop: 12,
    },
    value: {
      width: '100%',
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
      fontWeight: '600',
      marginTop: 2,
    },
  });
}