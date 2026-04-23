export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
}

export const createUserModel = ({ id, name, email, createdAt }: User): User => ({
  id,
  name,
  email,
  createdAt,
});