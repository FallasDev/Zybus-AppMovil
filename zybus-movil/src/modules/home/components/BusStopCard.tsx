import type { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';

interface BusStopCardProps {
  name: string;
  distance: string;
  route: string;
  onPress?: () => void;
}

export function BusStopCard({
  name,
  distance,
  route,
  onPress,
}: BusStopCardProps): ReactElement {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.dot} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.route}>{route}</Text>
        </View>
      </View>

      <Text style={styles.distance}>{distance}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.brandBlue,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  route: {
    fontSize: 14,
    color: colors.gray,
  },
  distance: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brandBlue,
  },
});