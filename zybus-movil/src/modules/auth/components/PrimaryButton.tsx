import type { ReactElement } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface Props {
  children: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
}

export default function PrimaryButton({ children, onPress, disabled, style }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled} activeOpacity={0.9}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    button: {
      height: 56,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
      marginBottom: 18,
    },
    text: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: '800',
    },
  });
}
