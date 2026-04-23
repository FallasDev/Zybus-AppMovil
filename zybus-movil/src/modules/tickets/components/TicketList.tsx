import type { ReactElement } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { TICKETS_SCREEN_TEXT } from '../constants/tickets.constants';
import type { Ticket } from '../models/ticket.model';

interface TicketItemProps {
  ticket: Ticket;
  isLoading: boolean;
  ownerName: string;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: string) => Promise<void>;
}

interface TicketListProps {
  tickets: Ticket[];
  isLoading: boolean;
  getOwnerNameById: (ownerUserId: string) => string;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: string) => Promise<void>;
}

const TicketItem = ({ ticket, isLoading, ownerName, onEdit, onDelete }: TicketItemProps): ReactElement => {
  return (
    <View style={styles.itemCard}>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.meta}>Route: {ticket.route}</Text>
      <Text style={styles.meta}>Seat: {ticket.seatNumber}</Text>
      <Text style={styles.owner}>Owner: {ownerName}</Text>

      <View style={styles.itemActions}>
        <Pressable style={styles.editButton} onPress={() => onEdit(ticket)} disabled={isLoading}>
          <Text style={styles.editButtonText}>{TICKETS_SCREEN_TEXT.EDIT_BUTTON}</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(ticket.id)}
          disabled={isLoading}
        >
          <Text style={styles.deleteButtonText}>{TICKETS_SCREEN_TEXT.DELETE_BUTTON}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const TicketList = ({
  tickets,
  isLoading,
  getOwnerNameById,
  onEdit,
  onDelete,
}: TicketListProps): ReactElement => {
  if (!tickets.length) {
    return <Text style={styles.emptyText}>No tickets yet. Create your first ticket.</Text>;
  }

  return (
    <FlatList<Ticket>
      data={tickets}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <TicketItem
          ticket={item}
          isLoading={isLoading}
          ownerName={getOwnerNameById(item.ownerUserId)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    gap: 10,
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  meta: {
    marginTop: 4,
    color: '#475467',
  },
  owner: {
    marginTop: 6,
    color: '#0b63f6',
    fontWeight: '600',
  },
  itemActions: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#0b63f6',
    fontWeight: '700',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#b42318',
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 10,
    color: '#667085',
    textAlign: 'center',
  },
});
