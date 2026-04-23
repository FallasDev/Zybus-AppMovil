import type { ReactElement } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUsersCrud } from '../hooks/useUsersCrud';
import { UserForm } from '../components/UserForm';
import { UserList } from '../components/UserList';
import { USERS_SCREEN_TEXT } from '../constants/users.constants';
import type { RootStackParamList } from '../../../navigation/types';

type UsersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Users'>;

export const UsersScreen = (): ReactElement => {
  const navigation = useNavigation<UsersScreenNavigationProp>();
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

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{USERS_SCREEN_TEXT.TITLE}</Text>
        <Pressable style={styles.navButton} onPress={() => navigation.navigate('Tickets')}>
          <Text style={styles.navButtonText}>{USERS_SCREEN_TEXT.GO_TICKETS}</Text>
        </Pressable>
      </View>

      <UserForm
        selectedUser={selectedUser}
        isLoading={isLoading}
        onCreate={createUser}
        onUpdate={updateUser}
        onCancelEdit={clearSelection}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {isLoading ? <ActivityIndicator size="small" color="#0b63f6" style={styles.loader} /> : null}

      <UserList users={users} isLoading={isLoading} onEdit={selectUserForEdit} onDelete={deleteUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    flexShrink: 1,
  },
  navButton: {
    backgroundColor: '#e6f0ff',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navButtonText: {
    color: '#0b63f6',
    fontWeight: '700',
  },
  errorText: {
    color: '#b42318',
    marginBottom: 8,
    fontWeight: '600',
  },
  loader: {
    marginBottom: 8,
  },
});