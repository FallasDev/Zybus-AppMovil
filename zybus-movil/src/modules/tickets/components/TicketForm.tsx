import type { ReactElement } from 'react';
import { useMemo } from 'react';
import {Pressable,StyleSheet,Text,TextInput,View,} from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TicketFormData } from '../models/ticket.model';
import { TICKETS_SCREEN_TEXT } from '../constants/tickets.constants';

interface Props {
  formData: TicketFormData;
  isLoading: boolean;
  submitLabel: string;
  onChange: (field: keyof TicketFormData, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
export function TicketForm({
  formData,
  isLoading,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: Props): ReactElement {
  const { theme } = useAppTheme();

  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      {/* TITLE */}
      <Text style={styles.title}>Comprar Tiquete</Text>

      <Text style={styles.subtitle}>
        Completa la información para generar tu ticket.
      </Text>

      {/* TRIP ID */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ruta</Text>

        <TextInput
          value={String(formData.tripId ?? '')}
          onChangeText={(value) => onChange('tripId', value)}
          keyboardType="numeric"
          style={styles.input}
          editable={!isLoading}
        />
      </View>

      {/* SEAT */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Asiento</Text>

        <TextInput
          value={String(formData.tripSeatId ?? '')}
          onChangeText={(value) => onChange('tripSeatId', value)}
          keyboardType="numeric"
          style={styles.input}
          editable={!isLoading}
        />
      </View>


      {/* BUTTONS */}
      <View style={styles.actions}>
        <Pressable
          style={[styles.cancelButton, isLoading && styles.disabledButton]}
          onPress={onCancel}
          disabled={isLoading}
        >
          <Text style={styles.cancelText}>
            {TICKETS_SCREEN_TEXT.CANCEL_BUTTON}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={onSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitText}>
            {isLoading ? 'Procesando...' : submitLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/* STYLES  */

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 22,
      padding: 20,
    },

    title: {
      fontSize: 26,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 6,
    },

    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 24,
    },

    inputGroup: {
      marginBottom: 18,
    },

    label: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },

    input: {
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 14,
      fontSize: 15,
      color: theme.colors.textPrimary,
    },

    statusBox: {
      backgroundColor: '#dcfce7',
      borderRadius: 14,
      padding: 14,
      marginBottom: 14,
    },

    statusLabel: {
      fontSize: 12,
      color: '#166534',
      textTransform: 'uppercase',
      marginBottom: 4,
    },

    statusValue: {
      fontSize: 16,
      fontWeight: '700',
      color: '#166534',
    },

    infoBox: {
      backgroundColor: '#eff6ff',
      borderRadius: 14,
      padding: 14,
      marginBottom: 20,
    },

    infoText: {
      color: '#1e3a8a',
      fontSize: 14,
      lineHeight: 20,
    },

    actions: {
      flexDirection: 'row',
      gap: 12,
    },

    cancelButton: {
      flex: 1,
      backgroundColor: '#dc2626',
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },

    submitButton: {
      flex: 1,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },

    cancelText: {
      color: '#fff',
      fontWeight: '700',
    },

    submitText: {
      color: '#fff',
      fontWeight: '700',
    },

    disabledButton: {
      opacity: 0.5,
    },
  });
}