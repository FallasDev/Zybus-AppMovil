import {createContext,type Dispatch,type ReactElement,type ReactNode,type SetStateAction,useContext,useMemo,useState,} from 'react';
import type { ProfileData } from '../models/profile.model';

interface ProfileStoreValue {
    profile: ProfileData | null;
    isLoading: boolean;
    error: string | null;
    setProfile: Dispatch<SetStateAction<ProfileData | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
}

interface ProfileProviderProps {
    children: ReactNode;
}

const ProfileStoreContext = createContext<ProfileStoreValue | null>(null);

export const ProfileProvider = ({
    children,
}: ProfileProviderProps): ReactElement => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const value: ProfileStoreValue = useMemo(
        () => ({
            profile,
            isLoading,
            error,
            setProfile,
            setIsLoading,
            setError,
        }),
        [profile, isLoading, error],
    );

    return (
        <ProfileStoreContext.Provider value={value}>
            {children}
        </ProfileStoreContext.Provider>
    );
};

export const useProfileStore = () => {
    const context = useContext(ProfileStoreContext);

    if (!context) {
        throw new Error(
            'useProfileStore must be used inside ProfileProvider',
        );
    }

    return context;
};