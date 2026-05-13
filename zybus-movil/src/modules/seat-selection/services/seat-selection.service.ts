import { toSeatMapResponseDTO, type SeatMapResponseDTO } from '../models/seat-selection.dto';
import { SEAT_SELECTION_ERRORS } from '../constants/seat-selection.constants';
import type { SeatMapData } from '../models/seat-selection.model';

const COLUMNS = 4;
const ROWS = 10;

const ACCESSIBLE_POSITIONS = [5, 6, 7, 8];

const generateSeatMapData = (tripId: string): SeatMapData => {
  const occupiedByTrip: Record<string, number[]> = {
    t_1: [2, 5, 8, 12, 15, 19, 23, 27, 31, 36],
    t_2: [1, 3, 6, 9, 13, 17, 21, 25, 29, 33, 37, 39],
    t_3: [],
  };
  const occupied = occupiedByTrip[tripId] ?? [];

  const seats = Array.from({ length: ROWS * COLUMNS }, (_, i) => {
    const position = i + 1;
    const row = Math.floor(i / COLUMNS);
    const col = i % COLUMNS;
    const colLetter = ['A', 'B', 'C', 'D'][col];
    const seatCode = `${row + 1}${colLetter}`;
    const isOccupied = occupied.includes(position);
    const isAccessible = ACCESSIBLE_POSITIONS.includes(position);

    return {
      id: `ts_${tripId}_${position}`,
      seatCode,
      position,
      status: (isOccupied ? 'occupied' : 'free') as 'occupied' | 'free',
      isAccessible,
    };
  });

  return { seats, columnsCount: COLUMNS, capacity: ROWS * COLUMNS };
};

const wait = (ms = 400): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const cedulaRegex = /^[1-9]\d{8}$/;

export const seatSelectionService = {
  async getTripSeats(tripId: string): Promise<SeatMapResponseDTO> {
    await wait();
    const data = generateSeatMapData(tripId);
    if (!data.seats.length) throw new Error(SEAT_SELECTION_ERRORS.TRIP_SEATS_NOT_FOUND);
    return toSeatMapResponseDTO(data);
  },

  async verifyCedula(cedula: string): Promise<{ valid: boolean; name: string }> {
    await wait(900);
    const valid = cedulaRegex.test(cedula.trim());
    return { valid, name: valid ? 'Pasajero verificado' : '' };
  },
};
