import { USER_ERRORS, type UserErrorCode } from '../constants/users.constants';
import type { UserFormData } from '../models/user.model';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUserForm = ({ name, email }: UserFormData): UserErrorCode | null => {
  if (!name.trim()) {
    return USER_ERRORS.NAME_REQUIRED;
  }

  if (!email.trim()) {
    return USER_ERRORS.EMAIL_REQUIRED;
  }

  if (!emailRegex.test(email.trim())) {
    return USER_ERRORS.EMAIL_INVALID;
  }

  return null;
};

export const getErrorMessage = (errorCode: string): string => {
  const messageMap: Record<UserErrorCode, string> = {
    [USER_ERRORS.NAME_REQUIRED]: 'Name is required.',
    [USER_ERRORS.EMAIL_REQUIRED]: 'Email is required.',
    [USER_ERRORS.EMAIL_INVALID]: 'Email format is invalid.',
    [USER_ERRORS.USER_NOT_FOUND]: 'The user no longer exists.',
  };

  if (errorCode in messageMap) {
    return messageMap[errorCode as UserErrorCode];
  }

  return 'Unexpected error.';
};