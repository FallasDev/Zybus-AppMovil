export const TRIP_DETAIL_ERRORS = {
  TRIP_NOT_FOUND: 'TRIP_NOT_FOUND',
} as const;

export type TripDetailErrorCode = (typeof TRIP_DETAIL_ERRORS)[keyof typeof TRIP_DETAIL_ERRORS];

export const TRIP_DETAIL_TEXT = {
  TITLE: 'Detalle del viaje',
  STOPS_SECTION: 'Ruta y paradas',
  FARES_SECTION: 'Tarifas',
  BUS_SECTION: 'Información del bus',
  DURATION_LABEL: 'Duración estimada',
  DISTANCE_LABEL: 'Distancia',
  CAPACITY_LABEL: 'Capacidad total',
  LOADING: 'Cargando detalle...',
  SELECT_SEATS_BUTTON: 'Seleccionar asientos',
  MINUTES_SUFFIX: ' min',
  KM_SUFFIX: ' km',
  SEATS_SUFFIX: ' asientos',
  PRICE_CURRENCY: '₡',
} as const;

export const getDetailErrorMessage = (errorCode: string): string => {
  if (errorCode === TRIP_DETAIL_ERRORS.TRIP_NOT_FOUND) {
    return 'El viaje no fue encontrado.';
  }
  return 'Error inesperado.';
};
