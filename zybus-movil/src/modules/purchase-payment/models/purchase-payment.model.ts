export type PaymentStatus = 'approved' | 'rejected';

export type PaymentMethodLabel = 'Tarjeta' | 'SINPE Móvil' | 'Transferencia';

export type PurchaseData = {
  passengerName: string;
  passengerId: string;
  seat: string;
  finalPrice: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
};

export type PaymentResult = {
  status: PaymentStatus;
  confirmationNumber?: string;
};

export type PurchaseTicket = {
  confirmationNumber: string;
  passengerName: string;
  seat: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  qrCode?: string;
};