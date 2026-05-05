import type { Seat, SeatMapData } from './seat-selection.model';

export interface TripSeatDTO {
  trip_seat_id: string;
  bus_seat_id: string;
  seat_code: string;
  position: number;
  state_code: string;
  is_available: boolean;
  is_accessible: boolean;
}

export interface SeatMapResponseDTO {
  seats: TripSeatDTO[];
  columns_count: number;
  capacity: number;
}

export const toTripSeatDTO = (seat: Seat): TripSeatDTO => ({
  trip_seat_id: seat.id,
  bus_seat_id: seat.id,
  seat_code: seat.seatCode,
  position: seat.position,
  state_code: seat.status === 'free' ? 'AVAILABLE' : 'OCCUPIED',
  is_available: seat.status === 'free',
  is_accessible: seat.isAccessible,
});

export const toSeatMapResponseDTO = (data: SeatMapData): SeatMapResponseDTO => ({
  seats: data.seats.map(toTripSeatDTO),
  columns_count: data.columnsCount,
  capacity: data.capacity,
});
