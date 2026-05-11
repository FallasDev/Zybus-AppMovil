import {createContext,type Dispatch,type ReactElement,type ReactNode,type SetStateAction,useContext,useMemo,useState,} from 'react';
import type { AuthUser } from '../models/auth.model';

interface AuthStoreValue {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    setUser: Dispatch<SetStateAction<AuthUser | null>>;
    setToken: Dispatch<SetStateAction<string | null>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthStoreContext = createContext<AuthStoreValue | null>(null);

export const AuthProvider = ({
    children,
}: AuthProviderProps): ReactElement => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const value: AuthStoreValue = useMemo(
        () => ({
            user,
            token,
            isAuthenticated,
            isLoading,
            error,

            setUser,
            setToken,
            setIsAuthenticated,
            setIsLoading,
            setError,
        }),
        [
            user,
            token,
            isAuthenticated,
            isLoading,
            error,
        ],
    );

    return (
        <AuthStoreContext.Provider value={value}>
            {children}
        </AuthStoreContext.Provider>
    );
};

export const useAuthStore = () => {
    const context = useContext(AuthStoreContext);

    if (!context) {
        throw new Error(
            'useAuthStore must be used inside AuthProvider',
        );
    }

    return context;
};