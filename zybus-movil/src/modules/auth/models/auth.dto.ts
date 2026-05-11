import type { LoginFormData, RegisterFormData } from './auth.model';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  first_name: string;
  last_name_1: string;
  last_name_2: string;
  email: string;
  phone: string;
  identification_number: string;
  password: string;
  password_confirmation: string;
}

export interface AuthUserDTO {
  id: string;
  first_name: string;
  last_name_1: string | null;
  last_name_2: string | null;
  email: string;
  phone: string;
  identification_number: string;
  state_id: string | null;
  role_id: string;
  is_active: boolean;
}

export interface AuthResponseDTO {
  token: string;
  user: AuthUserDTO;
}

export const toLoginRequestDTO = (data: LoginFormData): LoginRequestDTO => ({
  email: data.email,
  password: data.password,
});

export const toRegisterRequestDTO = (data: RegisterFormData): RegisterRequestDTO => ({
  first_name: data.firstName,
  last_name_1: data.lastName1,
  last_name_2: data.lastName2,
  email: data.email,
  phone: data.phone,
  identification_number: data.identificationNumber,
  password: data.password,
  password_confirmation: data.confirmPassword,
});