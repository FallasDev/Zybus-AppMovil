import type { ReactElement } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface Props {
  children: string;
  onPress?: () => void;
}

export default function SocialButton({ children, onPress }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    btn: {
      height: 54,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 28,
    },
    text: {
      color: theme.colors.textPrimary,
      fontSize: 15,
      fontWeight: '700',
    },
  });
}
