import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registrar Cuenta</Text>

      <Text style={styles.label}>Nombre Completo</Text>
      <TextInput
        placeholder="Su nombre completo"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Su correo electrónico"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Número de Móvil</Text>
      <TextInput
        placeholder="Su número de móvil"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <View style={styles.termsRow}>
        <View style={styles.checkbox}>
          <Text style={styles.checkboxText}>✓</Text>
        </View>
        <Text style={styles.termsText}>
          Al crear una cuenta, aceptas nuestros{' '}
          <Text style={styles.termsLink}>Términos y Condiciones</Text>
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Verification')}
      >
        <Text style={styles.primaryButtonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>O</Text>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Inicia sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <Text style={[styles.socialButtonText, styles.facebookButtonText]}>
          Inicia sesión con Facebook
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
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
      marginBottom: 26,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.textPrimary,
      marginBottom: 8,
      marginTop: 6,
    },
    input: {
      height: 54,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 10,
    },
    termsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 10,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 4,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      marginTop: 2,
    },
    checkboxText: {
      color: theme.colors.white,
      fontSize: 12,
      fontWeight: '700',
    },
    termsText: {
      flex: 1,
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
    },
    termsLink: {
      color: theme.colors.brandBlue,
      fontWeight: '700',
    },
    primaryButton: {
      height: 56,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 6,
      marginBottom: 22,
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: '700',
    },
    orText: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 18,
    },
    socialButton: {
      height: 54,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
      backgroundColor: theme.colors.surface,
    },
    socialButtonText: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    facebookButton: {
      backgroundColor: theme.colors.brandYellow,
      borderColor: theme.colors.brandYellow,
    },
    facebookButtonText: {
      color: theme.colors.white,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 'auto',
      paddingBottom: 28,
    },
    footerText: {
      color: theme.colors.textSecondary,
      fontSize: 15,
    },
    footerLink: {
      color: theme.colors.brandBlue,
      fontSize: 15,
      fontWeight: '700',
    },
  });
}
