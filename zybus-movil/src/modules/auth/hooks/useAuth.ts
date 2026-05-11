import { useCallback } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { mapAuthUserFromDTO } from '../models/auth.mapper';
import {validateLoginForm,validateRegisterForm,validateVerificationForm,getAuthErrorMessage,} from '../utils/auth.validation';
import type {LoginFormData,RegisterFormData,VerificationFormData,AuthUser,} from '../models/auth.model';

interface UseAuthResult {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    handleLogin: (formData: LoginFormData) => Promise<boolean>;
    handleRegister: (formData: RegisterFormData) => Promise<boolean>;
    handleVerifyCode: (formData: VerificationFormData) => Promise<boolean>;
    handleLogout: () => Promise<boolean>;
}

export const useAuth = (): UseAuthResult => {
    const {
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
    } = useAuthStore();

    const withRequest = useCallback(
        async (requestFn: () => Promise<void>): Promise<boolean> => {
            setIsLoading(true);
            setError(null);

            try {
                await requestFn();
                return true;
            } catch (requestError) {
                if (requestError instanceof Error) {
                    setError(getAuthErrorMessage(requestError.message));
                } else {
                    setError(getAuthErrorMessage('UNKNOWN_ERROR'));
                }

                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [setError, setIsLoading],
    );

    const handleLogin = useCallback(
        async (formData: LoginFormData): Promise<boolean> => {
            const validationError = validateLoginForm(formData);

            if (validationError) {
                setError(getAuthErrorMessage(validationError));
                return false;
            }

            return withRequest(async () => {
                const dto = await authService.login(formData);

                setUser(mapAuthUserFromDTO(dto.user));
                setToken(dto.token);
                setIsAuthenticated(true);
            });
        },
        [setError, setIsAuthenticated, setToken, setUser, withRequest],
    );

    const handleRegister = useCallback(
        async (formData: RegisterFormData): Promise<boolean> => {
            const validationError = validateRegisterForm(formData);

            if (validationError) {
                setError(getAuthErrorMessage(validationError));
                return false;
            }

            return withRequest(async () => {
                const dto = await authService.register(formData);

                setUser(mapAuthUserFromDTO(dto.user));
                setToken(dto.token);
                setIsAuthenticated(true);
            });
        },
        [setError, setIsAuthenticated, setToken, setUser, withRequest],
    );

    const handleVerifyCode = useCallback(
        async (formData: VerificationFormData): Promise<boolean> => {
            const validationError = validateVerificationForm(formData);

            if (validationError) {
                setError(getAuthErrorMessage(validationError));
                return false;
            }

            return withRequest(async () => {
                await authService.verifyCode(formData);
            });
        },
        [setError, withRequest],
    );

    const handleLogout = useCallback(async (): Promise<boolean> => {
        return withRequest(async () => {
            await authService.logout();

            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
        });
    }, [setIsAuthenticated, setToken, setUser, withRequest]);

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        handleLogin,
        handleRegister,
        handleVerifyCode,
        handleLogout,
    };
};