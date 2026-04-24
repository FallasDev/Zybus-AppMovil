import type { ReactElement } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
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
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        value={formData.title}
        onChangeText={(value) => onChange('title', value)}
        placeholder="Ej: Viaje a Cartago"
        placeholderTextColor="#a0a0a0"
        style={styles.input}
        editable={!isLoading}
      />

      <Text style={styles.label}>Ruta</Text>
      <TextInput
        value={formData.route}
        onChangeText={(value) => onChange('route', value)}
        placeholder="Ej: San José → Cartago"
        placeholderTextColor="#a0a0a0"
        style={styles.input}
        editable={!isLoading}
      />

      <Text style={styles.label}>Asiento</Text>
      <TextInput
        value={formData.seatNumber}
        onChangeText={(value) => onChange('seatNumber', value)}
        placeholder="Ej: A1"
        placeholderTextColor="#a0a0a0"
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

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    height: 52,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.black,
  },
  usersWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  userChip: {
    backgroundColor: '#eef2f6',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userChipSelected: {
    backgroundColor: colors.brandBlue,
  },
  userChipText: {
    color: colors.black,
    fontWeight: '600',
  },
  userChipTextSelected: {
    color: colors.white,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
    marginBottom: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.gray,
    fontWeight: '700',
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.brandBlue,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.6,
  },
});