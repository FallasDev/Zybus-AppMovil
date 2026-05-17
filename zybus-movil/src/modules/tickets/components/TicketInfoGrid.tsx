import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { formatTime } from '../utils/ticket.formatters';

interface Props {
  passengerName: string;
  seatLabel: string;
  price: number;
  issuedAt: string;
}

export function TicketInfoGrid({ passengerName, seatLabel, price, issuedAt }: Props): ReactElement {
  return (
    <View style={styles.grid}>
      <Cell icon="person-outline" label="Pasajero" value={passengerName} />
      <Cell icon="bus-outline" label="Asiento" value={seatLabel} />
      <Cell icon="cash-outline" label="Precio" value={`₡${price.toLocaleString()}`} />
      <Cell icon="time-outline" label="Emisión" value={formatTime(issuedAt)} />
    </View>
  );
}

function Cell({
  icon,
  label,
  value,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
}): ReactElement {
  return (
    <View style={styles.cell}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={colors.brandBlue} />
      </View>
      <Text style={styles.cellLabel}>{label}</Text>
      <Text style={styles.cellValue} numberOfLines={2}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cell: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.brandBlue}14`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cellLabel: {
    fontSize: 11,
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  cellValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.black,
  },
});
