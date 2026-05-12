import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { useAuth } from '../hooks/useAuth';
import BackButton from '../components/BackButton';
import AuthHeader from '../components/AuthHeader';
import CodeInputRow from '../components/CodeInputRow';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

export function VerificationScreen({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');

  const { handleVerifyCode, isLoading, error } = useAuth();

  const code = `${code1}${code2}${code3}${code4}`;

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />

      <AuthHeader title="Verificación" showLogo />
      <Text style={styles.description}>
        Ingresa el código de 4 dígitos que enviamos al número proporcionado.
      </Text>

      <CodeInputRow values={[code1, code2, code3, code4]} setters={[setCode1, setCode2, setCode3, setCode4]} />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <PrimaryButton
        disabled={isLoading}
        onPress={async () => {
          const success = await handleVerifyCode({ code });
          if (success) navigation.navigate('MainTabs');
        }}
      >
        {isLoading ? 'Verificando...' : 'Continuar'}
      </PrimaryButton>

      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendText}>¿No recibiste el código? Reenviar</Text>
      </TouchableOpacity>

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
    backButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      zIndex: 1,
    },
    backText: {
      fontSize: 28,
      color: theme.colors.textPrimary,
      marginTop: -2,
    },
    logoBox: {
      alignSelf: 'center',
      width: 150,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
      zIndex: 1,
    },
    logoImage: {
      width: 160,
      height: 160,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.textPrimary,
      textAlign: 'center',
      marginBottom: 10,
      zIndex: 1,
    },
    description: {
      color: theme.colors.textSecondary,
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 22,
      textAlign: 'center',
      marginBottom: 34,
      zIndex: 1,
    },
    codeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 28,
      zIndex: 1,
    },
    codeInput: {
      width: 68,
      height: 58,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 12,
      textAlign: 'center',
      fontSize: 22,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    errorText: {
      color: '#D32F2F',
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 14,
      zIndex: 1,
    },
    primaryButton: {
      height: 58,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 20,
      fontWeight: '800',
    },
    resendButton: {
      alignItems: 'center',
      marginTop: 22,
      zIndex: 1,
    },
    resendText: {
      color: theme.colors.brandBlue,
      fontSize: 14,
      fontWeight: '700',
    },
    backgroundImage: {
      position: 'absolute',
      bottom: -250,
      left: 0,
      right: 0,
      width: '100%',
      height: 300,
      resizeMode: 'cover',
      opacity: 0.25,
      zIndex: 0,
    },
  });
}