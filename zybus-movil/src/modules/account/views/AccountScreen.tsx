import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';

type AccountNavProp = NativeStackNavigationProp<RootStackParamList>;

const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días,';
  if (h < 18) return 'Buenas tardes,';
  return 'Buenas noches,';
};

interface AccountOption {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export function AccountScreen(): ReactElement {
  const navigation = useNavigation<AccountNavProp>();
  const { theme, toggleTheme, mode } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const placeholder = (label: string) => () =>
    Alert.alert('Próximamente', `${label} estará disponible pronto.`);

  const options: AccountOption[] = [
    {
      id: 'profile',
      label: 'Perfil y Contraseña',
      icon: 'person-circle-outline',
      onPress: placeholder('Perfil y Contraseña'),
    },
    {
      id: 'tickets',
      label: 'Mis Tickets',
      icon: 'ticket-outline',
      onPress: placeholder('Mis Tickets'),
    },
    {
      id: 'payment',
      label: 'Métodos de Pago',
      icon: 'card-outline',
      onPress: placeholder('Métodos de Pago'),
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: 'settings-outline',
      onPress: placeholder('Configuración'),
    },
    {
      id: 'help',
      label: 'Centro de Ayuda',
      icon: 'help-circle-outline',
      onPress: placeholder('Centro de Ayuda'),
    },
  ];

  const pairs: AccountOption[][] = [];
  for (let i = 0; i < options.length; i += 2) {
    pairs.push(options.slice(i, i + 2));
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabecera de perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DS</Text>
        </View>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.userName}>Dayanna Solano</Text>
        <Text style={styles.userEmail}>dayanasolano876@gmail.com</Text>
      </View>

      {/* Cuadrícula de opciones */}
      {pairs.map((pair, i) => (
        <View key={i} style={styles.row}>
          {pair.map((opt) => (
            <Pressable
              key={opt.id}
              style={({ pressed }) => [styles.optionCard, pressed && styles.optionCardPressed]}
              onPress={opt.onPress}
            >
              <Ionicons name={opt.icon} size={28} color={theme.colors.brandBlue} />
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </Pressable>
          ))}
          {pair.length === 1 && <View style={styles.optionCardEmpty} />}
        </View>
      ))}

      {/* Toggle de tema */}
      <Pressable
        style={({ pressed }) => [styles.themeCard, pressed && styles.optionCardPressed]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={mode === 'dark' ? 'moon-outline' : 'sunny-outline'}
          size={22}
          color={theme.colors.textSecondary}
        />
        <Text style={styles.themeLabel}>
          Tema: {mode === 'dark' ? 'Oscuro' : 'Claro'}
        </Text>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
      </Pressable>

      {/* Cerrar sesión — ancho completo */}
      <Pressable
        style={({ pressed }) => [styles.logoutCard, pressed && styles.optionCardPressed]}
        onPress={() =>
          Alert.alert('Cerrar sesión', '¿Seguro que deseas cerrar sesión?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Cerrar sesión', style: 'destructive' },
          ])
        }
      >
        <Ionicons name="power-outline" size={24} color={theme.colors.error} />
        <Text style={styles.logoutLabel}>Cerrar Sesión</Text>
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
      paddingTop: 52,
      paddingBottom: 40,
      gap: 12,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 8,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 999,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      overflow: 'hidden',
    },
    avatarText: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.white,
    },
    greeting: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    userName: {
      fontSize: theme.typography.xl,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    optionCard: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      paddingVertical: 22,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    optionCardPressed: {
      opacity: 0.8,
    },
    optionCardEmpty: {
      flex: 1,
    },
    optionLabel: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    themeCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    themeLabel: {
      flex: 1,
      fontSize: theme.typography.sm,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    logoutCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      paddingVertical: 18,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    logoutLabel: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.error,
    },
  });
}
