export const SEAT_STATE_CODES = {
  FREE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
} as const;

export const SEAT_SELECTION_ERRORS = {
  MAX_SEATS_REACHED: 'MAX_SEATS_REACHED',
  SEAT_OCCUPIED: 'SEAT_OCCUPIED',
  TRIP_SEATS_NOT_FOUND: 'TRIP_SEATS_NOT_FOUND',
} as const;

export type SeatSelectionErrorCode =
  (typeof SEAT_SELECTION_ERRORS)[keyof typeof SEAT_SELECTION_ERRORS];

export const SEAT_SELECTION_TEXT = {
  TITLE: 'Seleccionar asientos',
  LOADING: 'Cargando mapa de asientos...',
  CONFIRM_BUTTON: 'Confirmar selección',
  SELECTED_SUFFIX: 'asientos seleccionados',
  LEGEND_FREE: 'Disponible',
  LEGEND_OCCUPIED: 'Ocupado',
  LEGEND_SELECTED: 'Seleccionado',
  EMPTY_TITLE: 'Sin mapa de asientos',
  EMPTY_SUBTITLE: 'Este bus no tiene asientos asignados.',
  DRIVER_LABEL: 'Conductor',
} as const;

export const getSeatErrorMessage = (errorCode: string): string => {
  const map: Record<SeatSelectionErrorCode, string> = {
    [SEAT_SELECTION_ERRORS.MAX_SEATS_REACHED]: 'Ya alcanzaste el máximo de asientos.',
    [SEAT_SELECTION_ERRORS.SEAT_OCCUPIED]: 'Este asiento está ocupado.',
    [SEAT_SELECTION_ERRORS.TRIP_SEATS_NOT_FOUND]: 'No se encontraron asientos para este viaje.',
  };
  if (errorCode in map) return map[errorCode as SeatSelectionErrorCode];
  return 'Error inesperado.';
};
