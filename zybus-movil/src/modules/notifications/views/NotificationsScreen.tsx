import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import { EmptyState, LoadingState } from '../../../shared/components';
import type { AppTheme } from '../../../shared/theme/types';
import { useNotifications } from '../hooks/useNotifications';
import type { Notification } from '../models/notification.model';
import { NOTIFICATIONS_TEXT } from '../constants/notifications.constants';

const TYPE_ICONS: Record<string, { name: keyof typeof Ionicons.glyphMap; color?: string }> = {
  TRIP_REMINDER: { name: 'bus-outline' },
  PAYMENT: { name: 'card-outline' },
  SCHEDULE_CHANGE: { name: 'time-outline' },
  TRIP_COMPLETED: { name: 'checkmark-circle-outline' },
  PROMOTION: { name: 'pricetag-outline' },
  GENERAL: { name: 'notifications-outline' },
};

const timeAgo = (isoString: string): string => {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Ahora';
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} d`;
};

interface NotificationCardProps {
  item: Notification;
  onPress: () => void;
  theme: AppTheme;
  styles: ReturnType<typeof makeStyles>;
}

function NotificationCard({ item, onPress, theme, styles }: NotificationCardProps): ReactElement {
  const icon = TYPE_ICONS[item.type] ?? TYPE_ICONS.GENERAL;
  return (
    <Pressable
      style={[styles.card, !item.isRead && styles.cardUnread]}
      onPress={onPress}
    >
      {!item.isRead && <View style={styles.unreadDot} />}
      <View style={[styles.iconCircle, !item.isRead && styles.iconCircleUnread]}>
        <Ionicons name={icon.name} size={20} color={item.isRead ? theme.colors.textSecondary : theme.colors.brandBlue} />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, !item.isRead && styles.cardTitleUnread]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardMessage} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.cardTime}>{timeAgo(item.sentAt)}</Text>
      </View>
    </Pressable>
  );
}

export function NotificationsScreen(): ReactElement {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { notifications, isLoading, error, markAsRead, markAllAsRead } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{NOTIFICATIONS_TEXT.TITLE}</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllBtn}>{NOTIFICATIONS_TEXT.MARK_ALL_READ}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>

      {isLoading ? (
        <LoadingState message={NOTIFICATIONS_TEXT.LOADING} />
      ) : error ? (
        <View style={styles.errorWrap}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <EmptyState
              title={NOTIFICATIONS_TEXT.EMPTY_TITLE}
              description={NOTIFICATIONS_TEXT.EMPTY_SUBTITLE}
            />
          }
          renderItem={({ item }) => (
            <NotificationCard
              item={item}
              onPress={() => !item.isRead && markAsRead(item.id)}
              theme={theme}
              styles={styles}
            />
          )}
        />
      )}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 52,
      paddingBottom: 12,
      gap: 12,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      flex: 1,
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    markAllBtn: {
      fontSize: theme.typography.xs,
      color: theme.colors.brandBlue,
      fontWeight: '600',
    },
    headerSpacer: {
      width: 60,
    },
    list: {
      padding: 16,
      gap: 10,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      borderLeftWidth: 3,
      borderLeftColor: 'transparent',
    },
    cardUnread: {
      borderLeftColor: theme.colors.brandBlue,
      backgroundColor: theme.colors.surfaceAlt,
    },
    unreadDot: {
      position: 'absolute',
      top: 14,
      right: 14,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.brandBlue,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconCircleUnread: {
      backgroundColor: 'rgba(21,47,82,0.12)',
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: theme.typography.sm,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    cardTitleUnread: {
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    cardMessage: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      lineHeight: 18,
      marginBottom: 6,
    },
    cardTime: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
    },
    errorWrap: {
      margin: 20,
      padding: 16,
      backgroundColor: theme.colors.errorSurface,
      borderRadius: 12,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.sm,
    },
  });
}
