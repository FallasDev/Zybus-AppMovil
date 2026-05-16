import { TRIP_SEARCH_ERRORS, type TripSearchErrorCode } from '../constants/trip-search.constants';
import type { TripSearchFormData } from '../models/trip-search.model';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const validateTripSearchForm = (data: TripSearchFormData): TripSearchErrorCode | null => {
  if (!data.originStopId) return TRIP_SEARCH_ERRORS.ORIGIN_REQUIRED;
  if (!data.destinationStopId) return TRIP_SEARCH_ERRORS.DESTINATION_REQUIRED;
  if (data.originStopId === data.destinationStopId) return TRIP_SEARCH_ERRORS.SAME_ORIGIN_DESTINATION;
  if (!data.date.trim()) return TRIP_SEARCH_ERRORS.DATE_REQUIRED;
  if (!dateRegex.test(data.date.trim())) return TRIP_SEARCH_ERRORS.DATE_INVALID_FORMAT;

  const selectedDate = new Date(`${data.date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) return TRIP_SEARCH_ERRORS.DATE_IN_PAST;

  if (data.passengers < 1) return TRIP_SEARCH_ERRORS.PASSENGERS_REQUIRED;

  return null;
};

export const getErrorMessage = (errorCode: string): string => {
  const messageMap: Record<TripSearchErrorCode, string> = {
    [TRIP_SEARCH_ERRORS.ORIGIN_REQUIRED]: 'Selecciona el origen.',
    [TRIP_SEARCH_ERRORS.DESTINATION_REQUIRED]: 'Selecciona el destino.',
    [TRIP_SEARCH_ERRORS.SAME_ORIGIN_DESTINATION]: 'El origen y destino no pueden ser iguales.',
    [TRIP_SEARCH_ERRORS.DATE_REQUIRED]: 'La fecha es requerida.',
    [TRIP_SEARCH_ERRORS.DATE_INVALID_FORMAT]: 'Usa el formato YYYY-MM-DD.',
    [TRIP_SEARCH_ERRORS.DATE_IN_PAST]: 'La fecha no puede ser en el pasado.',
    [TRIP_SEARCH_ERRORS.PASSENGERS_REQUIRED]: 'Debe haber al menos 1 pasajero.',
  };

  if (errorCode in messageMap) return messageMap[errorCode as TripSearchErrorCode];
  return 'Error inesperado.';
};
