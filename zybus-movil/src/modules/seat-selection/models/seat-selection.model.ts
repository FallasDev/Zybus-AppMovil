export type SeatStatus = 'free' | 'occupied';

export interface Seat {
  id: string;
  seatCode: string;
  position: number;
  status: SeatStatus;
  isAccessible: boolean;
}

export interface SeatMapData {
  seats: Seat[];
  columnsCount: number;
  capacity: number;
}
