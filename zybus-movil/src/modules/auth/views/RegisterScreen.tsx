import type { ReactElement } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../../shared/theme/colors';
import { images } from '../../../shared/assets/images';
import type { RootStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props): ReactElement {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registrar Cuenta</Text>

      <Text style={styles.label}>Nombre Completo</Text>
      <TextInput
        placeholder="Su nombre completo"
        placeholderTextColor="#b8b8b8"
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Su correo electrónico"
        placeholderTextColor="#b8b8b8"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Número de Móvil</Text>
      <TextInput
        placeholder="Su número de móvil"
        placeholderTextColor="#b8b8b8"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 26,
    color: colors.black,
    marginTop: -2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 26,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    height: 54,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.black,
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
    backgroundColor: colors.brandBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    color: '#8d8d8d',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.brandBlue,
    fontWeight: '700',
  },
  primaryButton: {
    height: 56,
    backgroundColor: colors.brandBlue,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 22,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  orText: {
    textAlign: 'center',
    color: '#aeaeae',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 18,
  },
  socialButton: {
    height: 54,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: colors.white,
  },
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  socialButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
  facebookButton: {
    backgroundColor: '#fdd24e',
    borderColor: '#fdd24e',
  },
  facebookButtonText: {
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingBottom: 28,
  },
  footerText: {
    color: '#8d8d8d',
    fontSize: 15,
  },
  footerLink: {
    color: colors.brandBlue,
    fontSize: 15,
    fontWeight: '700',
  },
});