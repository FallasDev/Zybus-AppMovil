import type { ReactElement, ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../../shared/components';
import { colors } from '../../../shared/theme/colors';
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
  header?: ReactNode;
}

function UserItem({ user, isLoading, onEdit, onDelete }: UserItemProps): ReactElement {
  return (
    <View style={styles.itemCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
      </View>

      <View style={styles.infoWrap}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.meta}>
          {new Date(user.createdAt).toLocaleDateString()}
        </Text>

        <View style={styles.itemActions}>
          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
              isLoading && styles.disabledButton,
            ]}
            onPress={() => onEdit(user)}
            disabled={isLoading}
          >
            <Text style={styles.editButtonText}>{USERS_SCREEN_TEXT.EDIT_BUTTON}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.pressed,
              isLoading && styles.disabledButton,
            ]}
            onPress={() => onDelete(user.id)}
            disabled={isLoading}
          >
            <Text style={styles.deleteButtonText}>{USERS_SCREEN_TEXT.DELETE_BUTTON}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export function UserList({
  users,
  isLoading,
  onEdit,
  onDelete,
  header,
}: UserListProps): ReactElement {
  return (
    <FlatList<User>
      data={users}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<>{header}</>}
      ListEmptyComponent={
        <EmptyState
          title={USERS_SCREEN_TEXT.EMPTY_TITLE}
          description={USERS_SCREEN_TEXT.EMPTY_SUBTITLE}
        />
      }
      renderItem={({ item }) => (
        <UserItem user={item} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  itemCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brandBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  infoWrap: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  userEmail: {
    color: colors.gray,
    marginBottom: 6,
  },
  meta: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 12,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#e8f0ff',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.brandBlue,
    fontWeight: '700',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#fee2e2',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#b42318',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
  disabledButton: {
    opacity: 0.5,
  },
});