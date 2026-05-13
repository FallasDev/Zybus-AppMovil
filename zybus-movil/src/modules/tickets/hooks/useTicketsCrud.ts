import { useCallback, useEffect } from 'react';
import { mapUserFromResponseDTO, usersService } from '../../users';
import type { User } from '../../users';
import type { Ticket, TicketFormData } from '../models/ticket.model';
import { mapTicketFromResponseDTO } from '../models/ticket.mapper';
import { ticketsService } from '../services/tickets.service';
import { useTicketsStore } from '../store/tickets.store';

import {
  getTicketErrorMessage,
  validateTicketForm,
} from '../utils/ticket.validation';

import type { CreateTicketRequestDTO } from '../models/ticket.dto';

interface UseTicketsCrudResult {
  tickets: Ticket[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedTicket: Ticket | null;

  fetchInitialData: () => Promise<void>;
  createTicket: (formData: TicketFormData) => Promise<boolean>;
  cancelTicket: (ticketId: string) => Promise<void>;
  selectTicketForEdit: (ticket: Ticket) => void;
  clearSelection: () => void;
  getOwnerNameById: (ownerUserId: string) => string;
}

export const useTicketsCrud = (): UseTicketsCrudResult => {
  const {
    tickets,
    users,
    isLoading,
    error,
    selectedTicket,
    setTickets,
    setUsers,
    setIsLoading,
    setError,
    setSelectedTicket,
  } = useTicketsStore();


  /* =========================
     WRAPPER REQUEST
  ========================= */
  const withRequest = useCallback(
    async (fn: () => Promise<void>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await fn();
        return true;
      } catch {
        setError(getTicketErrorMessage('UNKNOWN'));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading]
  );

  /* LOAD DATA */
  const fetchInitialData = useCallback(async () => {
    await withRequest(async () => {
      const [ticketDtos, userDtos] = await Promise.all([
        ticketsService.getAllTickets(),
        usersService.getAllUsers(),
      ]);

      setTickets(ticketDtos.map(mapTicketFromResponseDTO));
      setUsers(userDtos.map(mapUserFromResponseDTO));
    });
  }, [setTickets, setUsers, withRequest]);

  /*CREATE */
  const createTicket = useCallback(
    async (formData: TicketFormData): Promise<boolean> => {
      const errorValidation = validateTicketForm(formData);

      if (errorValidation) {
        setError(getTicketErrorMessage(errorValidation));
        return false;
      }

      return withRequest(async () => {
        const payload: CreateTicketRequestDTO = {
          trip_id: Number(formData.tripId),
          trip_seat_id: Number(formData.tripSeatId),
          purchase_id: Number(formData.purchaseId),
        };

        const dto = await ticketsService.createTicket(payload);

        setTickets((prev) => [
          mapTicketFromResponseDTO(dto),
          ...prev,
        ]);
      });
    },
    [setError, setTickets, withRequest]  // ✅ users ya no es dependencia aquí
  );

  /* CANCEL */
  const cancelTicket = useCallback(
    async (ticketId: string): Promise<void> => {
      await withRequest(async () => {
        await ticketsService.cancelTicket(Number(ticketId));

        setTickets((prev) =>
          prev.map((t) =>
            t.id === Number(ticketId)
              ? { ...t, state: 'CANCELLED' as any }
              : t
          )
        );
      });
    },
    [setTickets, withRequest]
  );

  /* SELECTION */
  const selectTicketForEdit = useCallback(
    (ticket: Ticket) => {
      setError(null);
      setSelectedTicket(ticket);
    },
    [setError, setSelectedTicket]
  );

  const clearSelection = useCallback(() => {
    setSelectedTicket(null);
  }, [setSelectedTicket]);

  /* UTILS */
  const getOwnerNameById = useCallback(
    (id: string) =>
      users.find((u) => u.id === id)?.name ?? 'Unknown user',
    [users]
  );

  useEffect(() => {
    void fetchInitialData();
  }, [fetchInitialData]);

  return {
    tickets,
    users,
    isLoading,
    error,
    selectedTicket,
    fetchInitialData,
    createTicket,
    cancelTicket,
    selectTicketForEdit,
    clearSelection,
    getOwnerNameById,
  };
};