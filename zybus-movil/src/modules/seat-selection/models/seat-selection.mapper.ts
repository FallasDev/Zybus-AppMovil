import type { TripSeatDTO, SeatMapResponseDTO } from './seat-selection.dto';
import type { Seat, SeatMapData, SeatStatus } from './seat-selection.model';
import { SEAT_STATE_CODES } from '../constants/seat-selection.constants';

const mapStateCode = (stateCode: string, isAvailable: boolean): SeatStatus => {
  if (!isAvailable || stateCode === SEAT_STATE_CODES.OCCUPIED) return 'occupied';
  return 'free';
};

export const mapSeatFromDTO = (dto: TripSeatDTO): Seat => ({
  id: dto.trip_seat_id,
  seatCode: dto.seat_code,
  position: dto.position,
  status: mapStateCode(dto.state_code, dto.is_available),
  isAccessible: dto.is_accessible,
});

export const mapSeatMapFromDTO = (dto: SeatMapResponseDTO): SeatMapData => ({
  seats: dto.seats.map(mapSeatFromDTO),
  columnsCount: dto.columns_count,
  capacity: dto.capacity,
});
