import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'; // ← quita Alert
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import { AppModal, LoadingState } from '../../../shared/components';
import { TicketList } from '../components/TicketList';
import { TicketForm } from '../components/TicketForm';
import { TICKETS_SCREEN_TEXT, TICKET_STATUS } from '../constants/tickets.constants';
import type { Ticket, TicketFormData } from '../models/ticket.model';
import { useTicketsCrud } from '../hooks/useTicketsCrud';

const initialFormData: TicketFormData = {
  tripId: '',
  tripSeatId: '',
  purchaseId: '',
  stateId: '',
};

function resolveStateId(state: Ticket['state']): string {
  if (state === TICKET_STATUS.ACTIVE) return '1';
  if (state === TICKET_STATUS.USED) return '2';
  return '0';
}

export function TicketsScreen(): ReactElement {
  const {
    tickets,
    isLoading,
    error,
    selectedTicket,
    createTicket,
    cancelTicket,
    selectTicketForEdit,
    clearSelection,
  } = useTicketsCrud();

  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<TicketFormData>(initialFormData);
  const [cancelTargetId, setCancelTargetId] = useState<number | null>(null); // ← estado cancelación

  const isEditing = useMemo(() => Boolean(selectedTicket), [selectedTicket]);

  const openCreateModal = (): void => {
    clearSelection();
    setFormData(initialFormData);
    setIsModalVisible(true);
  };

  const handleTicketDetail = (ticket: Ticket): void => {
    navigation.navigate('TicketDetailScreen', { ticket });
  };

  const openEditModal = (ticket: Ticket): void => {
    selectTicketForEdit(ticket);
    setFormData({
      tripId: String(ticket.tripId),
      tripSeatId: String(ticket.tripSeatId),
      purchaseId: String(ticket.purchaseId ?? ''),
      stateId: resolveStateId(ticket.state),
    });
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    clearSelection();
    setFormData(initialFormData);
    setIsModalVisible(false);
  };

  const handleChange = (field: keyof TicketFormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    const success = await createTicket(formData);
    if (success) closeModal();
  };

  const handleCancelTicket = (ticketId: number): void => {
    setCancelTargetId(ticketId);
  };

  const confirmCancel = async (): Promise<void> => {
    if (cancelTargetId === null) return;
    await cancelTicket(String(cancelTargetId));
    setCancelTargetId(null);
  };

  /* HEADER */
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
            <Text style={styles.summaryValue}>
              {tickets.filter((t) => t.state === TICKET_STATUS.ACTIVE).length}
            </Text>
            <Text style={styles.summaryLabel}>Activos</Text>
          </View>
        </View>

        <Pressable style={styles.createButton} onPress={openCreateModal}>
          <Text style={styles.createButtonText}>
            {TICKETS_SCREEN_TEXT.CREATE_BUTTON}
          </Text>
        </Pressable>
      </View>

      {isLoading ? <LoadingState message={TICKETS_SCREEN_TEXT.LOADING} /> : null}

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
        onDetail={handleTicketDetail}
        onCancel={handleCancelTicket}
        header={header}
      />

      <AppModal
        visible={cancelTargetId !== null}
        title="Política de cancelación"
        onClose={() => setCancelTargetId(null)}
      >
        <View style={{ gap: 12 }}>
          <Text style={{ color: theme.colors.textSecondary, lineHeight: 22 }}>
            Al cancelar este tiquete:{'\n\n'}
            {'• '}Solo se permite cancelar antes de la fecha y hora del viaje.{'\n'}
            {'• '}El tiquete será invalidado y no podrá reutilizarse.{'\n'}
            {'• '}Esta acción no se podrá recuperar.{'\n\n'}
            ¿Deseas continuar?
          </Text>

          <Pressable
            style={[styles.createButton, { backgroundColor: '#b24040e9' }]}
            onPress={() => { void confirmCancel(); }}
            disabled={isLoading}
          >
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
              Sí, cancelar tiquete
            </Text>
          </Pressable>

          <Pressable
            style={styles.createButton}
            onPress={() => setCancelTargetId(null)}
          >
            <Text style={{ color: theme.colors.brandBlue, fontWeight: '700', fontSize: 16 }}>
              No, mantener tiquete
            </Text>
          </Pressable>
        </View>
      </AppModal>

      <AppModal
        visible={isModalVisible}
        title={isEditing ? 'Editar tiquete' : 'Comprar tiquete'}
        onClose={closeModal}
      >
        <TicketForm
          formData={formData}
          isLoading={isLoading}
          submitLabel={
            isEditing
              ? TICKETS_SCREEN_TEXT.UPDATE_BUTTON
              : TICKETS_SCREEN_TEXT.CREATE_BUTTON
          }
          onChange={handleChange}
          onSubmit={() => { void handleSubmit(); }}
          onCancel={closeModal}
        />
      </AppModal>
    </View>
  );
}

/* STYLES */
function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerCard: {
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 22,
      padding: 20,
      marginBottom: 18,
    },
    title: {
      color: theme.colors.white,
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 4,
    },
    subtitle: {
      color: theme.colors.white,
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
      color: theme.colors.white,
      fontSize: 20,
      fontWeight: '700',
    },
    summaryLabel: {
      color: theme.colors.white,
      fontSize: 13,
      marginTop: 4,
    },
    createButton: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    createButtonText: {
      color: theme.colors.brandBlue,
      fontSize: 16,
      fontWeight: '700',
    },
    feedbackCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    errorCard: {
      backgroundColor: theme.colors.errorSurface,
    },
    errorText: {
      color: theme.colors.error,
      textAlign: 'center',
      fontWeight: '700',
    },
  });
}