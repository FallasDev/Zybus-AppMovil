export interface Ticket {
  id: number;
  tripId: number;
  tripSeatId: number;
  purchaseId?: number | null;
  routeName: string;
  departureDatetime: string;
  seatLabel: string;
  passengerName: string;
  price: number;
  qrCode: string;
  confirmationNumber: string;
  state: string;
  issuedAt: string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface TicketFormData {
  tripId: number | string;
  tripSeatId: number | string;
  purchaseId: number | string;
  stateId?: number | string;
}
export const createTicketModel = ({
  id,
 tripId,
 tripSeatId,
 purchaseId,
 routeName,
 departureDatetime,
 seatLabel,
 passengerName,
 price,
 qrCode,
 confirmationNumber,
 state,
 issuedAt,
 createdAt,
 updatedAt,
}: Ticket): Ticket => ({
  id,
  tripId,
  tripSeatId,
  purchaseId: purchaseId ?? null,
  routeName,
  departureDatetime,
  seatLabel,
  passengerName,
  price,
  qrCode,
  confirmationNumber,
  state,
  issuedAt,
  createdAt,
  updatedAt: updatedAt ?? null,
});
export const initialTicketFormData: TicketFormData = {
  tripId: '',
  tripSeatId: '',
  purchaseId: '',
  stateId: '',
};