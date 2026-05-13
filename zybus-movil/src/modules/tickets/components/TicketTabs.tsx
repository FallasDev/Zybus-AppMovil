import { View, Text, Pressable, StyleSheet } from 'react-native';

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

export function TicketTabs({
  selectedTab,
  onChangeTab,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = selectedTab === tab;

        return (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              isActive && styles.activeTab,
            ]}
            onPress={() => onChangeTab(tab)}
          >
            <Text
              style={[
                styles.text,
                isActive && styles.activeText,
              ]}
            >
              {formatLabel(tab)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ================= LABELS ================= */

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

/* ================= STYLE (tipo toggle moderno) ================= */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E9E6F3',
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
    backgroundColor: '#152f52',
  },

  text: {
    color: '#555',
    fontWeight: '600',
  },

  activeText: {
    color: '#fff',
  },
});