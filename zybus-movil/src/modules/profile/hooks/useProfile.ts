import { useCallback, useEffect } from 'react';
import { profileService } from '../services/profile.service';
import { useProfileStore } from '../store/profile.store';
import { mapProfileFromDTO } from '../models/profile.mapper';
import { toUpdateProfileRequestDTO } from '../models/profile.dto';
import type { UpdateProfileFormData } from '../models/profile.model';

import {
    getProfileErrorMessage,
    validateProfileForm,
} from '../utils/profile.validation';

export const useProfile = () => {
    const {
        profile,
        isLoading,
        error,
        setProfile,
        setIsLoading,
        setError,
    } = useProfileStore();

    const withRequest = useCallback(
        async (requestFn: () => Promise<void>): Promise<boolean> => {
            setIsLoading(true);
            setError(null);

            try {
                await requestFn();
                return true;
            } catch (requestError) {
                if (requestError instanceof Error) {
                    setError(getProfileErrorMessage(requestError.message));
                } else {
                    setError(getProfileErrorMessage('UNKNOWN_ERROR'));
                }

                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [setError, setIsLoading],
    );

    const loadProfile = useCallback(async () => {
        return withRequest(async () => {
            const dto = await profileService.getProfile();

            setProfile(mapProfileFromDTO(dto));
        });
    }, [setProfile, withRequest]);

    const handleUpdateProfile = useCallback(
        async (formData: UpdateProfileFormData): Promise<boolean> => {
            const validationError = validateProfileForm(formData);

            if (validationError) {
                setError(getProfileErrorMessage(validationError));
                return false;
            }

            return withRequest(async () => {
                const dto = await profileService.updateProfile(
                    toUpdateProfileRequestDTO(formData),
                );

                setProfile(mapProfileFromDTO(dto));
            });
        },
        [setError, setProfile, withRequest],
    );

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return {
        profile,
        isLoading,
        error,
        loadProfile,
        handleUpdateProfile,
    };
};