import { useCallback, useEffect } from 'react';
import { notificationsService } from '../services/notifications.service';
import { useNotificationsStore } from '../store/notifications.store';
import { mapNotificationFromDTO } from '../models/notification.mapper';
import type { Notification } from '../models/notification.model';

interface UseNotificationsResult {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotifications = (): UseNotificationsResult => {
  const { notifications, isLoading, error, setNotifications, setIsLoading, setError } =
    useNotificationsStore();

  const withRequest = useCallback(
    async (fn: () => Promise<void>): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        await fn();
      } catch {
        setError('No se pudieron cargar las notificaciones.');
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading]
  );

  const loadNotifications = useCallback(async () => {
    await withRequest(async () => {
      const dtos = await notificationsService.getNotifications();
      setNotifications(dtos.map(mapNotificationFromDTO));
    });
  }, [setNotifications, withRequest]);

  const markAsRead = useCallback(
    async (id: string): Promise<void> => {
      await notificationsService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
      );
    },
    [setNotifications]
  );

  const markAllAsRead = useCallback(async (): Promise<void> => {
    await notificationsService.markAllAsRead();
    const now = new Date().toISOString();
    setNotifications((prev) => prev.map((n) => (n.isRead ? n : { ...n, isRead: true, readAt: now })));
  }, [setNotifications]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return { notifications, isLoading, error, markAsRead, markAllAsRead };
};
