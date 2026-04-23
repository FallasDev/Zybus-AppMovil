import {
  toCreateTicketRequestDTO,
  toTicketResponseDTO,
  toUpdateTicketRequestDTO,
  type TicketResponseDTO,
} from '../models/ticket.dto';
import { TICKET_ERRORS } from '../constants/tickets.constants';
import type { Ticket, TicketFormData } from '../models/ticket.model';

let ticketsDb: Ticket[] = [
  {
    id: 't_1',
    title: 'Morning Commute',
    route: 'San Jose -> Cartago',
    seatNumber: 'A1',
    ownerUserId: 'u_1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 't_2',
    title: 'Weekend Trip',
    route: 'Heredia -> Alajuela',
    seatNumber: 'B3',
    ownerUserId: 'u_2',
    createdAt: new Date().toISOString(),
  },
];

const wait = (ms = 200): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const ensureTicketExists = (ticketId: string): Ticket => {
  const ticket = ticketsDb.find((item) => item.id === ticketId);
  if (!ticket) {
    throw new Error(TICKET_ERRORS.TICKET_NOT_FOUND);
  }
  return ticket;
};

export const ticketsService = {
  async getAllTickets(): Promise<TicketResponseDTO[]> {
    await wait();
    return ticketsDb.map(toTicketResponseDTO);
  },

  async getTicketById(ticketId: string): Promise<TicketResponseDTO> {
    await wait();
    const ticket = ensureTicketExists(ticketId);
    return toTicketResponseDTO(ticket);
  },

  async createTicket(payload: TicketFormData): Promise<TicketResponseDTO> {
    await wait();
    const request = toCreateTicketRequestDTO(payload);
    const newTicket: Ticket = {
      id: `t_${Date.now()}`,
      title: request.title,
      route: request.route,
      seatNumber: request.seat_number,
      ownerUserId: request.owner_user_id,
      createdAt: new Date().toISOString(),
    };

    ticketsDb = [newTicket, ...ticketsDb];
    return toTicketResponseDTO(newTicket);
  },

  async updateTicket(ticketId: string, payload: TicketFormData): Promise<TicketResponseDTO> {
    await wait();
    const existing = ensureTicketExists(ticketId);
    const request = toUpdateTicketRequestDTO(payload);

    const updated: Ticket = {
      ...existing,
      title: request.title,
      route: request.route,
      seatNumber: request.seat_number,
      ownerUserId: request.owner_user_id,
    };

    ticketsDb = ticketsDb.map((item) => (item.id === ticketId ? updated : item));
    return toTicketResponseDTO(updated);
  },

  async deleteTicket(ticketId: string): Promise<{ id: string }> {
    await wait();
    ensureTicketExists(ticketId);
    ticketsDb = ticketsDb.filter((item) => item.id !== ticketId);
    return { id: ticketId };
  },
};
