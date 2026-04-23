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
import type { User } from '../../users';
import type { Ticket } from '../models/ticket.model';

interface TicketsStoreValue {
  tickets: Ticket[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedTicket: Ticket | null;
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSelectedTicket: Dispatch<SetStateAction<Ticket | null>>;
}

interface TicketsProviderProps {
  children: ReactNode;
}

const TicketsStoreContext = createContext<TicketsStoreValue | null>(null);

export const TicketsProvider = ({ children }: TicketsProviderProps): ReactElement => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const value: TicketsStoreValue = useMemo(
    () => ({
      tickets,
      users,
      isLoading,
      error,
      selectedTicket,
      setTickets,
      setUsers,
      setIsLoading,
      setError,
      setSelectedTicket,
    }),
    [tickets, users, isLoading, error, selectedTicket]
  );

  return <TicketsStoreContext.Provider value={value}>{children}</TicketsStoreContext.Provider>;
};

export const useTicketsStore = (): TicketsStoreValue => {
  const context = useContext(TicketsStoreContext);
  if (!context) {
    throw new Error('useTicketsStore must be used inside TicketsProvider');
  }
  return context;
};
