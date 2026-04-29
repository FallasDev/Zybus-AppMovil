import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

export function VerificationScreen({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Verificación</Text>
      <Text style={styles.description}>
        Ingresa el código de verificación de 4 dígitos. Te hemos enviado uno al número proporcionado.
      </Text>

      <View style={styles.codeRow}>
        <TextInput maxLength={1} keyboardType="number-pad" style={styles.codeInput} />
        <TextInput maxLength={1} keyboardType="number-pad" style={styles.codeInput} />
        <TextInput maxLength={1} keyboardType="number-pad" style={styles.codeInput} />
        <TextInput maxLength={1} keyboardType="number-pad" style={styles.codeInput} />
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.primaryButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 24,
      paddingTop: 48,
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    backText: {
      fontSize: 26,
      color: theme.colors.textPrimary,
      marginTop: -2,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      textAlign: 'center',
      marginBottom: 22,
    },
    description: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
      marginBottom: 18,
    },
    codeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 26,
    },
    codeInput: {
      width: 62,
      height: 52,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 6,
      textAlign: 'center',
      fontSize: 22,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    primaryButton: {
      height: 56,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: '700',
    },
  });
}
