import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import type { AppTheme } from '../theme/types';

interface AppCardProps {
  children: ReactNode;
}

export function AppCard({ children }: AppCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return <View style={styles.card}>{children}</View>;
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 16,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
  });
}
