import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { formatDate } from '../utils/ticket.formatters';

interface Props {
  tripId: number;
  purchaseId?: number | null;
  state: string;
  issuedAt: string;
}

export function TicketDetailsCard({ tripId, purchaseId, state, issuedAt }: Props): ReactElement {
  return (
    <View style={styles.card}>
      <Row label="ID de viaje" value={`#${tripId}`} />
      {purchaseId != null && (
        <>
          <View style={styles.hr} />
          <Row label="ID de compra" value={`#${purchaseId}`} />
        </>
      )}
      <View style={styles.hr} />
      <Row label="Estado" value={state} />
      <View style={styles.hr} />
      <Row label="Fecha de emisión" value={formatDate(issuedAt)} />
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  hr: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    fontSize: 14,
    color: colors.gray,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
});
