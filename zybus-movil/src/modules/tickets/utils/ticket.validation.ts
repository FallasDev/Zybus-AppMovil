import {
  TICKET_ERRORS,
  type TicketErrorCode,
} from '../constants/tickets.constants';
import type { TicketFormData } from '../models/ticket.model';

export const validateTicketForm = ({
  tripId,
  tripSeatId,
  purchaseId,
}: TicketFormData): TicketErrorCode | null => {
  if (
    tripId === '' ||
    tripId === null ||
    tripId === undefined
  ) {
    return TICKET_ERRORS.TRIP_REQUIRED;
  }

  if (
    tripSeatId === '' ||
    tripSeatId === null ||
    tripSeatId === undefined
  ) {
    return TICKET_ERRORS.SEAT_REQUIRED;
  }

  if (
    purchaseId === '' ||
    purchaseId === null ||
    purchaseId === undefined
  ) {
    return TICKET_ERRORS.PURCHASE_REQUIRED;
  }

  return null;
};

/* =========================================================
   ERROR MESSAGES
========================================================= */

export const getTicketErrorMessage = (
  errorCode: TicketErrorCode
): string => {
  const errorMessages: Record<
    TicketErrorCode,
    string
  > = {
    TRIP_REQUIRED:
      'Debe seleccionar un viaje.',

    SEAT_REQUIRED:
      'Debe seleccionar un asiento.',

    PURCHASE_REQUIRED:
      'Debe seleccionar una compra.',

    STATE_REQUIRED:
      'Debe seleccionar un estado.',

    TICKET_NOT_FOUND:
      'No se encontró el tiquete.',

    TICKET_ALREADY_USED:
      'El tiquete ya fue utilizado.',

    TICKET_EXPIRED:
      'El tiquete ha expirado.',

    SEAT_ALREADY_RESERVED:
      'El asiento ya está reservado.',

    INVALID_QR:
      'El código QR es inválido.',

    INVALID_CONFIRMATION:
      'El número de confirmación es inválido.',
      
    UNKNOWN: 'Ocurrió un error inesperado. Intenta nuevamente',
  };

  return (
    errorMessages[errorCode] ??
    'Unexpected error.'
  );
};