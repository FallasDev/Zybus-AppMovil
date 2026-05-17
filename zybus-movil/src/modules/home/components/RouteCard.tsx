import type { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';

interface RouteCardProps {
  number: string;
  origin: string;
  destination: string;
  duration: string;
  price: string;
  frequency: string;
  onPress?: () => void;
}

export function RouteCard({
  number,
  origin,
  destination,
  duration,
  price,
  frequency,
  onPress,
}: RouteCardProps): ReactElement {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Ruta {number}</Text>
      </View>

      <View style={styles.routeRow}>
        <Text style={styles.cityText} numberOfLines={1}>{origin}</Text>
        <Ionicons name="arrow-forward" size={14} color="rgba(255,255,255,0.6)" style={styles.arrow} />
        <Text style={styles.cityTextFaded} numberOfLines={1}>{destination}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.6)" />
          <Text style={styles.metaText}>{duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="refresh-outline" size={12} color="rgba(255,255,255,0.6)" />
          <Text style={styles.metaText}>{frequency}</Text>
        </View>
      </View>

      <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 178,
    borderRadius: 20,
    padding: 16,
    marginRight: 14,
    backgroundColor: colors.brandBlue,
    shadowColor: colors.brandBlue,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cityText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
    flexShrink: 1,
  },
  cityTextFaded: {
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    fontSize: 14,
    flexShrink: 1,
  },
  arrow: {
    marginHorizontal: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: 12,
  },
  metaRow: {
    gap: 6,
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
  },
  price: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 20,
  },
});
