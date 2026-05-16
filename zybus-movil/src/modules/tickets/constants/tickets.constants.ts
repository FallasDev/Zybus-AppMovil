
/*TICKET ERRORS */

export const TICKET_ERRORS = {
  /* Form validation */
  TRIP_REQUIRED: 'TRIP_REQUIRED',
  SEAT_REQUIRED: 'SEAT_REQUIRED',
  PURCHASE_REQUIRED: 'PURCHASE_REQUIRED',
  STATE_REQUIRED: 'STATE_REQUIRED',

  /* Business logic */
  TICKET_NOT_FOUND: 'TICKET_NOT_FOUND',
  TICKET_ALREADY_USED:
    'TICKET_ALREADY_USED',
  TICKET_EXPIRED:
    'TICKET_EXPIRED',
  SEAT_ALREADY_RESERVED:
    'SEAT_ALREADY_RESERVED',
  INVALID_QR: 'INVALID_QR',
  INVALID_CONFIRMATION:
    'INVALID_CONFIRMATION',
    UNKNOWN: 'UNKNOWN',
} as const;


export type TicketErrorCode =
  (typeof TICKET_ERRORS)[keyof typeof TICKET_ERRORS];

/* SCREEN TEXTS */

export const TICKETS_SCREEN_TEXT = {
 
  TITLE: 'Mis Tiquetes',

  SUBTITLE:
    'Administra tus tiquetes y reservaciones',

  LOADING: 'Cargando tiquetes...',

  EMPTY_TITLE:
    'No tienes tiquetes todavía',

  EMPTY_SUBTITLE:
    'Cuando compres o reserves tiquetes, aparecerán aquí.',

  /* =========================
     BUTTONS
  ========================= */

  CREATE_BUTTON: 'Comprar tiquete',

  UPDATE_BUTTON: 'Actualizar',

  DETAIL_BUTTON: 'Detalles',

  DELETE_BUTTON: 'Eliminar',

  CANCEL_BUTTON: 'Cancelar',

  SAVE_BUTTON: 'Guardar',

  /* SECTIONS*/

  ACTIVE_SECTION: 'Tiquetes activos',

  PAST_SECTION: 'Historial de viajes',

  /* DETAILS */

  QR_TITLE: 'Código QR',

  CONFIRMATION_TITLE:
    'Número de confirmación',

  PRICE_TITLE: 'Precio',

  SEAT_TITLE: 'Asiento',

  ROUTE_TITLE: 'Ruta',

  PASSENGER_TITLE: 'Pasajero',

  STATUS_TITLE: 'Estado',

  PURCHASE_DATE_TITLE:
    'Fecha de compra',

  DEPARTURE_DATE_TITLE:
    'Fecha de salida',
} as const;

/* =========================================================
   TICKET STATUS
========================================================= */

export const TICKET_STATUS = {
  ACTIVE: 'ACTIVE',

  USED: 'USED',

  CANCELLED: 'CANCELLED',

  EXPIRED: 'EXPIRED',
} as const;

/* =========================================================
   STATUS TYPE
========================================================= */

export type TicketStatus =
  (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

/* =========================================================
   STATUS LABELS
========================================================= */

export const TICKET_STATUS_LABELS: Record<
  TicketStatus,
  string
> = {
  ACTIVE: 'Activo',

  USED: 'Pasado',

  CANCELLED: 'Cancelado',

  EXPIRED: 'Expirado',
};

/* STATUS COLORS */

export const TICKET_STATUS_COLORS: Record<
  TicketStatus,
  string
> = {
  ACTIVE: '#16a34a',

  USED: '#2563eb',

  CANCELLED: '#dc2626',

  EXPIRED: '#6b7280',
};