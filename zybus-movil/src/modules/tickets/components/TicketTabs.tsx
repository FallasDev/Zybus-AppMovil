import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

import {
  TICKET_STATUS,
  type TicketStatus,
} from '../constants/tickets.constants';

type Props = Readonly<{
  selectedTab: TicketStatus;
  onChangeTab: (value: TicketStatus) => void;
}>;

const tabs: TicketStatus[] = [
  TICKET_STATUS.ACTIVE,
  TICKET_STATUS.USED,
];

export function TicketTabs({ selectedTab, onChangeTab }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = selectedTab === tab;

        return (
          <Pressable
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChangeTab(tab)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {formatLabel(tab)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function formatLabel(status: TicketStatus) {
  switch (status) {
    case TICKET_STATUS.ACTIVE:
      return 'Activos';
    case TICKET_STATUS.USED:
      return 'Pasados';
    default:
      return status;
  }
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: 30,
      padding: 4,
      marginBottom: 16,
    },

    tab: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 30,
      alignItems: 'center',
    },

    activeTab: {
      backgroundColor: theme.colors.brandBlue,
    },

    text: {
      color: theme.colors.textSecondary,
      fontWeight: '600',
    },

    activeText: {
      color: theme.colors.white,
    },
  });
}