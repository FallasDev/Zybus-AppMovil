import type { ReactElement } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = 'Cargando...',
}: LoadingStateProps): ReactElement {
  return (
    <View style={styles.card}>
      <ActivityIndicator size="large" color={colors.brandBlue} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    color: colors.gray,
    textAlign: 'center',
    fontWeight: '600',
  },
});