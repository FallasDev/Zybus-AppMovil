import type { ReactElement } from 'react';
import { useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { Ticket } from '../models/ticket.model';
import { TICKET_STATUS_LABELS } from '../constants/tickets.constants';
import type { TicketStatus } from '../constants/tickets.constants';

interface Props {
  tickets: Ticket[];
  header?: ReactElement;
}

const TicketItem = ({
  ticket,
}: {
  ticket: Ticket;
}): ReactElement => {
  const { theme } = useAppTheme();

  const styles = useMemo(
    () => makeStyles(theme),
    [theme]
  );

  return (
    <View style={styles.card}>
      {/* TOP */}
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {ticket.seatLabel}
          </Text>
        </View>

        <Text style={styles.date}>
          {new Date(
            ticket.createdAt
          ).toLocaleDateString()}
        </Text>
      </View>

      {/* ROUTE */}
      <Text style={styles.route}>
        {ticket.routeName ??
          'Ruta no disponible'}
      </Text>

      {/* PASSENGER */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Pasajero:
        </Text>

        <Text style={styles.value}>
          {ticket.passengerName ??
            'No disponible'}
        </Text>
      </View>

      {/* SEAT */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Asiento:
        </Text>

        <Text style={styles.value}>
          {ticket.seatLabel}
        </Text>
      </View>

      {/* PRICE */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Precio:
        </Text>

        <Text style={styles.value}>
          ₡ {ticket.price}
        </Text>
      </View>

      {/* CONFIRMATION */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Confirmación:
        </Text>

        <Text style={styles.value}>
          {ticket.confirmationNumber}
        </Text>
      </View>

      {/* STATUS */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Estado:
        </Text>

        <Text
          style={[
            styles.value,
            ticket.state === 'ACTIVE' && {
              color: '#16a34a',
              fontWeight: '700',
            },
            ticket.state === 'USED' && {
              color: '#dc2626',
              fontWeight: '700',
            },
          ]}
        >
          {
            TICKET_STATUS_LABELS[
              ticket.state as TicketStatus
            ]
          }
        </Text>
      </View>
    </View>
  );
};

/* =========================================================
   LIST
========================================================= */

export function TicketHistoryList({
  tickets,
  header,
}: Props): ReactElement {
  const { theme } = useAppTheme();

  const styles = useMemo(
    () => makeStyles(theme),
    [theme]
  );

  return (
    <FlatList
      style={styles.flatList}
      data={tickets}
      keyExtractor={(item) =>
        item.id.toString()
      }
      ListHeaderComponent={
        header ? <>{header}</> : null
      }
      contentContainerStyle={
        styles.list
      }
      showsVerticalScrollIndicator={
        false
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            SIN TIQUETES
          </Text>

          <Text style={styles.emptyText}>
            No tienes tiquetes disponibles
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <TicketItem ticket={item} />
      )}
    />
  );
}

/* STYLES */

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    flatList: {
      flex: 1,
    },

    list: {
      padding: 20,
      paddingBottom: 80,
      flexGrow: 1,
    },

    card: {
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

      marginBottom: 10,
    },

    badge: {
      backgroundColor:
        theme.colors.brandBlue,

      borderRadius: 999,

      paddingHorizontal: 10,

      paddingVertical: 4,
    },

    badgeText: {
      color: theme.colors.white,

      fontWeight: '700',
    },

    date: {
      color:
        theme.colors.textSecondary,

      fontSize: 12,
    },

    route: {
      fontSize: 16,

      fontWeight: '700',

      color:
        theme.colors.textPrimary,

      marginBottom: 12,
    },

    infoRow: {
      flexDirection: 'row',

      marginBottom: 6,
    },

    label: {
      color:
        theme.colors.textSecondary,

      marginRight: 6,
    },

    value: {
      color:
        theme.colors.textPrimary,

      fontWeight: '600',
    },

    empty: {
      alignItems: 'center',

      marginTop: 40,
    },
    emptyTitle: {
      fontWeight: '700',
      fontSize: 18,
      marginBottom: 8,
      color:
        theme.colors.textPrimary,
    },
    emptyText: {
      color:
        theme.colors.textSecondary,
    },
  });
}