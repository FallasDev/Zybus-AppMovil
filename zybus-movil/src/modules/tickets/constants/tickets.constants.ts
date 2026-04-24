export const TICKET_ERRORS = {
  TITLE_REQUIRED: 'TITLE_REQUIRED',
  ROUTE_REQUIRED: 'ROUTE_REQUIRED',
  SEAT_REQUIRED: 'SEAT_REQUIRED',
  OWNER_REQUIRED: 'OWNER_REQUIRED',
  OWNER_NOT_FOUND: 'OWNER_NOT_FOUND',
  TICKET_NOT_FOUND: 'TICKET_NOT_FOUND',
} as const;

export type TicketErrorCode = (typeof TICKET_ERRORS)[keyof typeof TICKET_ERRORS];

export const TICKETS_SCREEN_TEXT = {
  TITLE: 'Mis Tiquetes',
  SUBTITLE: 'Administra tus viajes y reservaciones',
  CREATE_BUTTON: 'Nuevo tiquete',
  UPDATE_BUTTON: 'Actualizar',
  CANCEL_BUTTON: 'Cancelar',
  EDIT_BUTTON: 'Editar',
  DELETE_BUTTON: 'Eliminar',
  EMPTY_TITLE: 'No tienes tiquetes todavía',
  EMPTY_SUBTITLE: 'Cuando crees o cargues tus tiquetes, aparecerán aquí.',
  LOADING: 'Cargando tiquetes...',
} as const;