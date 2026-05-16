import type { ReactElement } from 'react';
import { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
}

export function DateField({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
  placeholder = 'Seleccionar fecha',
}: Props): ReactElement {
  const [show, setShow] = useState(false);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const current = value ?? new Date();

  const formatted = value
    ? value.toLocaleDateString('es-CR', { day: 'numeric', month: 'short', weekday: 'short' })
    : '';

  const handleChange = (_evt: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (date) onChange(date);
  };

  return (
    <>
      <Pressable style={styles.field} onPress={() => setShow(true)}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, !value && styles.placeholder]}>
          {formatted || placeholder}
        </Text>
      </Pressable>

      {Platform.OS === 'android' && show && (
        <DateTimePicker
          mode="date"
          display="default"
          value={current}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={handleChange}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={show}
          transparent
          animationType="slide"
          onRequestClose={() => setShow(false)}
        >
          <View style={styles.overlay}>
            <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{label}</Text>
                <Pressable onPress={() => setShow(false)}>
                  <Text style={styles.done}>Listo</Text>
                </Pressable>
              </View>
              <DateTimePicker
                mode="date"
                display="inline"
                value={current}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={handleChange}
                locale="es"
                themeVariant="light"
                style={{ width }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#EDEAF5',
    borderRadius: 12,
    marginBottom: 12,
  },
  label: { fontSize: 12, color: '#666', marginBottom: 2 },
  value: { fontSize: 14, color: '#111', fontWeight: '500' },
  placeholder: { color: '#999', fontWeight: '400' },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  done: { fontSize: 15, color: '#007AFF', fontWeight: '600' },
});
