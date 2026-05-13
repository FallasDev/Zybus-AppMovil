import type { ReactElement } from 'react';

import { useMemo } from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';

import type { AppTheme } from '../../../shared/theme/types';

import {
  TICKETS_SCREEN_TEXT,
  TICKET_STATUS_LABELS,
} from '../constants/tickets.constants';
import type { TicketStatus } from '../constants/tickets.constants'; 

import type { Ticket } from '../models/ticket.model';

interface TicketItemProps {
  ticket: Ticket;

  isLoading: boolean;

  onDetail: (
    ticket: Ticket
  ) => void;

  onCancel: (
    ticketId: number
  ) => void;
}

interface TicketListProps {
  tickets: Ticket[];

  isLoading: boolean;

  onDetail: (
    ticket: Ticket
  ) => void;

  onCancel: (
    ticketId: number
  ) => void;

  header?: ReactElement;
}

const TicketItem = ({
  ticket,
  isLoading,
  onDetail,
  onCancel,
}: TicketItemProps): ReactElement => {
  const { theme } = useAppTheme();

  const styles = useMemo(
    () => makeStyles(theme),
    [theme]
  );

  const isActive =
    new Date(ticket.departureDatetime) >=
    new Date();

  return (
    <View style={styles.itemCard}>
      {/* HEADER */}
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {ticket.seatLabel}
          </Text>
        </View>

        <Text style={styles.dateText}>
          {new Date(
            ticket.createdAt
          ).toLocaleDateString()}
        </Text>
      </View>

      {/* ROUTE */}
      <Text style={styles.route}>
        {ticket.routeName}
      </Text>

      {/* PASSENGER */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>
          Pasajero:
        </Text>

        <Text style={styles.infoValue}>
          {ticket.passengerName}
        </Text>
      </View>

      {/* DEPARTURE */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>
          Salida:
        </Text>

        <Text style={styles.infoValue}>
          {new Date(
            ticket.departureDatetime
          ).toLocaleString()}
        </Text>
      </View>

      {/* STATUS */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>
          Estado:
        </Text>

        <Text
          style={[
            styles.status,
            isActive
              ? styles.active
              : styles.past,
          ]}
        >
       {TICKET_STATUS_LABELS[ticket.state as TicketStatus]}
        </Text>
      </View>

      {/* PRICE */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>
          Precio:
        </Text>

        <Text style={styles.infoValue}>
          ₡ {ticket.price}
        </Text>
      </View>

      {/* ACTIONS */}
      <View style={styles.itemActions}>
        {/* DETAIL */}
        <Pressable
          style={({ pressed }) => [
            styles.detailButton,
            pressed && styles.pressed,
            isLoading &&
              styles.disabledButton,
          ]}
          onPress={() => onDetail(ticket)}
          disabled={isLoading}
        >
          <Text style={styles.detailButtonText}>
            {
              TICKETS_SCREEN_TEXT.DETAIL_BUTTON
            }
          </Text>
        </Pressable>

        {/* CANCEL */}
        <Pressable
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.pressed,
            isLoading &&
              styles.disabledButton,
          ]}
          onPress={() =>
            onCancel(ticket.id)
          }
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>
            {
              TICKETS_SCREEN_TEXT.CANCEL_BUTTON
            }
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const TicketList = ({
  tickets,
  isLoading,
  onDetail,
  onCancel,
  header,
}: TicketListProps): ReactElement => {
  const { theme } = useAppTheme();

  const styles = useMemo(
    () => makeStyles(theme),
    [theme]
  );

  return (
    <FlatList<Ticket>
      data={tickets}
      keyExtractor={(item) =>
        item.id.toString()
      }
      contentContainerStyle={
        styles.listContent
      }
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<>{header}</>}
      ListEmptyComponent={
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            {
              TICKETS_SCREEN_TEXT.EMPTY_TITLE
            }
          </Text>

          <Text style={styles.emptyText}>
            {
              TICKETS_SCREEN_TEXT.EMPTY_SUBTITLE
            }
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <TicketItem
          ticket={item}
          isLoading={isLoading}
          onDetail={onDetail}
          onCancel={onCancel}
        />
      )}
    />
  );
};

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    listContent: {
      padding: 20,

      paddingTop: 24,

      paddingBottom: 32,
    },

    itemCard: {
      backgroundColor:
        theme.colors.surface,

      borderRadius: 18,

      padding: 16,

      marginBottom: 14,

      elevation: 3,
    },

    topRow: {
      flexDirection: 'row',

      justifyContent: 'space-between',

      alignItems: 'center',

      marginBottom: 12,
    },

    badge: {
      backgroundColor:
        theme.colors.brandBlue,

      borderRadius: 999,

      paddingHorizontal: 12,

      paddingVertical: 6,
    },

    badgeText: {
      color: theme.colors.white,

      fontSize: 12,

      fontWeight: '700',
    },

    dateText: {
      color:
        theme.colors.textSecondary,

      fontSize: 12,
    },

    route: {
      fontSize: 18,

      fontWeight: '700',

      color:
        theme.colors.textPrimary,

      marginBottom: 12,
    },

    infoRow: {
      flexDirection: 'row',

      marginBottom: 6,
    },

    infoLabel: {
      width: 80,

      color:
        theme.colors.textSecondary,

      fontSize: 14,

      fontWeight: '600',
    },

    infoValue: {
      color:
        theme.colors.textPrimary,

      fontSize: 14,
    },

    status: {
      fontWeight: '700',
    },

    active: {
      color: '#15803d',
    },

    past: {
      color: '#dc2626',
    },

    itemActions: {
      marginTop: 14,

      flexDirection: 'row',

      gap: 10,
    },

    detailButton: {
      flex: 1,

      backgroundColor: '#fcd4509f',

      borderRadius: 10,

      paddingVertical: 10,

      alignItems: 'center',
    },

    detailButtonText: {
      color:
        theme.colors.textPrimary,

      fontWeight: '700',
    },

    editButton: {
      flex: 1,

      backgroundColor: '#2563eb',

      borderRadius: 10,

      paddingVertical: 10,

      alignItems: 'center',
    },

    editButtonText: {
      color: theme.colors.white,

      fontWeight: '700',
    },

    cancelButton: {
      flex: 1,

      backgroundColor: '#b24040e9',

      borderRadius: 10,

      paddingVertical: 10,

      alignItems: 'center',
    },

    cancelButtonText: {
      color: theme.colors.white,

      fontWeight: '700',
    },

    pressed: {
      opacity: 0.85,
    },

    disabledButton: {
      opacity: 0.5,
    },

    emptyCard: {
      backgroundColor:
        theme.colors.surface,

      borderRadius: 18,

      padding: 24,

      alignItems: 'center',

      justifyContent: 'center',

      marginTop: 12,
    },

    emptyTitle: {
      fontSize: 18,

      fontWeight: '700',

      color:
        theme.colors.textPrimary,

      marginBottom: 8,
    },

    emptyText: {
      color:
        theme.colors.textSecondary,

      textAlign: 'center',

      lineHeight: 20,
    },
  });
}