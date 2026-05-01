import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import type { AppTheme } from '../theme/types';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Cargando...' }: LoadingStateProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <ActivityIndicator size="large" color={theme.colors.brandBlue} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    text: {
      color: theme.colors.textSecondary,
      textAlign: 'center',
      fontWeight: '600',
    },
  });
}
