import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { TicketList } from '../components/TicketList';
import { TicketForm } from '../components/TicketForm';
import { TicketModal } from '../components/TicketModal';
import { TICKETS_SCREEN_TEXT } from '../constants/tickets.constants';
import type { Ticket, TicketFormData } from '../models/ticket.model';
import { useTicketsCrud } from '../hooks/useTicketsCrud';

const initialFormData: TicketFormData = {
  title: '',
  route: '',
  seatNumber: '',
  ownerUserId: '',
};

export function TicketsScreen(): ReactElement {
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<TicketFormData>(initialFormData);

  const isEditing = useMemo(() => Boolean(selectedTicket), [selectedTicket]);

  const openCreateModal = (): void => {
    clearSelection();
    setFormData(initialFormData);
    setIsModalVisible(true);
  };

  const openEditModal = (ticket: Ticket): void => {
    selectTicketForEdit(ticket);
    setFormData({
      title: ticket.title,
      route: ticket.route,
      seatNumber: ticket.seatNumber,
      ownerUserId: ticket.ownerUserId,
    });
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    clearSelection();
    setFormData(initialFormData);
    setIsModalVisible(false);
  };

  const handleChange = (field: keyof TicketFormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    const success =
      isEditing && selectedTicket
        ? await updateTicket(selectedTicket.id, formData)
        : await createTicket(formData);

    if (success) {
      closeModal();
    }
  };

  const handleDeleteTicket = async (ticketId: string): Promise<void> => {
    Alert.alert('Eliminar tiquete', '¿Seguro que deseas eliminar este tiquete?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          void deleteTicket(ticketId);
        },
      },
    ]);
  };

  const header = (
    <>
      <View style={styles.headerCard}>
        <Text style={styles.title}>{TICKETS_SCREEN_TEXT.TITLE}</Text>
        <Text style={styles.subtitle}>{TICKETS_SCREEN_TEXT.SUBTITLE}</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{tickets.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{users.length}</Text>
            <Text style={styles.summaryLabel}>Usuarios</Text>
          </View>
        </View>

        <Pressable style={styles.createButton} onPress={openCreateModal}>
          <Text style={styles.createButtonText}>{TICKETS_SCREEN_TEXT.CREATE_BUTTON}</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackText}>{TICKETS_SCREEN_TEXT.LOADING}</Text>
        </View>
      ) : null}

      {error ? (
        <View style={[styles.feedbackCard, styles.errorCard]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </>
  );

  return (
    <View style={styles.wrapper}>
      <TicketList
        tickets={tickets}
        isLoading={isLoading}
        getOwnerNameById={getOwnerNameById}
        onEdit={openEditModal}
        onDelete={handleDeleteTicket}
        header={header}
      />

      <TicketModal
        visible={isModalVisible}
        title={isEditing ? 'Editar tiquete' : 'Nuevo tiquete'}
        onClose={closeModal}
      >
        <TicketForm
          formData={formData}
          users={users}
          isLoading={isLoading}
          submitLabel={
            isEditing
              ? TICKETS_SCREEN_TEXT.UPDATE_BUTTON
              : TICKETS_SCREEN_TEXT.CREATE_BUTTON
          }
          onChange={handleChange}
          onSubmit={() => {
            void handleSubmit();
          }}
          onCancel={closeModal}
        />
      </TicketModal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerCard: {
    backgroundColor: colors.brandBlue,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#eef2e8',
    fontSize: 14,
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 16,
    padding: 14,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  summaryLabel: {
    color: '#eef2e8',
    fontSize: 13,
    marginTop: 4,
  },
  createButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.brandBlue,
    fontSize: 16,
    fontWeight: '700',
  },
  feedbackCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  feedbackText: {
    color: colors.gray,
    textAlign: 'center',
    fontWeight: '600',
  },
  errorCard: {
    backgroundColor: '#fff1f1',
  },
  errorText: {
    color: '#b42318',
    textAlign: 'center',
    fontWeight: '700',
  },
});