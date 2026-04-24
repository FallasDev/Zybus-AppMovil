import type { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { USERS_SCREEN_TEXT } from '../constants/users.constants';
import type { UserFormData } from '../models/user.model';

interface UserFormProps {
  formData: UserFormData;
  isLoading: boolean;
  submitLabel: string;
  onChange: (field: keyof UserFormData, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function UserForm({
  formData,
  isLoading,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: UserFormProps): ReactElement {
  return (
    <View>
      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#a0a0a0"
        value={formData.name}
        onChangeText={(value) => onChange('name', value)}
        editable={!isLoading}
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#a0a0a0"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(value) => onChange('email', value)}
        editable={!isLoading}
      />

      <View style={styles.actionsRow}>
        <Pressable
          style={[styles.primaryButton, isLoading && styles.disabledButton]}
          onPress={onSubmit}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>{submitLabel}</Text>
        </Pressable>

        <Pressable
          style={[styles.secondaryButton, isLoading && styles.disabledButton]}
          onPress={onCancel}
          disabled={isLoading}
        >
          <Text style={styles.secondaryButtonText}>{USERS_SCREEN_TEXT.CANCEL_BUTTON}</Text>
        </Pressable>
      </View>
    </View>
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
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
    marginBottom: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.brandBlue,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.gray,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.6,
  },
});