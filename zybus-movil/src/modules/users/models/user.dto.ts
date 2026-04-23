import type { User, UserFormData } from './user.model';

export interface UserRequestDTO {
  name: string;
  email: string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export const toCreateUserRequestDTO = ({ name, email }: UserFormData): UserRequestDTO => ({
  name: name.trim(),
  email: email.trim().toLowerCase(),
});

export const toUpdateUserRequestDTO = ({ name, email }: UserFormData): UserRequestDTO => ({
  name: name.trim(),
  email: email.trim().toLowerCase(),
});

export const toUserResponseDTO = (userRecord: User): UserResponseDTO => ({
  id: userRecord.id,
  name: userRecord.name,
  email: userRecord.email,
  created_at: userRecord.createdAt,
});