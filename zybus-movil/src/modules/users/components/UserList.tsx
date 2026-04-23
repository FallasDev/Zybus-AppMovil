import type { ReactElement } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { USERS_SCREEN_TEXT } from '../constants/users.constants';
import type { User } from '../models/user.model';

interface UserItemProps {
  user: User;
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => Promise<void>;
}

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => Promise<void>;
}

const UserItem = ({ user, isLoading, onEdit, onDelete }: UserItemProps): ReactElement => {
  return (
    <View style={styles.itemCard}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>

      <View style={styles.itemActions}>
        <Pressable style={styles.editButton} onPress={() => onEdit(user)} disabled={isLoading}>
          <Text style={styles.editButtonText}>{USERS_SCREEN_TEXT.EDIT_BUTTON}</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(user.id)}
          disabled={isLoading}
        >
          <Text style={styles.deleteButtonText}>{USERS_SCREEN_TEXT.DELETE_BUTTON}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const UserList = ({ users, isLoading, onEdit, onDelete }: UserListProps): ReactElement => {
  if (!users.length) {
    return <Text style={styles.emptyText}>No users yet. Create your first user.</Text>;
  }

  return (
    <FlatList<User>
      data={users}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <UserItem user={item} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    gap: 10,
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  userEmail: {
    marginTop: 4,
    color: '#475467',
  },
  itemActions: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#0b63f6',
    fontWeight: '700',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#b42318',
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 10,
    color: '#667085',
    textAlign: 'center',
  },
});