import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { formatDate, formatTime } from '../utils/ticket.formatters';

interface Props {
  routeName: string;
  departureDatetime: string;
  isActive: boolean;
}

export function TicketHeroCard({ routeName, departureDatetime, isActive }: Props): ReactElement {
  return (
    <View style={styles.card}>
      <View style={[styles.pill, isActive ? styles.pillActive : styles.pillPast]}>
        <View style={[styles.dot, isActive ? styles.dotActive : styles.dotPast]} />
        <Text style={[styles.pillText, isActive ? styles.textActive : styles.textPast]}>
          {isActive ? 'Activo' : 'Finalizado'}
        </Text>
      </View>

      <Text style={styles.route}>{routeName}</Text>

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={15} color="rgba(255,255,255,0.65)" />
        <Text style={styles.meta}>{formatDate(departureDatetime)}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="time-outline" size={15} color="rgba(255,255,255,0.65)" />
        <Text style={styles.time}>{formatTime(departureDatetime)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.brandBlue,
    borderRadius: 22,
    padding: 22,
    shadowColor: colors.brandBlue,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 14,
    gap: 6,
  },
  pillActive: { backgroundColor: 'rgba(209,250,229,0.18)' },
  pillPast: { backgroundColor: 'rgba(254,226,226,0.18)' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { backgroundColor: '#34d399' },
  dotPast: { backgroundColor: '#f87171' },
  pillText: { fontSize: 13, fontWeight: '700' },
  textActive: { color: '#34d399' },
  textPast: { color: '#f87171' },
  route: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 14,
    lineHeight: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
  },
});
