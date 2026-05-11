import type { AuthUserDTO } from './auth.dto';
import type { AuthUser } from './auth.model';

export const mapAuthUserFromDTO = (dto: AuthUserDTO): AuthUser => ({
  id: dto.id,
  firstName: dto.first_name,
  lastName1: dto.last_name_1,
  lastName2: dto.last_name_2,
  email: dto.email,
  phone: dto.phone,
  identificationNumber: dto.identification_number,
  stateId: dto.state_id,
  roleId: dto.role_id,
  isActive: dto.is_active,
});