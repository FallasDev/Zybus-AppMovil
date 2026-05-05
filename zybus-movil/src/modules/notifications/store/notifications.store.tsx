import {
  createContext,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { Notification } from '../models/notification.model';

interface NotificationsStoreValue {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

interface NotificationsProviderProps {
  children: ReactNode;
}

const NotificationsStoreContext = createContext<NotificationsStoreValue | null>(null);

export const NotificationsProvider = ({ children }: NotificationsProviderProps): ReactElement => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: NotificationsStoreValue = useMemo(
    () => ({ notifications, isLoading, error, setNotifications, setIsLoading, setError }),
    [notifications, isLoading, error]
  );

  return (
    <NotificationsStoreContext.Provider value={value}>
      {children}
    </NotificationsStoreContext.Provider>
  );
};

export const useNotificationsStore = () => {
  const context = useContext(NotificationsStoreContext);
  if (!context) throw new Error('useNotificationsStore must be used inside NotificationsProvider');
  return context;
};

export const useUnreadCount = () => {
  const { notifications } = useNotificationsStore();
  return notifications.filter((n) => !n.isRead).length;
};
