import type { ProfileDTO } from './profile.dto';
import type { ProfileData } from './profile.model';

export const mapProfileFromDTO = (dto: ProfileDTO): ProfileData => ({
  id: dto.id,
  firstName: dto.first_name,
  lastName1: dto.last_name_1,
  lastName2: dto.last_name_2,
  email: dto.email,
  phone: dto.phone,
  identificationNumber: dto.identification_number,
  address: dto.address,
  profileImage: dto.profile_image,
});