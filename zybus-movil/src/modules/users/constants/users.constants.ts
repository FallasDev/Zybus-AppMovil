export const USER_ERRORS = {
  NAME_REQUIRED: 'NAME_REQUIRED',
  EMAIL_REQUIRED: 'EMAIL_REQUIRED',
  EMAIL_INVALID: 'EMAIL_INVALID',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const;

export type UserErrorCode = (typeof USER_ERRORS)[keyof typeof USER_ERRORS];

export const USERS_SCREEN_TEXT = {
  TITLE: 'Usuarios',
  SUBTITLE: 'Gestiona las personas asociadas a la app',
  CREATE_BUTTON: 'Nuevo usuario',
  UPDATE_BUTTON: 'Actualizar',
  CANCEL_BUTTON: 'Cancelar',
  EDIT_BUTTON: 'Editar',
  DELETE_BUTTON: 'Eliminar',
  EMPTY_TITLE: 'No hay usuarios todavía',
  EMPTY_SUBTITLE: 'Cuando crees usuarios, aparecerán aquí.',
  LOADING: 'Cargando usuarios...',
} as const;