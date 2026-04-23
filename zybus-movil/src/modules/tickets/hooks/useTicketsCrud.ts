import { useCallback, useEffect } from 'react';
import { mapUserFromResponseDTO, usersService } from '../../users';
import type { User } from '../../users';
import type { Ticket, TicketFormData } from '../models/ticket.model';
import { mapTicketFromResponseDTO } from '../models/ticket.mapper';
import { ticketsService } from '../services/tickets.service';
import { useTicketsStore } from '../store/tickets.store';
import { getTicketErrorMessage, validateTicketForm } from '../utils/ticket.validation';

interface UseTicketsCrudResult {
  tickets: Ticket[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedTicket: Ticket | null;
  fetchInitialData: () => Promise<void>;
  createTicket: (formData: TicketFormData) => Promise<boolean>;
  updateTicket: (ticketId: string, formData: TicketFormData) => Promise<boolean>;
  deleteTicket: (ticketId: string) => Promise<void>;
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

  const withRequest = useCallback(
    async (requestFn: () => Promise<void>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await requestFn();
        return true;
      } catch (requestError) {
        if (requestError instanceof Error) {
          setError(getTicketErrorMessage(requestError.message));
        } else {
          setError(getTicketErrorMessage('UNKNOWN_ERROR'));
        }
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading]
  );

  const fetchInitialData = useCallback(async (): Promise<void> => {
    await withRequest(async () => {
      const [ticketDtos, userDtos] = await Promise.all([
        ticketsService.getAllTickets(),
        usersService.getAllUsers(),
      ]);

      const mappedTickets = ticketDtos.map(mapTicketFromResponseDTO);
      const mappedUsers = userDtos.map(mapUserFromResponseDTO);

      setTickets(mappedTickets);
      setUsers(mappedUsers);
    });
  }, [setTickets, setUsers, withRequest]);

  const createTicket = useCallback(
    async (formData: TicketFormData): Promise<boolean> => {
      const validationError = validateTicketForm(formData, users);
      if (validationError) {
        setError(getTicketErrorMessage(validationError));
        return false;
      }

      return withRequest(async () => {
        const dto = await ticketsService.createTicket(formData);
        const mapped = mapTicketFromResponseDTO(dto);
        setTickets((prev) => [mapped, ...prev]);
      });
    },
    [setError, setTickets, users, withRequest]
  );

  const updateTicket = useCallback(
    async (ticketId: string, formData: TicketFormData): Promise<boolean> => {
      const validationError = validateTicketForm(formData, users);
      if (validationError) {
        setError(getTicketErrorMessage(validationError));
        return false;
      }

      return withRequest(async () => {
        const dto = await ticketsService.updateTicket(ticketId, formData);
        const mapped = mapTicketFromResponseDTO(dto);
        setTickets((prev) => prev.map((item) => (item.id === ticketId ? mapped : item)));
      });
    },
    [setError, setTickets, users, withRequest]
  );

  const deleteTicket = useCallback(
    async (ticketId: string): Promise<void> => {
      await withRequest(async () => {
        await ticketsService.deleteTicket(ticketId);
        setTickets((prev) => prev.filter((item) => item.id !== ticketId));
      });
    },
    [setTickets, withRequest]
  );

  const selectTicketForEdit = useCallback(
    (ticket: Ticket): void => {
      setError(null);
      setSelectedTicket(ticket);
    },
    [setError, setSelectedTicket]
  );

  const clearSelection = useCallback((): void => {
    setSelectedTicket(null);
  }, [setSelectedTicket]);

  const getOwnerNameById = useCallback(
    (ownerUserId: string): string => users.find((item) => item.id === ownerUserId)?.name || 'Unknown user',
    [users]
  );

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    tickets,
    users,
    isLoading,
    error,
    selectedTicket,
    fetchInitialData,
    createTicket,
    updateTicket,
    deleteTicket,
    selectTicketForEdit,
    clearSelection,
    getOwnerNameById,
  };
};
