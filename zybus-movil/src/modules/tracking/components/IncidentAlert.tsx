import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TrackingIncident } from '../models/tracking.model';
import { TRACKING_SEVERITY } from '../constants/tracking.constants';

interface IncidentAlertProps {
  incidents: TrackingIncident[];
}

function severityStyle(severityName: string) {
  if (severityName === TRACKING_SEVERITY.HIGH) {
    return { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', icon: 'alert-circle' as const };
  }
  return { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E', icon: 'warning' as const };
}

export function IncidentAlert({ incidents }: IncidentAlertProps): ReactElement | null {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  if (incidents.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      {incidents.map((incident) => {
        const s = severityStyle(incident.severityName);
        return (
          <View key={incident.id} style={[styles.card, { backgroundColor: s.bg, borderColor: s.border }]}>
            <Ionicons name={s.icon} size={20} color={s.border} style={styles.icon} />
            <View style={styles.content}>
              <Text style={[styles.type, { color: s.text }]}>{incident.incidentTypeName}</Text>
              <Text style={[styles.description, { color: s.text }]}>{incident.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    wrapper: {
      gap: 8,
      marginBottom: 10,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 12,
      borderWidth: 1,
      padding: 12,
      gap: 10,
    },
    icon: {
      marginTop: 1,
    },
    content: {
      flex: 1,
    },
    type: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      marginBottom: 2,
    },
    description: {
      fontSize: theme.typography.sm,
      lineHeight: 18,
    },
  });
}
