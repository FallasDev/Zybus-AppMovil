import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type Filters = {
  from: Date;
  to: Date;
  search: string;
};

type Props = {
  filters: Filters;
  onChangeFilter: (filters: Filters) => void;
};

export function TicketFilters({ filters, onChangeFilter }: Props) {
  const [openFrom, setOpenFrom] = useState(false);

  const today = new Date();

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB');

  const toInputValue = (date: Date) =>
    date.toISOString().split('T')[0];

  const fromInputValue = (value: string) => {
    const [y, m, d] = value.split('-').map(Number);

    return new Date(y, m - 1, d);
  };

  return (
    <View>
      <Text style={styles.label}>Buscar:</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Historial de tiquetes"
        placeholderTextColor="#999"
        style={styles.input}
        value={filters.search}
        onChangeText={(text) =>
          onChangeFilter({
            ...filters,
            search: text,
          })
        }
      />

      {/* FROM */}
      <View style={styles.dateBox}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setOpenFrom(true)}
        >
          <Text style={styles.dateLabel}>Desde</Text>

          <Text style={styles.dateText}>
            {formatDate(filters.from)}
          </Text>
        </TouchableOpacity>

        {Platform.OS === 'web' ? (
          <View style={{ position: 'relative' }}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#17326e"
            />

            <input
              type="date"
              max={toInputValue(today)}
              value={toInputValue(filters.from)}
              onChange={(e) => {
                if (!e.target.value) return;

                onChangeFilter({
                  ...filters,
                  from: fromInputValue(e.target.value),
                  to: today,
                });
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              }}
            />
          </View>
        ) : (
          <Ionicons
            name="calendar-outline"
            size={24}
            color="#17326e"
            onPress={() => setOpenFrom(true)}
          />
        )}
      </View>

      {/* TO */}
      <View style={styles.todayBox}>
        <Text style={styles.todayText}>
          Hasta: {formatDate(today)} (Hoy)
        </Text>
      </View>

      {/* DATE PICKER MOBILE */}
      {Platform.OS !== 'web' && openFrom && (
        <DateTimePicker
            value={filters.from}
            mode="date"
            display="calendar"
            maximumDate={today}
            onChange={(event, selectedDate) => {
            setOpenFrom(false);

            if (selectedDate) {
              onChangeFilter({
                ...filters,
                from: selectedDate,
                to: today,
              });
            }
          }}
        />
      )}
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#EDEAF5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    color: '#111',
  },

  dateBox: {
    backgroundColor: '#EDEAF5',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },

  dateText: {
    fontSize: 12,
    color: '#111',
    fontWeight: '500',
  },

  todayBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dbeafe',
    borderRadius: 10,
  },

  todayText: {
    fontSize: 13,
    color: '#17326e',
    fontWeight: '600',
  },

  touchArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});