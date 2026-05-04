export type SeatStatus = 'free' | 'occupied';
export type PassengerType = 'normal' | 'adulto_mayor';

export interface Seat {
  id: string;
  seatCode: string;
  position: number;
  status: SeatStatus;
  isAccessible: boolean;
}

export interface SelectedSeat {
  seatId: string;
  seatCode: string;
  passengerType: PassengerType;
  cedula?: string;
}

export interface SeatMapData {
  seats: Seat[];
  columnsCount: number;
  capacity: number;
}
