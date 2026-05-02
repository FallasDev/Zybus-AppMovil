export const TRIP_SEARCH_ERRORS = {
  ORIGIN_REQUIRED: 'ORIGIN_REQUIRED',
  DESTINATION_REQUIRED: 'DESTINATION_REQUIRED',
  SAME_ORIGIN_DESTINATION: 'SAME_ORIGIN_DESTINATION',
  DATE_REQUIRED: 'DATE_REQUIRED',
  DATE_INVALID_FORMAT: 'DATE_INVALID_FORMAT',
  DATE_IN_PAST: 'DATE_IN_PAST',
  PASSENGERS_REQUIRED: 'PASSENGERS_REQUIRED',
} as const;

export type TripSearchErrorCode = (typeof TRIP_SEARCH_ERRORS)[keyof typeof TRIP_SEARCH_ERRORS];

export const TRIP_SEARCH_TEXT = {
  TITLE: 'Buscar viaje',
  ORIGIN_LABEL: 'ORIGEN',
  ORIGIN_PLACEHOLDER: 'Selecciona el origen',
  DESTINATION_LABEL: 'DESTINO',
  DESTINATION_PLACEHOLDER: 'Selecciona el destino',
  DATE_LABEL: 'FECHA',
  DATE_PLACEHOLDER: 'Selecciona una fecha',
  PASSENGERS_LABEL: 'PASAJEROS',
  NORMAL_LABEL: 'Adulto',
  SENIOR_LABEL: 'Adulto mayor',
  ID_LABEL: 'Cédula',
  ID_PLACEHOLDER: 'Ingresa la cédula',
  SEARCH_BUTTON: 'Buscar viajes',
  LOADING: 'Buscando...',
  PICK_STOP_TITLE: 'Selecciona una parada',
  CANCEL: 'Cancelar',
} as const;

export const SEARCH_RESULTS_TEXT = {
  TITLE: 'Resultados',
  EMPTY_TITLE: 'Sin viajes disponibles',
  EMPTY_SUBTITLE: 'Intenta con otra fecha o destino.',
  LOADING: 'Cargando resultados...',
  SEATS_AVAILABLE: 'asientos libres',
  PRICE_FROM: 'Desde ₡',
} as const;
