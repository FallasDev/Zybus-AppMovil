import type { ReactElement, ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
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
  header?: ReactNode;
}

const TicketItem = ({
  ticket,
  isLoading,
  ownerName,
  onEdit,
  onDelete,
}: TicketItemProps): ReactElement => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{ticket.seatNumber}</Text>
        </View>
        <Text style={styles.dateText}>
          {new Date(ticket.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.route}>{ticket.route}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Asiento:</Text>
        <Text style={styles.value}>{ticket.seatNumber}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Titular:</Text>
        <Text style={styles.owner}>{ownerName}</Text>
      </View>

      <View style={styles.itemActions}>
        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.pressed,
            isLoading && styles.disabledButton,
          ]}
          onPress={() => onEdit(ticket)}
          disabled={isLoading}
        >
          <Text style={styles.editButtonText}>{TICKETS_SCREEN_TEXT.EDIT_BUTTON}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.pressed,
            isLoading && styles.disabledButton,
          ]}
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
  header,
}: TicketListProps): ReactElement => {
  return (
    <FlatList<Ticket>
      data={tickets}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<>{header}</>}
      ListEmptyComponent={
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>{TICKETS_SCREEN_TEXT.EMPTY_TITLE}</Text>
          <Text style={styles.emptyText}>{TICKETS_SCREEN_TEXT.EMPTY_SUBTITLE}</Text>
        </View>
      }
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
    padding: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  itemCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: colors.brandBlue,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  dateText: {
    color: colors.gray,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  route: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 60,
    color: colors.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    color: colors.black,
    fontSize: 14,
  },
  owner: {
    color: colors.brandBlue,
    fontSize: 14,
    fontWeight: '700',
  },
  itemActions: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#fcd4509f',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.brandBlue,
    fontWeight: '700',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#b24040e9',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
  disabledButton: {
    opacity: 0.5,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  emptyText: {
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});