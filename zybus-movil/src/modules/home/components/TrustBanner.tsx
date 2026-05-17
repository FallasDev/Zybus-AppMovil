import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';

export function TrustBanner(): ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.ratingRow}>
        <Text style={styles.ratingNumber}>4.9</Text>
        <View style={styles.starsCol}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name="star" size={18} color={colors.brandYellow} />
            ))}
          </View>
          <Text style={styles.reviewsLabel}>+12,000 reseñas</Text>
        </View>
      </View>

      <Text style={styles.description}>
        Más de <Text style={styles.bold}>300,000 usuarios</Text> viajan con Zybus en Costa Rica
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>50+</Text>
          <Text style={styles.statLabel}>Rutas</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>98%</Text>
          <Text style={styles.statLabel}>Puntualidad</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>24/7</Text>
          <Text style={styles.statLabel}>Disponible</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 22,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.brandBlue,
    lineHeight: 52,
  },
  starsCol: {
    gap: 4,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  reviewsLabel: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 19,
  },
  bold: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: 16,
    width: '100%',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.brandBlue,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  separator: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
});
