import { toNotificationResponseDTO, type NotificationResponseDTO } from '../models/notification.dto';
import type { Notification } from '../models/notification.model';

let mockDb: Notification[] = [
  {
    id: 'n_1',
    title: 'Tu viaje está por comenzar',
    message: 'El bus San José – Alajuela sale en 15 minutos desde la parada Central. ¡Prepárate!',
    sentAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    readAt: null,
    isRead: false,
    priority: 'HIGH',
    type: 'TRIP_REMINDER',
  },
  {
    id: 'n_2',
    title: 'Pago confirmado',
    message: 'Tu pago de ₡1,200 para el viaje San José – Alajuela fue procesado exitosamente.',
    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    readAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    isRead: true,
    priority: 'NORMAL',
    type: 'PAYMENT',
  },
  {
    id: 'n_3',
    title: 'Cambio de horario',
    message: 'El viaje de las 14:00 San José – Liberia fue reprogramado para las 14:30 por condiciones climáticas.',
    sentAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    readAt: null,
    isRead: false,
    priority: 'HIGH',
    type: 'SCHEDULE_CHANGE',
  },
  {
    id: 'n_4',
    title: 'Viaje completado',
    message: '¡Gracias por viajar con Zybus! Tu viaje San José – Cartago ha finalizado.',
    sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    readAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    priority: 'LOW',
    type: 'TRIP_COMPLETED',
  },
  {
    id: 'n_5',
    title: 'Oferta especial',
    message: 'Esta semana 20% de descuento en rutas Heredia – San José. Válido hasta el domingo.',
    sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
    isRead: true,
    priority: 'NORMAL',
    type: 'PROMOTION',
  },
];

const wait = (ms = 300): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const notificationsService = {
  async getNotifications(): Promise<NotificationResponseDTO[]> {
    await wait();
    return [...mockDb]
      .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
      .map(toNotificationResponseDTO);
  },

  async markAsRead(id: string): Promise<void> {
    await wait(150);
    mockDb = mockDb.map((n) =>
      n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n
    );
  },

  async markAllAsRead(): Promise<void> {
    await wait(200);
    const now = new Date().toISOString();
    mockDb = mockDb.map((n) => (n.isRead ? n : { ...n, isRead: true, readAt: now }));
  },
};
