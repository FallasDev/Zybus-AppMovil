import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { TripSearchFormData, StopOption } from '../models/trip-search.model';
import { TRIP_SEARCH_TEXT } from '../constants/trip-search.constants';

interface TripSearchFormProps {
  formData: TripSearchFormData;
  stopOptions: StopOption[];
  isLoading: boolean;
  onChange: <K extends keyof TripSearchFormData>(field: K, value: TripSearchFormData[K]) => void;
  onSubmit: () => void;
}

type PickerTarget = 'origin' | 'destination' | null;

const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  const parsed = new Date(`${dateStr}T00:00:00`);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

const formatDateForStorage = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  return parseDate(dateStr).toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  });
};

export function TripSearchForm({
  formData,
  stopOptions,
  isLoading,
  onChange,
  onSubmit,
}: TripSearchFormProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const originName = stopOptions.find((s) => s.id === formData.originStopId)?.name ?? '';
  const destName = stopOptions.find((s) => s.id === formData.destinationStopId)?.name ?? '';
  const dateDisplay = formatDateForDisplay(formData.date);

  const handleStopSelect = (stop: StopOption) => {
    if (pickerTarget === 'origin') onChange('originStopId', stop.id);
    else if (pickerTarget === 'destination') onChange('destinationStopId', stop.id);
    setPickerTarget(null);
  };

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (date) onChange('date', formatDateForStorage(date));
  };

  const updateIdentificacion = (index: number, value: string) => {
    const next = [...formData.identificaciones];
    next[index] = value;
    onChange('identificaciones', next);
  };

  return (
    <View style={styles.container}>
      {/* Origen */}
      <Pressable
        style={[styles.field, styles.fieldTop]}
        onPress={() => setPickerTarget('origin')}
        disabled={isLoading}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="location" size={20} color={theme.colors.brandBlue} />
        </View>
        <View style={styles.fieldContent}>
          <Text style={styles.fieldLabel}>ORIGEN</Text>
          <Text style={[styles.fieldValue, !originName && styles.fieldPlaceholder]}>
            {originName || TRIP_SEARCH_TEXT.ORIGIN_PLACEHOLDER}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
      </Pressable>

      <View style={styles.fieldDivider} />

      {/* Destino */}
      <Pressable
        style={[styles.field, styles.fieldBottom]}
        onPress={() => setPickerTarget('destination')}
        disabled={isLoading}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="navigate" size={20} color={theme.colors.brandYellow} />
        </View>
        <View style={styles.fieldContent}>
          <Text style={styles.fieldLabel}>DESTINO</Text>
          <Text style={[styles.fieldValue, !destName && styles.fieldPlaceholder]}>
            {destName || TRIP_SEARCH_TEXT.DESTINATION_PLACEHOLDER}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
      </Pressable>

      {/* Fecha */}
      <Pressable
        style={[styles.field, styles.singleField]}
        onPress={() => setShowDatePicker(true)}
        disabled={isLoading}
      >
        <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
        <View style={styles.fieldContent}>
          <Text style={styles.fieldLabel}>FECHA</Text>
          <Text style={[styles.fieldValue, !dateDisplay && styles.fieldPlaceholder]}>
            {dateDisplay || TRIP_SEARCH_TEXT.DATE_PLACEHOLDER}
          </Text>
        </View>
      </Pressable>

      {/* Botón buscar */}
      <TouchableOpacity
        style={[styles.searchBtn, isLoading && styles.searchBtnDisabled]}
        onPress={onSubmit}
        disabled={isLoading}
        activeOpacity={0.85}
      >
        <Text style={styles.searchBtnText}>
          {isLoading ? TRIP_SEARCH_TEXT.LOADING : TRIP_SEARCH_TEXT.SEARCH_BUTTON}
        </Text>
        {!isLoading && (
          <Ionicons name="arrow-forward" size={18} color={theme.colors.white} />
        )}
      </TouchableOpacity>

      {/* Modal de paradas */}
      <Modal
        visible={pickerTarget !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerTarget(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{TRIP_SEARCH_TEXT.PICK_STOP_TITLE}</Text>
              <Pressable onPress={() => setPickerTarget(null)}>
                <Text style={styles.modalClose}>{TRIP_SEARCH_TEXT.CANCEL}</Text>
              </Pressable>
            </View>
            <FlatList
              data={stopOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable style={styles.stopItem} onPress={() => handleStopSelect(item)}>
                  <Ionicons
                    name={pickerTarget === 'origin' ? 'location' : 'navigate'}
                    size={16}
                    color={theme.colors.textSecondary}
                    style={styles.stopIcon}
                  />
                  <Text style={styles.stopItemText}>{item.name}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Date picker Android */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={parseDate(formData.date)}
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      {/* Date picker iOS */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showDatePicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dateModalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{TRIP_SEARCH_TEXT.DATE_LABEL}</Text>
                <Pressable onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.modalClose}>Listo</Text>
                </Pressable>
              </View>
              <DateTimePicker
                mode="date"
                display="inline"
                value={parseDate(formData.date)}
                minimumDate={new Date()}
                onChange={handleDateChange}
                locale="es"
                style={styles.inlinePicker}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      gap: 0,
    },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      paddingHorizontal: 14,
      paddingVertical: 14,
      gap: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    fieldTop: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomWidth: 0,
    },
    fieldBottom: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    singleField: {
      borderRadius: 12,
      marginTop: 10,
    },
    fieldDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginLeft: 44,
    },
    iconWrap: {
      width: 28,
      alignItems: 'center',
    },
    fieldContent: {
      flex: 1,
    },
    fieldLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      letterSpacing: 0.8,
      marginBottom: 3,
    },
    fieldValue: {
      fontSize: theme.typography.md,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    fieldPlaceholder: {
      color: theme.colors.textSecondary,
      fontWeight: '400',
    },

    /* Sección pasajeros */
    passengersSection: {
      marginTop: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      paddingHorizontal: 14,
      paddingVertical: 12,
      gap: 4,
    },
    passengersSectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 8,
    },
    passengerTypeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    typeDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
    },
    typeLabel: {
      fontSize: theme.typography.sm,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    counter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    counterBtn: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterValue: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      minWidth: 20,
      textAlign: 'center',
    },

    /* Cédulas */
    idInputWrap: {
      marginTop: 10,
    },
    idLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.brandBlue,
      letterSpacing: 0.8,
      marginBottom: 6,
    },
    idInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.brandBlue,
      paddingHorizontal: 12,
      gap: 8,
    },
    idIcon: {
      marginVertical: 12,
    },
    idInput: {
      flex: 1,
      height: 46,
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
    },

    /* Botón buscar */
    searchBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      paddingVertical: 16,
      marginTop: 14,
      gap: 8,
    },
    searchBtnDisabled: {
      opacity: 0.6,
    },
    searchBtnText: {
      color: theme.colors.white,
      fontSize: theme.typography.md,
      fontWeight: '700',
    },

    /* Modales */
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: theme.colors.overlay,
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '60%',
      paddingBottom: 32,
    },
    dateModalContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 32,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    modalClose: {
      fontSize: theme.typography.sm,
      color: theme.colors.brandBlue,
      fontWeight: '600',
    },
    inlinePicker: {
      alignSelf: 'stretch',
    },
    stopItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      gap: 10,
    },
    stopIcon: {
      width: 20,
    },
    stopItemText: {
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
    },
  });
}
