import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'BusRoute'>;

const routeStops = [
  'Near Bus Stop 01',
  'Main Avenue Stop',
  'Central Park Stop',
  'Mall Station',
  'Destination Stop',
];

export function BusRouteScreen({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Bus Route</Text>

      <View style={styles.routeCard}>
        <Text style={styles.routeName}>Route 12</Text>
        <Text style={styles.routeMeta}>Estimated time: 25 mins</Text>
      </View>

      <View style={styles.timeline}>
        {routeStops.map((stop, index) => (
          <View key={stop} style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.dot} />
              {index !== routeStops.length - 1 ? <View style={styles.line} /> : null}
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.stopName}>{stop}</Text>
              <Text style={styles.stopMeta}>Stop {index + 1}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 20,
      paddingTop: 48,
      paddingBottom: 32,
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    backText: {
      fontSize: 26,
      color: theme.colors.textPrimary,
      marginTop: -2,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      textAlign: 'center',
      marginBottom: 20,
    },
    routeCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      padding: 16,
      marginBottom: 20,
    },
    routeName: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    routeMeta: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    timeline: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      padding: 16,
    },
    timelineRow: {
      flexDirection: 'row',
    },
    timelineLeft: {
      width: 28,
      alignItems: 'center',
    },
    dot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: theme.colors.brandBlue,
    },
    line: {
      width: 2,
      flex: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 4,
    },
    timelineContent: {
      flex: 1,
      paddingBottom: 22,
    },
    stopName: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    stopMeta: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  });
}
