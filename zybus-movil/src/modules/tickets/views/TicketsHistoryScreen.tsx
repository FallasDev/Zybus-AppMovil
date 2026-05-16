import {View,StyleSheet,ActivityIndicator,Text} from 'react-native';
import {useEffect,useMemo,useState,} from 'react';
import { Header } from '../components/Header';
import { TicketTabs } from '../components/TicketTabs';
import { TicketFilters } from '../components/TicketFilters';
import { TicketHistoryList } from '../components/TicketHistoryList';
import { ticketsService } from '../services/tickets.service';
import type { Ticket } from '../models/ticket.model';
import { mapTicketFromResponseDTO } from '../models/ticket.mapper';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import {
  TICKET_STATUS,
  type TicketStatus,
} from '../constants/tickets.constants';

export function TicketHistoryScreen() {
  const { theme } = useAppTheme();

  const styles = useMemo(() => makeStyles(theme), [theme]);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState<TicketStatus>(
    TICKET_STATUS.ACTIVE
  );

 const [filters, setFilters] = useState(() => {
  const from = new Date();
  from.setDate(1);
  from.setHours(0, 0, 0, 0);

  const to = new Date();
  to.setHours(23, 59, 59, 999);

  return { from, to, search: '' };
});

  useEffect(() => {
    void loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setIsLoading(true);

      const response = await ticketsService.getAllTickets();
      const mapped = response.map(mapTicketFromResponseDTO);

      setTickets(mapped);
    } catch {
      setError('No se pudieron cargar los tiquetes');
    } finally {
      setIsLoading(false);
    }
  };

  /* Filter */

  const filteredTickets = tickets.filter((ticket) => {
    const date = new Date(ticket.createdAt);

    const inRange =
      date >= filters.from && date <= filters.to;

    const matchesSearch =
      ticket.routeName
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      ticket.passengerName
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesStatus =
      ticket.state === selectedTab;

    return inRange && matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Cargando tiquetes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Mis Tiquetes" />

      
      <View style={styles.card}>
        <TicketTabs
          selectedTab={selectedTab}
          onChangeTab={setSelectedTab}
        />

        <TicketFilters
          filters={filters}
          onChangeFilter={setFilters}
        />
      </View>

      <TicketHistoryList tickets={filteredTickets} />
       
    </View>
  );
}

/* STYLES*/

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
   
    card: {
      backgroundColor: theme.colors.surface,
      margin: 16,
      borderRadius: 20,
      padding: 16,
    },

    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },

    loadingText: {
      marginTop: 12,
      fontSize: 14,
      color: theme.colors.textSecondary,
    },

    errorText: {
      fontSize: 14,
      color: theme.colors.error,
      textAlign: 'center',
    },
  });
}