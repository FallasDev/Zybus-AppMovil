export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName1: string;
  lastName2: string;
  email: string;
  phone: string;
  identificationNumber: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationFormData {
  code: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName1: string | null;
  lastName2: string | null;
  email: string;
  phone: string;
  identificationNumber: string;
  stateId: string | null;
  roleId: string;
  isActive: boolean;
}