export const PAYMENT_METHODS = [
  { id: 1, label: 'Tarjeta' },
  { id: 2, label: 'SINPE Móvil' },
  { id: 3, label: 'Transferencia' },
] as const;

export const SALES_CHANNEL = {
  APP: 1,
  WEB: 2,
  BOX_OFFICE: 3,
  ON_BUS: 4,
} as const;

export const PAYMENT_STATUS = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PENDING: 'pending',
} as const;

export const PURCHASE_PAYMENT_TEXT = {
  SUMMARY_TITLE: 'Resumen de compra',
  SUMMARY_SUBTITLE: 'Verifica los datos antes de continuar',

  PAYMENT_TITLE: 'Método de pago',
  PAYMENT_SUBTITLE: 'Selecciona cómo deseas pagar',

  CONFIRMATION_APPROVED: 'Pago aprobado',
  CONFIRMATION_REJECTED: 'Pago rechazado',

  TICKET_TITLE: 'Ticket digital',

  ROUTE_LABEL: 'Ruta',
  SEAT_LABEL: 'Asiento',
  TOTAL_LABEL: 'Total',
  PAYMENT_METHOD_LABEL: 'Método de pago',
  STATUS_LABEL: 'Estado',
} as const;

export const PURCHASE_PAYMENT_ERRORS = {
  TICKET_REQUIRED: 'TICKET_REQUIRED',
  ROUTE_REQUIRED: 'ROUTE_REQUIRED',
  SEAT_REQUIRED: 'SEAT_REQUIRED',
  OWNER_USER_REQUIRED: 'OWNER_USER_REQUIRED',
  INVALID_TOTAL: 'INVALID_TOTAL',
  PAYMENT_METHOD_REQUIRED: 'PAYMENT_METHOD_REQUIRED',
  INVALID_PAYMENT_METHOD: 'INVALID_PAYMENT_METHOD',
} as const;

export type PurchasePaymentErrorCode =
  (typeof PURCHASE_PAYMENT_ERRORS)[keyof typeof PURCHASE_PAYMENT_ERRORS];