import type {
  Ticket,
  TicketFormData,
} from './ticket.model';

export interface CreateTicketRequestDTO {
  trip_id: number;
  trip_seat_id: number;
  purchase_id: number;
}

export interface UpdateTicketRequestDTO {
  state_id?: number;
  trip_seat_id?: number;
}

/*  RESPONSE DTO */

export interface TicketResponseDTO {
  id: number;
  trip_id: number;
  trip_seat_id: number;
  purchase_id: number | null;
  route_name: string;
  departure_datetime: string;
  seat_label: string;
  passenger_name: string;
  price: number;
  qr_code: string;
 confirmation_number: string;
  state: string;
  issued_at: string;
  created_at: string;
  updated_at: string | null;
}

/*CREATE MAPPER*/

export const toCreateTicketRequestDTO = (
  formData: TicketFormData
): CreateTicketRequestDTO => ({
  trip_id: Number(formData.tripId),

  trip_seat_id: Number(
    formData.tripSeatId
  ),

  purchase_id: Number(
    formData.purchaseId
  ),
});

/* UPDATE MAPPER */

export const toUpdateTicketRequestDTO = (
  formData: Partial<TicketFormData>
): UpdateTicketRequestDTO => ({
  state_id: formData.stateId
    ? Number(formData.stateId)
    : undefined,

  trip_seat_id:
    formData.tripSeatId
      ? Number(formData.tripSeatId)
      : undefined,
});

/* RESPONSE MAPPER */
export const toTicketResponseDTO = (
  ticket: Ticket
): TicketResponseDTO => ({
  id: ticket.id,

  trip_id: ticket.tripId,

  trip_seat_id:
    ticket.tripSeatId,

  purchase_id:
    ticket.purchaseId ?? null,

  route_name: ticket.routeName,

  departure_datetime:
    ticket.departureDatetime,

  seat_label: ticket.seatLabel,

  passenger_name:
    ticket.passengerName,

  price: ticket.price,

  qr_code: ticket.qrCode,

  confirmation_number:
    ticket.confirmationNumber,

  state: ticket.state,

  issued_at: ticket.issuedAt,

  created_at: ticket.createdAt,

  updated_at:
    ticket.updatedAt ?? null,
});