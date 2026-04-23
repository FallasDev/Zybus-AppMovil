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
  TITLE: 'Tickets CRUD (In-Memory)',
  CREATE_BUTTON: 'Create Ticket',
  UPDATE_BUTTON: 'Update Ticket',
  CANCEL_BUTTON: 'Cancel Edit',
  EDIT_BUTTON: 'Edit',
  DELETE_BUTTON: 'Delete',
  GO_USERS: 'Go to Users',
} as const;
