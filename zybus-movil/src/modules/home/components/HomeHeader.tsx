import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export function HomeHeader(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zybus</Text>
      <Text style={styles.subtitle}>Movilidad más simple</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.brandBlue,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: colors.gray,
  },
});