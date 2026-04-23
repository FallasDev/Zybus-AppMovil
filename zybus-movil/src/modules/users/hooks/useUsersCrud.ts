import { useCallback, useEffect } from 'react';
import { usersService } from '../services/users.service';
import { useUsersStore } from '../store/users.store';
import { mapUserFromResponseDTO } from '../models/user.mapper';
import { validateUserForm, getErrorMessage } from '../utils/user.validation';
import type { User, UserFormData } from '../models/user.model';

interface UseUsersCrudResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
  fetchUsers: () => Promise<void>;
  createUser: (formData: UserFormData) => Promise<boolean>;
  updateUser: (userId: string, formData: UserFormData) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<void>;
  selectUserForEdit: (user: User) => void;
  clearSelection: () => void;
}

export const useUsersCrud = (): UseUsersCrudResult => {
  const {
    users,
    isLoading,
    error,
    selectedUser,
    setUsers,
    setIsLoading,
    setError,
    setSelectedUser,
  } = useUsersStore();

  const withRequest = useCallback(
    async (requestFn: () => Promise<void>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await requestFn();
        return true;
      } catch (requestError) {
        if (requestError instanceof Error) {
          setError(getErrorMessage(requestError.message));
        } else {
          setError(getErrorMessage('UNKNOWN_ERROR'));
        }
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading]
  );

  const fetchUsers = useCallback(async () => {
    await withRequest(async () => {
      const dtos = await usersService.getAllUsers();
      const mapped = dtos.map(mapUserFromResponseDTO);
      setUsers(mapped);
    });
  }, [setUsers, withRequest]);

  const createUser = useCallback(
    async (formData: UserFormData): Promise<boolean> => {
      const validationError = validateUserForm(formData);
      if (validationError) {
        setError(getErrorMessage(validationError));
        return false;
      }

      return withRequest(async () => {
        const dto = await usersService.createUser(formData);
        const mapped = mapUserFromResponseDTO(dto);
        setUsers((prev) => [mapped, ...prev]);
      });
    },
    [setError, setUsers, withRequest]
  );

  const updateUser = useCallback(
    async (userId: string, formData: UserFormData): Promise<boolean> => {
      const validationError = validateUserForm(formData);
      if (validationError) {
        setError(getErrorMessage(validationError));
        return false;
      }

      return withRequest(async () => {
        const dto = await usersService.updateUser(userId, formData);
        const mapped = mapUserFromResponseDTO(dto);
        setUsers((prev) => prev.map((item) => (item.id === userId ? mapped : item)));
      });
    },
    [setError, setUsers, withRequest]
  );

  const deleteUser = useCallback(
    async (userId: string): Promise<void> => {
      await withRequest(async () => {
        await usersService.deleteUser(userId);
        setUsers((prev) => prev.filter((item) => item.id !== userId));
      });
    },
    [setUsers, withRequest]
  );

  const selectUserForEdit = useCallback(
    (user: User): void => {
      setError(null);
      setSelectedUser(user);
    },
    [setError, setSelectedUser]
  );

  const clearSelection = useCallback(() => {
    setSelectedUser(null);
  }, [setSelectedUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    selectedUser,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    selectUserForEdit,
    clearSelection,
  };
};