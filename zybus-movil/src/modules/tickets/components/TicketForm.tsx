import { useEffect, useState, type ReactElement } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { User } from '../../users';
import { TICKETS_SCREEN_TEXT } from '../constants/tickets.constants';
import type { Ticket, TicketFormData } from '../models/ticket.model';

interface TicketFormProps {
  selectedTicket: Ticket | null;
  users: User[];
  isLoading: boolean;
  onCreate: (payload: TicketFormData) => Promise<boolean>;
  onUpdate: (ticketId: string, payload: TicketFormData) => Promise<boolean>;
  onCancelEdit: () => void;
}

export const TicketForm = ({
  selectedTicket,
  users,
  isLoading,
  onCreate,
  onUpdate,
  onCancelEdit,
}: TicketFormProps): ReactElement => {
  const [title, setTitle] = useState('');
  const [route, setRoute] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [ownerUserId, setOwnerUserId] = useState('');

  useEffect(() => {
    if (selectedTicket) {
      setTitle(selectedTicket.title);
      setRoute(selectedTicket.route);
      setSeatNumber(selectedTicket.seatNumber);
      setOwnerUserId(selectedTicket.ownerUserId);
      return;
    }

    setTitle('');
    setRoute('');
    setSeatNumber('');
    setOwnerUserId(users[0]?.id || '');
  }, [selectedTicket, users]);

  const handleSubmit = async (): Promise<void> => {
    const payload: TicketFormData = { title, route, seatNumber, ownerUserId };

    if (selectedTicket) {
      const updated = await onUpdate(selectedTicket.id, payload);
      if (updated) {
        onCancelEdit();
      }
      return;
    }

    const created = await onCreate(payload);
    if (created) {
      setTitle('');
      setRoute('');
      setSeatNumber('');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.formTitle}>{selectedTicket ? 'Edit Ticket' : 'New Ticket'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ticket title"
        value={title}
        onChangeText={setTitle}
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Route (e.g. San Jose -> Cartago)"
        value={route}
        onChangeText={setRoute}
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Seat number"
        value={seatNumber}
        onChangeText={setSeatNumber}
        editable={!isLoading}
      />

      <Text style={styles.ownerLabel}>Ticket owner</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ownersRow}>
        {users.map((user) => {
          const isSelected = user.id === ownerUserId;
          return (
            <Pressable
              key={user.id}
              style={[styles.ownerButton, isSelected ? styles.ownerButtonActive : null]}
              onPress={() => setOwnerUserId(user.id)}
              disabled={isLoading}
            >
              <Text style={[styles.ownerButtonText, isSelected ? styles.ownerButtonTextActive : null]}>
                {user.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.actionsRow}>
        <Pressable style={styles.primaryButton} onPress={handleSubmit} disabled={isLoading}>
          <Text style={styles.primaryButtonText}>
            {selectedTicket ? TICKETS_SCREEN_TEXT.UPDATE_BUTTON : TICKETS_SCREEN_TEXT.CREATE_BUTTON}
          </Text>
        </Pressable>

        {selectedTicket ? (
          <Pressable style={styles.secondaryButton} onPress={onCancelEdit} disabled={isLoading}>
            <Text style={styles.secondaryButtonText}>{TICKETS_SCREEN_TEXT.CANCEL_BUTTON}</Text>
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
  ownerLabel: {
    marginTop: 6,
    color: '#334155',
    fontWeight: '600',
  },
  ownersRow: {
    gap: 8,
    paddingVertical: 4,
  },
  ownerButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  ownerButtonActive: {
    backgroundColor: '#0b63f6',
  },
  ownerButtonText: {
    color: '#334155',
    fontWeight: '600',
  },
  ownerButtonTextActive: {
    color: '#ffffff',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
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
