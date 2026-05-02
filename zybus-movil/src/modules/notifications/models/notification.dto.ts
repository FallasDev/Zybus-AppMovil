import type { Notification } from './notification.model';

export interface NotificationResponseDTO {
  id: string;
  title: string;
  message: string;
  sent_at: string;
  read_at: string | null;
  state_id: number | null;
  priority_id: number | null;
  notification_type_id: number | null;
  is_active: number;
}

export const toNotificationResponseDTO = (n: Notification): NotificationResponseDTO => ({
  id: n.id,
  title: n.title,
  message: n.message,
  sent_at: n.sentAt,
  read_at: n.readAt,
  state_id: null,
  priority_id: null,
  notification_type_id: null,
  is_active: 1,
});
