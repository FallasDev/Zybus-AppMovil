export interface Notification {
  id: string;
  title: string;
  message: string;
  sentAt: string;
  readAt: string | null;
  isRead: boolean;
  priority: string;
  type: string;
}
