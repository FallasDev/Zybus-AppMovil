export interface ProfileData {
  id: string;
  firstName: string;
  lastName1: string | null;
  lastName2: string | null;
  email: string;
  phone: string;
  identificationNumber: string;
  address: string | null;
  profileImage: string | null;
}

export interface UpdateProfileFormData {
  firstName: string;
  lastName1: string;
  lastName2: string;
  email: string;
  phone: string;
  identificationNumber: string;
  address: string;
  profileImage: string;
}