import {toCreateTicketRequestDTO,toTicketResponseDTO,} from '../models/ticket.dto';
import { TICKET_ERRORS } from '../constants/tickets.constants';
import type { CreateTicketRequestDTO, TicketResponseDTO } from '../models/ticket.dto';
import type {Ticket,TicketFormData,} from '../models/ticket.model';

let ticketsDb: Ticket[] = [
  {
    id: 1,
    tripId: 101,
    tripSeatId: 501,
    purchaseId: 9001,
    routeName: 'San José → Cartago',
    departureDatetime: '2026-06-10T10:00:00',
    seatLabel: 'B2',
    passengerName: 'Dayana Solano',
    price: 2500,
    qrCode: 'QR_TICKET_ABC123',
    confirmationNumber: 'CNF-001-A1',
    state: 'ACTIVE',
    issuedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },

  {
    id: 2,
    tripId: 102,
    tripSeatId: 502,
    purchaseId: 9002,
    routeName: 'Heredia → Alajuela',
    departureDatetime: '2024-01-01T10:00:00',
    seatLabel: 'B1',
    passengerName: 'Dayana Solano',
    price: 1800,
    qrCode: 'QR_TICKET_XYZ789',
    confirmationNumber: 'CNF-002-B3',
    state: 'USED',
    issuedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
];

/* API DELAY SIMULATION */

const wait = (ms = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const ensureTicketExists = (
  ticketId: number
): Ticket => {
  const ticket = ticketsDb.find(
    (item) => item.id === ticketId
  );

  if (!ticket) {
    throw new Error(TICKET_ERRORS.TICKET_NOT_FOUND);
  }

  return ticket;
};

export const isActiveTicket = (
  ticket: Ticket
): boolean => {
  return (
    new Date(ticket.departureDatetime) >= new Date()
  );
};

export const isPastTicket = (
  ticket: Ticket
): boolean => {
  return (
    new Date(ticket.departureDatetime) < new Date()
  );
};

 /* Almacenado último mes */
 export const isLastMonthTicket = (ticket: Ticket): boolean => {
  const ticketDate = new Date(ticket.createdAt);

  const now = new Date();

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  return ticketDate >= oneMonthAgo && ticketDate <= now;
};


/*SERVICE */

export const ticketsService = {

  async getAllTickets(): Promise<
    TicketResponseDTO[]
  > {
    await wait();

    return ticketsDb.map(toTicketResponseDTO);
  },

  async getTicketById(
    ticketId: number
  ): Promise<TicketResponseDTO> {
    await wait();

    const ticket = ensureTicketExists(ticketId);

    return toTicketResponseDTO(ticket);
  },

  /* CREATE */

 async createTicket(
  payload: CreateTicketRequestDTO
): Promise<TicketResponseDTO> {
  await wait();

  const newTicket: Ticket = {
    id: Date.now(),
    tripId: payload.trip_id,
    tripSeatId: payload.trip_seat_id,
    purchaseId: payload.purchase_id,
    routeName: 'Liberia → San José',
    departureDatetime: '2026-08-15T08:00:00',
    seatLabel: 'A5',
    passengerName: 'Nuevo Pasajero',
    price: 3500,
    qrCode: `QR_${Date.now()}`,
    confirmationNumber: `CNF-${Date.now()}`,
    state: 'ACTIVE', 
    issuedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  ticketsDb = [newTicket, ...ticketsDb];
  return toTicketResponseDTO(newTicket);
},

async getActiveTickets(): Promise<TicketResponseDTO[]> {
  await wait();

  return ticketsDb
    .filter((t) => t.state === 'ACTIVE')
    .map(toTicketResponseDTO);
},

  /* PAST TICKETS*/
async getPastTickets(): Promise<TicketResponseDTO[]> {
  await wait();

  return ticketsDb
    .filter((t) => t.state === 'USED')
    .map(toTicketResponseDTO);
},
  /* Tickets ultimo mes */
async getLastMonthTickets(): Promise<TicketResponseDTO[]> {
  await wait();

  return ticketsDb
    .filter(isLastMonthTicket)
    .map(toTicketResponseDTO);
},
async cancelTicket(ticketId: number): Promise<void> {
  await wait();

  const index = ticketsDb.findIndex(
    (t) => t.id === ticketId
  );

  if (index === -1) {
    throw new Error(TICKET_ERRORS.TICKET_NOT_FOUND);
  }

  const ticket = ticketsDb[index];

  if (ticket.state === 'USED') {
    throw new Error(TICKET_ERRORS.TICKET_ALREADY_USED);
  }

  ticketsDb[index] = {
    ...ticket,
    state: 'CANCELLED',
    updatedAt: new Date().toISOString(),
  };
},
async getCancelledTickets(): Promise<TicketResponseDTO[]> {
  await wait();

  return ticketsDb
    .filter((t) => t.state === 'CANCELLED')
    .map(toTicketResponseDTO);
},

};