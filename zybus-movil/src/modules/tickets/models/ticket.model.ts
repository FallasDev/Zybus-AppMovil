export interface Ticket {
  id: string;
  title: string;
  route: string;
  seatNumber: string;
  ownerUserId: string;
  createdAt: string;
}

export interface TicketFormData {
  title: string;
  route: string;
  seatNumber: string;
  ownerUserId: string;
}

export const createTicketModel = ({
  id,
  title,
  route,
  seatNumber,
  ownerUserId,
  createdAt,
}: Ticket): Ticket => ({
  id,
  title,
  route,
  seatNumber,
  ownerUserId,
  createdAt,
});
