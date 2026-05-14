import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

type PaymentMethodCardProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

export function PaymentMethodCard({
  label,
  isSelected,
  onPress,
}: PaymentMethodCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.subtitle}>
        {isSelected ? 'Seleccionado' : 'Seleccionar'}
      </Text>
    </TouchableOpacity>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 18,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    cardSelected: {
      borderColor: theme.colors.brandBlue,
    },
    title: {
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    subtitle: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
  });
}