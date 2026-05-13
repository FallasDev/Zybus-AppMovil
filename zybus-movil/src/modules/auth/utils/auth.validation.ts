import {AUTH_ERRORS,type AuthErrorCode,} from '../constants/auth.constants';
import type {LoginFormData,RegisterFormData,VerificationFormData,} from '../models/auth.model';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = (
  data: LoginFormData,
): AuthErrorCode | null => {
  if (!data.email.trim()) {
    return AUTH_ERRORS.EMAIL_REQUIRED;
  }

  if (!emailRegex.test(data.email.trim())) {
    return AUTH_ERRORS.EMAIL_INVALID;
  }

  if (!data.password.trim()) {
    return AUTH_ERRORS.PASSWORD_REQUIRED;
  }

  return null;
};

export const validateRegisterForm = (
  data: RegisterFormData,
): AuthErrorCode | null => {
  if (!data.firstName.trim()) {
    return AUTH_ERRORS.FIRST_NAME_REQUIRED;
  }

  if (!data.lastName1.trim()) {
    return AUTH_ERRORS.LAST_NAME_1_REQUIRED;
  }

  if (!data.email.trim()) {
    return AUTH_ERRORS.EMAIL_REQUIRED;
  }

  if (!emailRegex.test(data.email.trim())) {
    return AUTH_ERRORS.EMAIL_INVALID;
  }

  if (!data.phone.trim()) {
    return AUTH_ERRORS.PHONE_REQUIRED;
  }

  if (!data.identificationNumber.trim()) {
    return AUTH_ERRORS.IDENTIFICATION_REQUIRED;
  }

  if (!data.password.trim()) {
    return AUTH_ERRORS.PASSWORD_REQUIRED;
  }

  if (data.password.length < 8) {
    return AUTH_ERRORS.PASSWORD_MIN_LENGTH;
  }

  if (data.password !== data.confirmPassword) {
    return AUTH_ERRORS.PASSWORDS_NOT_MATCH;
  }

  return null;
};

export const validateVerificationForm = (
  data: VerificationFormData,
): AuthErrorCode | null => {
  if (!data.code.trim()) {
    return AUTH_ERRORS.VERIFICATION_CODE_REQUIRED;
  }

  if (data.code.trim().length !== 4) {
    return AUTH_ERRORS.VERIFICATION_CODE_INVALID;
  }

  return null;
};

export const getAuthErrorMessage = (
  errorCode: string,
): string => {
  const messageMap: Record<AuthErrorCode, string> = {
    [AUTH_ERRORS.EMAIL_REQUIRED]:
      'El correo electrónico es requerido.',

    [AUTH_ERRORS.EMAIL_INVALID]:
      'El correo electrónico no es válido.',

    [AUTH_ERRORS.PASSWORD_REQUIRED]:
      'La contraseña es requerida.',

    [AUTH_ERRORS.PASSWORD_MIN_LENGTH]:
      'La contraseña debe tener al menos 8 caracteres.',

    [AUTH_ERRORS.PASSWORDS_NOT_MATCH]:
      'Las contraseñas no coinciden.',

    [AUTH_ERRORS.FIRST_NAME_REQUIRED]:
      'El nombre es requerido.',

    [AUTH_ERRORS.LAST_NAME_1_REQUIRED]:
      'El primer apellido es requerido.',

    [AUTH_ERRORS.PHONE_REQUIRED]:
      'El teléfono es requerido.',

    [AUTH_ERRORS.IDENTIFICATION_REQUIRED]:
      'La identificación es requerida.',

    [AUTH_ERRORS.TERMS_REQUIRED]:
      'Debes aceptar los términos y condiciones.',

    [AUTH_ERRORS.VERIFICATION_CODE_REQUIRED]:
      'El código de verificación es requerido.',

    [AUTH_ERRORS.VERIFICATION_CODE_INVALID]:
      'El código debe tener 4 dígitos.',
  };

  if (errorCode in messageMap) {
    return messageMap[errorCode as AuthErrorCode];
  }

  return 'Error inesperado.';
};