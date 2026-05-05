import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.logoBox}>
          <Image
            source={require('../../../shared/assets/images/ZybusLogo.png')}
            style={styles.logoImage}
            resizeMode="contain"/>
        </View>

        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              placeholder="Tu nombre"
              placeholderTextColor={theme.colors.textSecondary}
              style={styles.input} />
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>Primer apellido</Text>
            <TextInput
              placeholder="Primer apellido"
              placeholderTextColor={theme.colors.textSecondary}
              style={styles.input} />
          </View>
        </View>

        <Text style={styles.label}>Segundo apellido</Text>
        <TextInput
          placeholder="Segundo apellido"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input} />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          placeholder="Tu correo electrónico"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input} />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          placeholder="Tu número de teléfono"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="phone-pad"
          style={styles.input} />

          
        <Text style={styles.label}>Número de identificación</Text>
        <TextInput
          placeholder="Tu número de identificación"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="number-pad"
          style={styles.input} />

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Crea una contraseña"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry={!showPassword}
            style={[styles.input, styles.passwordField]}/>

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={theme.colors.textSecondary}/>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar contraseña</Text>
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Confirma tu contraseña"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry={!showConfirmPassword}
            style={[styles.input, styles.passwordField]}/>

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={theme.colors.textSecondary}/>
          </TouchableOpacity>
        </View>


        <View style={styles.termsRow}>
          <View style={styles.checkbox} />
          <Text style={styles.termsText}>
            Acepto los <Text style={styles.termsLink}>Términos y Condiciones</Text> y la{' '}
            <Text style={styles.termsLink}>Política de Privacidad</Text>
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Verification')}>
          <Text style={styles.primaryButtonText}>Crear cuenta</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
      marginBottom: 26,
      fontWeight: '500',
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
    primaryButton: {
      height: 56,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
      marginBottom: 26,
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: '800',
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