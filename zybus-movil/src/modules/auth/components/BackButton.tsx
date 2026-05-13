import type { ReactElement } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface Props {
  onPress?: () => void;
}

export default function BackButton({ onPress }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>‹</Text>
    </TouchableOpacity>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    btn: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: theme.colors.surfaceAlt ?? theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18,
    },
    text: {
      fontSize: 30,
      color: theme.colors.textPrimary,
      marginTop: -3,
    },
  });
}
