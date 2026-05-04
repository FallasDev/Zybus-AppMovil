import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme';
import type { AppTheme } from '../theme/types';

interface AppSuccessModalProps {
  visible: boolean;
  title: string;
  message?: string;
  buttonLabel?: string;
  onClose: () => void;
}

export function AppSuccessModal({
  visible,
  title,
  message,
  buttonLabel = 'Entendido',
  onClose,
}: AppSuccessModalProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={36} color={theme.colors.white} />
          </View>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      padding: 28,
      alignItems: 'center',
      width: '100%',
      gap: 12,
    },
    iconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.colors.success,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    title: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    message: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    button: {
      backgroundColor: theme.colors.success,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 32,
      marginTop: 8,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: '700',
      fontSize: theme.typography.md,
    },
  });
}
