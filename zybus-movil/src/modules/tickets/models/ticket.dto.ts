import type { Ticket, TicketFormData } from './ticket.model';

export interface TicketRequestDTO {
  title: string;
  route: string;
  seat_number: string;
  owner_user_id: string;
}

export interface TicketResponseDTO {
  id: string;
  title: string;
  route: string;
  seat_number: string;
  owner_user_id: string;
  created_at: string;
}

export const toCreateTicketRequestDTO = ({
  title,
  route,
  seatNumber,
  ownerUserId,
}: TicketFormData): TicketRequestDTO => ({
  title: title.trim(),
  route: route.trim(),
  seat_number: seatNumber.trim().toUpperCase(),
  owner_user_id: ownerUserId.trim(),
});

export const toUpdateTicketRequestDTO = ({
  title,
  route,
  seatNumber,
  ownerUserId,
}: TicketFormData): TicketRequestDTO => ({
  title: title.trim(),
  route: route.trim(),
  seat_number: seatNumber.trim().toUpperCase(),
  owner_user_id: ownerUserId.trim(),
});

export const toTicketResponseDTO = (ticketRecord: Ticket): TicketResponseDTO => ({
  id: ticketRecord.id,
  title: ticketRecord.title,
  route: ticketRecord.route,
  seat_number: ticketRecord.seatNumber,
  owner_user_id: ticketRecord.ownerUserId,
  created_at: ticketRecord.createdAt,
});
