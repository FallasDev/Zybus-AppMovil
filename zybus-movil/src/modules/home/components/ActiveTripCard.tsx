import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface ActiveTripCardProps {
  tripId: string;
  routeName: string;
  etaMinutes: number;
  onPress: () => void;
}

export function ActiveTripCard({ routeName, etaMinutes, onPress }: ActiveTripCardProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconWrap}>
        <Ionicons name="navigate-circle" size={28} color={theme.colors.white} />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Viaje activo</Text>
        <Text style={styles.route} numberOfLines={1}>{routeName}</Text>
        <Text style={styles.eta}>Llega en ~{etaMinutes} min</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.white} />
    </TouchableOpacity>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 16,
      padding: 14,
      marginBottom: 16,
      gap: 12,
      shadowColor: theme.colors.brandBlue,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 5,
    },
    iconWrap: {
      width: 40,
      alignItems: 'center',
    },
    info: {
      flex: 1,
    },
    label: {
      fontSize: theme.typography.xs,
      color: 'rgba(255,255,255,0.75)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    route: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.white,
    },
    eta: {
      fontSize: theme.typography.xs,
      color: 'rgba(255,255,255,0.85)',
      marginTop: 2,
    },
  });
}
