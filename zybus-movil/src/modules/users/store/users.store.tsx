import {
  createContext,
  type ReactElement,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { User } from '../models/user.model';

interface UsersStoreValue {
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
}

interface UsersProviderProps {
  children: ReactNode;
}

const UsersStoreContext = createContext<UsersStoreValue | null>(null);

export const UsersProvider = ({ children }: UsersProviderProps): ReactElement => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const value: UsersStoreValue = useMemo(
    () => ({
      users,
      isLoading,
      error,
      selectedUser,
      setUsers,
      setIsLoading,
      setError,
      setSelectedUser,
    }),
    [users, isLoading, error, selectedUser]
  );

  return <UsersStoreContext.Provider value={value}>{children}</UsersStoreContext.Provider>;
};

export const useUsersStore = () => {
  const context = useContext(UsersStoreContext);
  if (!context) {
    throw new Error('useUsersStore must be used inside UsersProvider');
  }
  return context;
};

export const useIsUserSelected = () => {
  const { selectedUser } = useUsersStore();
  return Boolean(selectedUser);
};