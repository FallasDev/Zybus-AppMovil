import type { TicketResponseDTO } from './ticket.dto';
import type { Ticket } from './ticket.model';
import { createTicketModel } from './ticket.model';

export const mapTicketFromResponseDTO = (dto: TicketResponseDTO): Ticket =>
  createTicketModel({
    id: dto.id,
    title: dto.title,
    route: dto.route,
    seatNumber: dto.seat_number,
    ownerUserId: dto.owner_user_id,
    createdAt: dto.created_at,
  });
