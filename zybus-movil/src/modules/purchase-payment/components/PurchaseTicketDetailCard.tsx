import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

interface PurchaseTicketDetailCardProps {
  date: string;
  departurePoint: string;
  arrivalPoint: string;
  duration: string;
  ticketQuantity: number;
  seatCodes: string;
}

export function PurchaseTicketDetailCard({
  date,
  departurePoint,
  arrivalPoint,
  duration,
  ticketQuantity,
  seatCodes,
}: PurchaseTicketDetailCardProps): ReactElement {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
          Detalle del boleto
        </Text>

        <Ionicons name="ticket-outline" size={22} color={theme.colors.brandBlue} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
          Fecha
        </Text>
        <Text style={[styles.value, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
          {date}
        </Text>
      </View>

      <View style={styles.tripRoute}>
        <View style={styles.tripPoint}>
          <Text style={[styles.timeText, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
            Salida
          </Text>
          <Text style={[styles.placeText, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
            {departurePoint}
          </Text>
        </View>

        <View style={styles.roadContainer}>
          <View style={[styles.roadLine, { backgroundColor: theme.colors.border }]} />

          <View style={[styles.busCircle, { backgroundColor: theme.colors.brandBlue }]}>
            <Ionicons name="bus-outline" size={20} color={theme.colors.white} />
          </View>

          <Text style={[styles.durationText, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
            {duration}
          </Text>
        </View>

        <View style={styles.tripPointRight}>
          <Text style={[styles.timeText, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
            Llegada
          </Text>
          <Text style={[styles.placeText, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
            {arrivalPoint}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
          Cantidad de asientos
        </Text>
        <Text style={[styles.value, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
          {ticketQuantity}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { fontSize: theme.typography.sm, color: theme.colors.textSecondary }]}>
          Asientos
        </Text>
        <Text style={[styles.value, { fontSize: theme.typography.md, color: theme.colors.textPrimary }]}>
          {seatCodes}
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 3,
  },
  value: {
    fontWeight: '600',
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 6,
  },
  tripPoint: {
    width: '28%',
    alignItems: 'flex-start',
  },
  tripPointRight: {
    width: '28%',
    alignItems: 'flex-end',
  },
  timeText: {
    marginBottom: 4,
  },
  placeText: {
    fontWeight: '700',
  },
  roadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  roadLine: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 99,
  },
  busCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  durationText: {
    marginTop: 6,
    fontWeight: '600',
  },
});