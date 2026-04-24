import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppModal, LoadingState } from '../../../shared/components';
import { colors } from '../../../shared/theme/colors';
import { UserForm } from '../components/UserForm';
import { UserList } from '../components/UserList';
import { USERS_SCREEN_TEXT } from '../constants/users.constants';
import { useUsersCrud } from '../hooks/useUsersCrud';
import type { User, UserFormData } from '../models/user.model';

const initialFormData: UserFormData = {
  name: '',
  email: '',
};

export function UsersScreen(): ReactElement {
  const {
    users,
    isLoading,
    error,
    selectedUser,
    createUser,
    updateUser,
    deleteUser,
    selectUserForEdit,
    clearSelection,
  } = useUsersCrud();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  const isEditing = useMemo(() => Boolean(selectedUser), [selectedUser]);

  const openCreateModal = (): void => {
    clearSelection();
    setFormData(initialFormData);
    setIsModalVisible(true);
  };

  const openEditModal = (user: User): void => {
    selectUserForEdit(user);
    setFormData({
      name: user.name,
      email: user.email,
    });
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    clearSelection();
    setFormData(initialFormData);
    setIsModalVisible(false);
  };

  const handleChange = (field: keyof UserFormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    const success =
      isEditing && selectedUser
        ? await updateUser(selectedUser.id, formData)
        : await createUser(formData);

    if (success) {
      closeModal();
    }
  };

  const handleDeleteUser = async (userId: string): Promise<void> => {
    Alert.alert('Eliminar usuario', '¿Seguro que deseas eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          void deleteUser(userId);
        },
      },
    ]);
  };

  const header = (
    <>
      <View style={styles.headerCard}>
        <Text style={styles.title}>{USERS_SCREEN_TEXT.TITLE}</Text>
        <Text style={styles.subtitle}>{USERS_SCREEN_TEXT.SUBTITLE}</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{users.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{isLoading ? '...' : 'OK'}</Text>
            <Text style={styles.summaryLabel}>Estado</Text>
          </View>
        </View>

        <Pressable style={styles.createButton} onPress={openCreateModal}>
          <Text style={styles.createButtonText}>{USERS_SCREEN_TEXT.CREATE_BUTTON}</Text>
        </Pressable>
      </View>

      {isLoading ? <LoadingState message={USERS_SCREEN_TEXT.LOADING} /> : null}

      {error ? (
        <View style={[styles.feedbackCard, styles.errorCard]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </>
  );

  return (
    <View style={styles.wrapper}>
      <UserList
        users={users}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDeleteUser}
        header={header}
      />

      <AppModal
        visible={isModalVisible}
        title={isEditing ? 'Editar usuario' : 'Nuevo usuario'}
        onClose={closeModal}
      >
        <UserForm
          formData={formData}
          isLoading={isLoading}
          submitLabel={
            isEditing ? USERS_SCREEN_TEXT.UPDATE_BUTTON : USERS_SCREEN_TEXT.CREATE_BUTTON
          }
          onChange={handleChange}
          onSubmit={() => {
            void handleSubmit();
          }}
          onCancel={closeModal}
        />
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerCard: {
    backgroundColor: colors.brandBlue,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#eef2e8',
    fontSize: 14,
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 16,
    padding: 14,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  summaryLabel: {
    color: '#eef2e8',
    fontSize: 13,
    marginTop: 4,
  },
  createButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.brandBlue,
    fontSize: 16,
    fontWeight: '700',
  },
  feedbackCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  errorCard: {
    backgroundColor: '#fff1f1',
  },
  errorText: {
    color: '#b42318',
    textAlign: 'center',
    fontWeight: '700',
  },
});