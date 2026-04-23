import { TICKET_ERRORS, type TicketErrorCode } from '../constants/tickets.constants';
import type { TicketFormData } from '../models/ticket.model';
import type { User } from '../../users';

export const validateTicketForm = (
  { title, route, seatNumber, ownerUserId }: TicketFormData,
  users: User[]
): TicketErrorCode | null => {
  if (!title.trim()) {
    return TICKET_ERRORS.TITLE_REQUIRED;
  }

  if (!route.trim()) {
    return TICKET_ERRORS.ROUTE_REQUIRED;
  }

  if (!seatNumber.trim()) {
    return TICKET_ERRORS.SEAT_REQUIRED;
  }

  if (!ownerUserId.trim()) {
    return TICKET_ERRORS.OWNER_REQUIRED;
  }

  const ownerExists = users.some((user) => user.id === ownerUserId);
  if (!ownerExists) {
    return TICKET_ERRORS.OWNER_NOT_FOUND;
  }

  return null;
};

export const getTicketErrorMessage = (errorCode: string): string => {
  const messageMap: Record<TicketErrorCode, string> = {
    [TICKET_ERRORS.TITLE_REQUIRED]: 'Ticket title is required.',
    [TICKET_ERRORS.ROUTE_REQUIRED]: 'Route is required.',
    [TICKET_ERRORS.SEAT_REQUIRED]: 'Seat number is required.',
    [TICKET_ERRORS.OWNER_REQUIRED]: 'You must assign a user.',
    [TICKET_ERRORS.OWNER_NOT_FOUND]: 'Selected user does not exist.',
    [TICKET_ERRORS.TICKET_NOT_FOUND]: 'The ticket no longer exists.',
  };

  if (errorCode in messageMap) {
    return messageMap[errorCode as TicketErrorCode];
  }

  return 'Unexpected error.';
};
