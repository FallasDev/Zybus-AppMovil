import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

export function AccountScreen(): ReactElement {
  const { theme, toggleTheme, mode } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const handleEditProfile = (): void => {
    Alert.alert('Próximo paso', 'Aquí luego abrimos editar perfil.');
  };

  const handlePaymentMethods = (): void => {
    Alert.alert('Próximo paso', 'Aquí luego abrimos métodos de pago.');
  };

  const handleNotifications = (): void => {
    Alert.alert('Próximo paso', 'Aquí luego abrimos notificaciones.');
  };

  const handleSettings = (): void => {
    Alert.alert('Próximo paso', 'Aquí luego abrimos configuración.');
  };

  const handleLogout = (): void => {
    Alert.alert('Cerrar sesión', '¿Seguro que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>D</Text>
        </View>
        <Text style={styles.name}>Dayanna Solano</Text>
        <Text style={styles.email}>dayanasolano876@gmail.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mi cuenta</Text>

        <Pressable style={styles.optionCard} onPress={handleEditProfile}>
          <View>
            <Text style={styles.optionTitle}>Editar perfil</Text>
            <Text style={styles.optionSubtitle}>Actualiza tu nombre, correo y datos básicos</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable style={styles.optionCard} onPress={handlePaymentMethods}>
          <View>
            <Text style={styles.optionTitle}>Métodos de pago</Text>
            <Text style={styles.optionSubtitle}>Administra tarjetas y formas de pago</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable style={styles.optionCard} onPress={handleNotifications}>
          <View>
            <Text style={styles.optionTitle}>Notificaciones</Text>
            <Text style={styles.optionSubtitle}>Controla avisos y recordatorios</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable style={styles.optionCard} onPress={handleSettings}>
          <View>
            <Text style={styles.optionTitle}>Configuración</Text>
            <Text style={styles.optionSubtitle}>Preferencias generales de la aplicación</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>

        <Pressable style={styles.optionCard} onPress={toggleTheme}>
          <View>
            <Text style={styles.optionTitle}>Tema de la app</Text>
            <Text style={styles.optionSubtitle}>
              Actualmente: {mode === 'dark' ? 'Oscuro' : 'Claro'}
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </Pressable>
    </ScrollView>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 20,
      paddingTop: 24,
      paddingBottom: 32,
    },
    headerCard: {
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 22,
      paddingVertical: 28,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 82,
      height: 82,
      borderRadius: 41,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
    },
    avatarText: {
      fontSize: 30,
      fontWeight: '700',
      color: theme.colors.brandBlue,
    },
    name: {
      color: theme.colors.textOnBrand,
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 6,
    },
    email: {
      color: '#dbe6f5',
      fontSize: 14,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    optionCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: theme.colors.black,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    optionSubtitle: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      maxWidth: 250,
    },
    arrow: {
      fontSize: 28,
      color: theme.colors.brandBlue,
      fontWeight: '700',
    },
    logoutButton: {
      backgroundColor: theme.colors.errorSurface,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 8,
    },
    logoutButtonText: {
      color: theme.colors.error,
      fontWeight: '700',
      fontSize: 16,
    },
  });
}
