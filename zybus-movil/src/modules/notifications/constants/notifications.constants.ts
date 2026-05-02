export const NOTIFICATIONS_ERRORS = {
  LOAD_FAILED: 'LOAD_FAILED',
} as const;

export type NotificationsErrorCode =
  (typeof NOTIFICATIONS_ERRORS)[keyof typeof NOTIFICATIONS_ERRORS];

export const NOTIFICATIONS_TEXT = {
  TITLE: 'Notificaciones',
  EMPTY_TITLE: 'Sin notificaciones',
  EMPTY_SUBTITLE: 'Cuando tengas avisos, aparecerán aquí.',
  LOADING: 'Cargando notificaciones...',
  MARK_ALL_READ: 'Marcar todo como leído',
  BACK: 'Volver',
} as const;
