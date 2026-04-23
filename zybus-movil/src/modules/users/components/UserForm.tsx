import { useEffect, useState, type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { USERS_SCREEN_TEXT } from '../constants/users.constants';
import type { User, UserFormData } from '../models/user.model';

interface UserFormProps {
  selectedUser: User | null;
  isLoading: boolean;
  onCreate: (payload: UserFormData) => Promise<boolean>;
  onUpdate: (userId: string, payload: UserFormData) => Promise<boolean>;
  onCancelEdit: () => void;
}

export const UserForm = ({
  selectedUser,
  isLoading,
  onCreate,
  onUpdate,
  onCancelEdit,
}: UserFormProps): ReactElement => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      return;
    }

    setName('');
    setEmail('');
  }, [selectedUser]);

  const handleSubmit = async () => {
    const payload = { name, email };

    if (selectedUser) {
      const updated = await onUpdate(selectedUser.id, payload);
      if (updated) {
        onCancelEdit();
      }
      return;
    }

    const created = await onCreate(payload);
    if (created) {
      setName('');
      setEmail('');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.formTitle}>{selectedUser ? 'Edit User' : 'New User'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />

      <View style={styles.actionsRow}>
        <Pressable style={styles.primaryButton} onPress={handleSubmit} disabled={isLoading}>
          <Text style={styles.primaryButtonText}>
            {selectedUser ? USERS_SCREEN_TEXT.UPDATE_BUTTON : USERS_SCREEN_TEXT.CREATE_BUTTON}
          </Text>
        </Pressable>

        {selectedUser ? (
          <Pressable style={styles.secondaryButton} onPress={onCancelEdit} disabled={isLoading}>
            <Text style={styles.secondaryButtonText}>{USERS_SCREEN_TEXT.CANCEL_BUTTON}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#dce1ea',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d2939',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cfd6e4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0b63f6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#e6ebf5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#334155',
    fontWeight: '600',
  },
});