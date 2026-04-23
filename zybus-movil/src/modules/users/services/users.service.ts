import {
  toCreateUserRequestDTO,
  toUpdateUserRequestDTO,
  toUserResponseDTO,
  type UserResponseDTO,
} from '../models/user.dto';
import { USER_ERRORS } from '../constants/users.constants';
import type { User, UserFormData } from '../models/user.model';

let usersDb: User[] = [
  {
    id: 'u_1',
    name: 'Ada Lovelace',
    email: 'ada@demo.com',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'u_2',
    name: 'Alan Turing',
    email: 'alan@demo.com',
    createdAt: new Date().toISOString(),
  },
];

const wait = (ms = 200): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const ensureUserExists = (userId: string): User => {
  const user = usersDb.find((item) => item.id === userId);
  if (!user) {
    throw new Error(USER_ERRORS.USER_NOT_FOUND);
  }
  return user;
};

export const usersService = {
  async getAllUsers(): Promise<UserResponseDTO[]> {
    await wait();
    return usersDb.map(toUserResponseDTO);
  },

  async getUserById(userId: string): Promise<UserResponseDTO> {
    await wait();
    const user = ensureUserExists(userId);
    return toUserResponseDTO(user);
  },

  async createUser(payload: UserFormData): Promise<UserResponseDTO> {
    await wait();
    const request = toCreateUserRequestDTO(payload);
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: request.name,
      email: request.email,
      createdAt: new Date().toISOString(),
    };

    usersDb = [newUser, ...usersDb];
    return toUserResponseDTO(newUser);
  },

  async updateUser(userId: string, payload: UserFormData): Promise<UserResponseDTO> {
    await wait();
    const existing = ensureUserExists(userId);
    const request = toUpdateUserRequestDTO(payload);

    const updated: User = {
      ...existing,
      name: request.name,
      email: request.email,
    };

    usersDb = usersDb.map((item) => (item.id === userId ? updated : item));
    return toUserResponseDTO(updated);
  },

  async deleteUser(userId: string): Promise<{ id: string }> {
    await wait();
    ensureUserExists(userId);
    usersDb = usersDb.filter((item) => item.id !== userId);
    return { id: userId };
  },
};