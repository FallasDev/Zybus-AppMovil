import type { UpdateProfileFormData } from './profile.model';

export interface ProfileDTO {
  id: string;
  first_name: string;
  last_name_1: string | null;
  last_name_2: string | null;
  email: string;
  phone: string;
  identification_number: string;
  address: string | null;
  profile_image: string | null;
}

export interface UpdateProfileRequestDTO {
  first_name: string;
  last_name_1: string;
  last_name_2: string;
  email: string;
  phone: string;
  identification_number: string;
  address: string;
  profile_image: string;
}

export const toUpdateProfileRequestDTO = (
  data: UpdateProfileFormData,
): UpdateProfileRequestDTO => ({
  first_name: data.firstName,
  last_name_1: data.lastName1,
  last_name_2: data.lastName2,
  email: data.email,
  phone: data.phone,
  identification_number: data.identificationNumber,
  address: data.address,
  profile_image: data.profileImage,
});