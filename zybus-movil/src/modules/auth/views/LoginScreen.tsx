import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../components/AuthHeader';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import Divider from '../components/Divider';
import SocialButton from '../components/SocialButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin, isLoading, error } = useAuth();

  return (
    <View style={styles.container}>
      <AuthHeader title="Bienvenido de nuevo" subtitle="Inicia sesión para continuar" />

      <View style={styles.form}>
        <FormInput
          label="Correo electrónico"
          placeholder="Su correo electrónico"
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <FormInput
          label="Contraseña"
          placeholder="Tu contraseña"
          leftIcon="lock-closed-outline"
          secure
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <PrimaryButton
          disabled={isLoading}
          onPress={async () => {
            const success = await handleLogin({ email, password });
            if (success) navigation.navigate('MainTabs');
          }}
        >
          {isLoading ? 'Ingresando...' : 'Inicia Sesión'}
        </PrimaryButton>

        <Divider />

        <SocialButton>Continuar con Google</SocialButton>

        <View style={styles.footer}>
          <Text style={styles.footerText}>No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Registra ahora</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View pointerEvents="none">
        <Image
          source={require('../../../shared/assets/images/bus_login_regis.png')}
          style={styles.backgroundImage}
        />
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
      paddingTop: 60,
    },
    logoBox: {
      alignSelf: 'center',
      width: 150,
      height: 90,
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    logoImage: {
      width: 160,
      height: 160,
      resizeMode: 'contain'
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.textPrimary,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 38,
    },
    form: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.textPrimary,
      marginBottom: 8,
      marginTop: 8,
    },
    input: {
      height: 54,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    inputWrapper: {
      position: 'relative',
    },
    inputLeftIcon: {
      position: 'absolute',
      left: 16,
      top: 18,
      zIndex: 1,
    },
    inputRightIconButton: {
      position: 'absolute',
      right: 16,
      top: 17,
      zIndex: 1,
    },
    inputWithLeftIcon: {
      paddingLeft: 46,
    },
    inputWithBothIcons: {
      paddingLeft: 46,
      paddingRight: 50,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 22,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      marginHorizontal: 12,
      color: theme.colors.textSecondary,
      fontSize: 14,
      fontWeight: '600',
    },
    forgotWrap: {
      alignItems: 'flex-end',
      marginTop: 6,
      marginBottom: 16,
      color: theme.colors.brandBlue,
      fontSize: 14,
      fontWeight: '700',
    },
    forgotText: {
      color: theme.colors.brandBlue,
      fontSize: 14,
      fontWeight: '600',
    },
    errorText: {
      color: '#D32F2F',
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 14,
    },
    primaryButton: {
      height: 58,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22,
      zIndex: 1
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 22,
      fontWeight: '700',
    },
    orText: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 18,
    },
    socialButton: {
      height: 54,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 28,
      zIndex: 1
    },
    socialButtonText: {
      color: theme.colors.textPrimary,
      fontSize: 15,
      fontWeight: '700',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 120,
      zIndex: 1
    },
    footerText: {
      color: theme.colors.textSecondary,
      fontSize: 15,
    },
    footerLink: {
      color: theme.colors.brandBlue,
      fontSize: 14,
      fontWeight: '700',
    },
    backgroundImage: {
      position: 'absolute',
      bottom: -45,
      left: 0,
      right: 0,
      width: '100%',
      height: 300,
      resizeMode: 'cover',
      opacity: 0.28,
      zIndex: 0,
    },
  });
}