export const USER_ERRORS = {
  NAME_REQUIRED: 'NAME_REQUIRED',
  EMAIL_REQUIRED: 'EMAIL_REQUIRED',
  EMAIL_INVALID: 'EMAIL_INVALID',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const;

export type UserErrorCode = (typeof USER_ERRORS)[keyof typeof USER_ERRORS];

export const USERS_SCREEN_TEXT = {
  TITLE: 'Users CRUD (In-Memory)',
  CREATE_BUTTON: 'Create User',
  UPDATE_BUTTON: 'Update User',
  CANCEL_BUTTON: 'Cancel Edit',
  EDIT_BUTTON: 'Edit',
  DELETE_BUTTON: 'Delete',
  GO_TICKETS: 'Go to Tickets',
} as const;