import type { NotificationResponseDTO } from './notification.dto';
import type { Notification } from './notification.model';

export const mapNotificationFromDTO = (dto: NotificationResponseDTO): Notification => ({
  id: dto.id,
  title: dto.title,
  message: dto.message,
  sentAt: dto.sent_at,
  readAt: dto.read_at,
  isRead: dto.read_at !== null,
  priority: dto.priority_id !== null ? String(dto.priority_id) : 'NORMAL',
  type: dto.notification_type_id !== null ? String(dto.notification_type_id) : 'GENERAL',
});
