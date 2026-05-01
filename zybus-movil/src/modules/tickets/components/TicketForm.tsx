import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import { TICKETS_SCREEN_TEXT } from '../constants/tickets.constants';
import type { TicketFormData } from '../models/ticket.model';
import type { User } from '../../users';

interface TicketFormProps {
  formData: TicketFormData;
  users: User[];
  isLoading: boolean;
  submitLabel: string;
  onChange: (field: keyof TicketFormData, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function TicketForm({
  formData,
  users,
  isLoading,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: TicketFormProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        value={formData.title}
        onChangeText={(value) => onChange('title', value)}
        placeholder="Ej: Viaje a Cartago"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        editable={!isLoading}
      />

      <Text style={styles.label}>Ruta</Text>
      <TextInput
        value={formData.route}
        onChangeText={(value) => onChange('route', value)}
        placeholder="Ej: San José → Cartago"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        editable={!isLoading}
      />

      <Text style={styles.label}>Asiento</Text>
      <TextInput
        value={formData.seatNumber}
        onChangeText={(value) => onChange('seatNumber', value)}
        placeholder="Ej: A1"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        editable={!isLoading}
      />

      <Text style={styles.label}>Usuario asignado</Text>
      <View style={styles.usersWrap}>
        {users.map((user) => {
          const isSelected = formData.ownerUserId === user.id;
          return (
            <Pressable
              key={user.id}
              style={[styles.userChip, isSelected && styles.userChipSelected]}
              onPress={() => onChange('ownerUserId', user.id)}
              disabled={isLoading}
            >
              <Text style={[styles.userChipText, isSelected && styles.userChipTextSelected]}>
                {user.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.cancelButton, isLoading && styles.disabledButton]}
          onPress={onCancel}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>{TICKETS_SCREEN_TEXT.CANCEL_BUTTON}</Text>
        </Pressable>

        <Pressable
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={onSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>{submitLabel}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    label: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.brandBlue,
      marginBottom: 8,
      marginTop: 8,
    },
    input: {
      height: 52,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 10,
      paddingHorizontal: 14,
      fontSize: 15,
      color: theme.colors.textPrimary,
    },
    usersWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 4,
      marginBottom: 8,
    },
    userChip: {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    userChipSelected: {
      backgroundColor: theme.colors.brandBlue,
    },
    userChipText: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
    userChipTextSelected: {
      color: theme.colors.white,
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 22,
      marginBottom: 12,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 12,
      paddingVertical: 13,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: theme.colors.textSecondary,
      fontWeight: '700',
    },
    submitButton: {
      flex: 1,
      backgroundColor: theme.colors.brandYellow,
      borderRadius: 12,
      paddingVertical: 13,
      alignItems: 'center',
    },
    submitButtonText: {
      color: theme.colors.white,
      fontWeight: '700',
    },
    disabledButton: {
      opacity: 0.6,
    },
  });
}
