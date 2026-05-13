import { PROFILE_ERRORS, type ProfileErrorCode, } from '../constants/profile.constants';
import type { UpdateProfileFormData } from '../models/profile.model';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateProfileForm = (
    data: UpdateProfileFormData,
): ProfileErrorCode | null => {
    if (!data.firstName.trim()) return PROFILE_ERRORS.FIRST_NAME_REQUIRED;
    if (!data.email.trim()) return PROFILE_ERRORS.EMAIL_REQUIRED;
    if (!emailRegex.test(data.email.trim())) return PROFILE_ERRORS.EMAIL_INVALID;
    if (!data.phone.trim()) return PROFILE_ERRORS.PHONE_REQUIRED;
    if (!data.identificationNumber.trim()) return PROFILE_ERRORS.IDENTIFICATION_REQUIRED;

    return null;
};

export const getProfileErrorMessage = (errorCode: string): string => {
    const messageMap: Record<ProfileErrorCode, string> = {
        [PROFILE_ERRORS.FIRST_NAME_REQUIRED]: 'El nombre es requerido.',
        [PROFILE_ERRORS.EMAIL_REQUIRED]: 'El correo electrónico es requerido.',
        [PROFILE_ERRORS.EMAIL_INVALID]: 'El correo electrónico no es válido.',
        [PROFILE_ERRORS.PHONE_REQUIRED]: 'El teléfono es requerido.',
        [PROFILE_ERRORS.IDENTIFICATION_REQUIRED]: 'La identificación es requerida.',
    };

    if (errorCode in messageMap) return messageMap[errorCode as ProfileErrorCode];

    return 'Error inesperado.';
};