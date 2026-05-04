import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { PassengerType, Seat } from '../models/seat-selection.model';
import { seatSelectionService } from '../services/seat-selection.service';

interface PassengerTypeModalProps {
  seat: Seat | null;
  onConfirm: (type: PassengerType, cedula?: string) => void;
  onCancel: () => void;
}

type Step = 'type' | 'cedula' | 'verifying';

export function PassengerTypeModal({
  seat,
  onConfirm,
  onCancel,
}: PassengerTypeModalProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const [step, setStep] = useState<Step>('type');
  const [cedula, setCedula] = useState('');
  const [cedulaError, setCedulaError] = useState('');

  const resetState = () => {
    setStep('type');
    setCedula('');
    setCedulaError('');
  };

  const handleCancel = () => {
    resetState();
    onCancel();
  };

  const handleSelectNormal = () => {
    resetState();
    onConfirm('normal');
  };

  const handleSelectSenior = () => {
    setStep('cedula');
  };

  const handleVerify = async () => {
    setCedulaError('');
    if (!cedula.trim()) {
      setCedulaError('Ingresa el número de cédula.');
      return;
    }
    setStep('verifying');
    const result = await seatSelectionService.verifyCedula(cedula);
    if (result.valid) {
      const confirmedCedula = cedula;
      resetState();
      onConfirm('adulto_mayor', confirmedCedula);
    } else {
      setStep('cedula');
      setCedulaError('Cédula no válida. Debe tener 9 dígitos.');
    }
  };

  return (
    <Modal
      visible={seat !== null}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Asiento {seat?.seatCode ?? ''}
            </Text>
            <TouchableOpacity onPress={handleCancel} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Step: elegir tipo */}
          {(step === 'type') && (
            <>
              <Text style={styles.subtitle}>¿Tipo de pasajero?</Text>
              <View style={styles.typeRow}>
                <TouchableOpacity
                  style={[styles.typeCard, styles.typeCardNormal]}
                  onPress={handleSelectNormal}
                  activeOpacity={0.8}
                >
                  <Ionicons name="person-outline" size={28} color={theme.colors.brandBlue} />
                  <Text style={styles.typeCardLabel}>Normal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.typeCard, styles.typeCardSenior]}
                  onPress={handleSelectSenior}
                  activeOpacity={0.8}
                >
                  <Ionicons name="accessibility" size={28} color={theme.colors.brandBlue} />
                  <Text style={styles.typeCardLabel}>Adulto mayor</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Step: ingresar cédula */}
          {(step === 'cedula' || step === 'verifying') && (
            <>
              <TouchableOpacity style={styles.backRow} onPress={() => setStep('type')}>
                <Ionicons name="arrow-back" size={16} color={theme.colors.brandBlue} />
                <Text style={styles.backText}>Cambiar tipo</Text>
              </TouchableOpacity>

              <View style={styles.seniorBadge}>
                <Ionicons name="accessibility" size={16} color={theme.colors.brandBlue} />
                <Text style={styles.seniorBadgeText}>Adulto mayor</Text>
              </View>

              <Text style={styles.idLabel}>Número de cédula</Text>
              <View style={[styles.idInputRow, cedulaError ? styles.idInputRowError : null]}>
                <Ionicons name="card-outline" size={20} color={theme.colors.textSecondary} />
                <TextInput
                  style={styles.idInput}
                  placeholder="Ej: 112345678"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={cedula}
                  onChangeText={(t) => {
                    setCedula(t.replace(/\D/g, ''));
                    setCedulaError('');
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                  editable={step !== 'verifying'}
                  autoFocus
                />
              </View>
              {cedulaError ? <Text style={styles.errorText}>{cedulaError}</Text> : null}

              <TouchableOpacity
                style={[styles.verifyBtn, step === 'verifying' && styles.verifyBtnDisabled]}
                onPress={handleVerify}
                disabled={step === 'verifying'}
                activeOpacity={0.85}
              >
                {step === 'verifying' ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : (
                  <>
                    <Ionicons name="shield-checkmark-outline" size={18} color={theme.colors.white} />
                    <Text style={styles.verifyBtnText}>Verificar cédula</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: theme.colors.overlay,
    },
    sheet: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
      gap: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: theme.typography.lg,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    subtitle: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginTop: -8,
    },
    typeRow: {
      flexDirection: 'row',
      gap: 12,
    },
    typeCard: {
      flex: 1,
      borderRadius: 16,
      paddingVertical: 20,
      alignItems: 'center',
      gap: 10,
      borderWidth: 1.5,
    },
    typeCardNormal: {
      backgroundColor: theme.colors.surfaceAlt,
      borderColor: theme.colors.border,
    },
    typeCardSenior: {
      backgroundColor: 'rgba(21,47,82,0.07)',
      borderColor: theme.colors.brandBlue,
    },
    typeCardLabel: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    backRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: -8,
    },
    backText: {
      fontSize: theme.typography.sm,
      color: theme.colors.brandBlue,
      fontWeight: '600',
    },
    seniorBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'rgba(21,47,82,0.08)',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignSelf: 'flex-start',
    },
    seniorBadgeText: {
      fontSize: theme.typography.sm,
      fontWeight: '600',
      color: theme.colors.brandBlue,
    },
    idLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      letterSpacing: 0.5,
    },
    idInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      backgroundColor: theme.colors.inputBackground,
    },
    idInputRowError: {
      borderColor: theme.colors.error,
    },
    idInput: {
      flex: 1,
      height: 50,
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
    },
    errorText: {
      fontSize: theme.typography.xs,
      color: theme.colors.error,
      marginTop: -8,
    },
    verifyBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      paddingVertical: 15,
      gap: 8,
    },
    verifyBtnDisabled: {
      opacity: 0.7,
    },
    verifyBtnText: {
      color: theme.colors.white,
      fontSize: theme.typography.md,
      fontWeight: '700',
    },
  });
}
