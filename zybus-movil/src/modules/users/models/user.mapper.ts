import type { UserResponseDTO } from './user.dto';
import type { User } from './user.model';
import { createUserModel } from './user.model';

export const mapUserFromResponseDTO = (dto: UserResponseDTO): User =>
  createUserModel({
    id: dto.id,
    name: dto.name,
    email: dto.email,
    createdAt: dto.created_at,
  });