import type { ReactElement } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../../shared/theme/colors';
import type { RootStackParamList } from '../../../navigation/types';
import { Image } from 'react-native';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props): ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
  <Image
    source={require('../../../shared/assets/images/ZybusLogo.png')}
    style={styles.logoImage}
    resizeMode="contain"
  />
</View>

      <Text style={styles.title}>Inicia sesión en tu cuenta</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          placeholder="Su correo electrónico"
          placeholderTextColor="#b0b0b0"
          style={styles.input}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder="Su contraseña"
          placeholderTextColor="#b0b0b0"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.primaryButtonText}>Inicia Sesión</Text>
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
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerLink}>Registra ahora</Text>
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
  logoBox: {
    alignSelf: 'center',
    width: 82,
    height: 82,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  logoImage: {
    width: 82,
    height: 82,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 28,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    height: 54,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.black,
    marginBottom: 12,
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    color: colors.brandBlue,
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    height: 56,
    backgroundColor: colors.brandBlue,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  orText: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 18,
  },
  socialButton: {
    height: 54,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: colors.white,
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
    paddingBottom: 28,
  },
  footerText: {
    color: colors.gray,
    fontSize: 15,
  },
  footerLink: {
    color: colors.brandBlue,
    fontSize: 15,
    fontWeight: '700',
  },
});