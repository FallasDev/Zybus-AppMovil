import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import BackButton from '../components/BackButton';
import AuthHeader from '../components/AuthHeader';
import RegisterForm from '../components/RegisterForm';
import { KeyboardAwareScreen } from '../../../shared/components';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  

  return (
    <KeyboardAwareScreen backgroundColor={theme.colors.surface}>
      <BackButton onPress={() => navigation.goBack()} />
      <AuthHeader title="Crea tu cuenta" />
      <RegisterForm navigation={navigation} />
    </KeyboardAwareScreen>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    keyboardView: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 24,
      paddingTop: 48,
      paddingBottom: 28,
    },
    backButton: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18,
    },
    backText: {
      fontSize: 30,
      color: theme.colors.textPrimary,
      marginTop: -3,
    },
    logoBox: {
      alignSelf: 'center',
      width: 120,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    logoImage: {
      width: 170,
      height: 170,
    },
    title: {
      fontSize: 26,
      fontWeight: '800',
      color: theme.colors.textPrimary,
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 18,
      fontWeight: '500',
    },
    stepIndicator: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 24,
    },
    stepLine: {
      flex: 1,
      height: 5,
      borderRadius: 10,
      backgroundColor: theme.colors.border,
    },
    stepLineActive: {
      backgroundColor: theme.colors.brandBlue,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    halfField: {
      flex: 1,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 8,
      marginTop: 4,
    },
    input: {
      height: 54,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 16,
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },
    passwordRow: {
      position: 'relative',
    },
    passwordField: {
      paddingRight: 48,
    },
    eyeButton: {
      position: 'absolute',
      right: 16,
      top: 16,
    },
    termsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 4,
      marginBottom: 20,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginRight: 10,
      marginTop: 1,
      backgroundColor: theme.colors.surface,
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
    errorText: {
      color: '#D32F2F',
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 14,
    },
    primaryButton: {
      height: 56,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
      marginBottom: 18,
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: '800',
    },
    secondaryButton: {
      alignItems: 'center',
      marginBottom: 18,
    },
    secondaryButtonText: {
      color: theme.colors.brandBlue,
      fontSize: 15,
      fontWeight: '700',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 'auto',
    },
    footerText: {
      color: theme.colors.textSecondary,
      fontSize: 15,
    },
    footerLink: {
      color: theme.colors.brandBlue,
      fontSize: 15,
      fontWeight: '800',
    },
  });
}