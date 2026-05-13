
import type { TicketResponseDTO } from './ticket.dto';
import type { Ticket } from './ticket.model';
import { createTicketModel } from './ticket.model';

export const mapTicketFromResponseDTO = (
  dto: TicketResponseDTO
): Ticket =>
  createTicketModel({
    id: dto.id,
    tripId: dto.trip_id,
    tripSeatId: dto.trip_seat_id,
    purchaseId: dto.purchase_id,
    routeName: dto.route_name,
    departureDatetime: dto.departure_datetime,
    seatLabel: dto.seat_label,
    passengerName: dto.passenger_name,
    price: dto.price,
    qrCode: dto.qr_code,
    confirmationNumber: dto.confirmation_number,
    state: dto.state,
    issuedAt: dto.issued_at,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  });

export const mapTicketToResponseDTO = (
  ticket: Ticket
): TicketResponseDTO => ({
  id: ticket.id,
  trip_id: ticket.tripId,
  trip_seat_id: ticket.tripSeatId,
  purchase_id: ticket.purchaseId ?? null,
  route_name: ticket.routeName,
  departure_datetime: ticket.departureDatetime,
  seat_label: ticket.seatLabel,
  passenger_name: ticket.passengerName,
  price: ticket.price,
  qr_code: ticket.qrCode,
  confirmation_number: ticket.confirmationNumber,
  state: ticket.state,
  issued_at: ticket.issuedAt,
  created_at: ticket.createdAt,
  updated_at: ticket.updatedAt ?? null,
});