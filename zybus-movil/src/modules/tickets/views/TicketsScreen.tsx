import type { ReactElement } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TicketForm } from '../components/TicketForm';
import { TicketList } from '../components/TicketList';
import { TICKETS_SCREEN_TEXT } from '../constants/tickets.constants';
import { useTicketsCrud } from '../hooks/useTicketsCrud';
import type { RootStackParamList } from '../../../navigation/types';

type TicketsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tickets'>;

export const TicketsScreen = (): ReactElement => {
  const navigation = useNavigation<TicketsScreenNavigationProp>();
  const {
    tickets,
    users,
    isLoading,
    error,
    selectedTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    selectTicketForEdit,
    clearSelection,
    getOwnerNameById,
  } = useTicketsCrud();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{TICKETS_SCREEN_TEXT.TITLE}</Text>
        <Pressable style={styles.navButton} onPress={() => navigation.navigate('Users')}>
          <Text style={styles.navButtonText}>{TICKETS_SCREEN_TEXT.GO_USERS}</Text>
        </Pressable>
      </View>

      <TicketForm
        selectedTicket={selectedTicket}
        users={users}
        isLoading={isLoading}
        onCreate={createTicket}
        onUpdate={updateTicket}
        onCancelEdit={clearSelection}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {isLoading ? <ActivityIndicator size="small" color="#0b63f6" style={styles.loader} /> : null}

      <TicketList
        tickets={tickets}
        isLoading={isLoading}
        getOwnerNameById={getOwnerNameById}
        onEdit={selectTicketForEdit}
        onDelete={deleteTicket}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    flexShrink: 1,
  },
  navButton: {
    backgroundColor: '#e6f0ff',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navButtonText: {
    color: '#0b63f6',
    fontWeight: '700',
  },
  errorText: {
    color: '#b42318',
    marginBottom: 8,
    fontWeight: '600',
  },
  loader: {
    marginBottom: 8,
  },
});
