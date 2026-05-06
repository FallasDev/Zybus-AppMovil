import type { ReactElement } from 'react';
import { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';

type DigitalTicketNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'DigitalTicket'
>;

type DigitalTicketRouteProp =
  NativeStackScreenProps<RootStackParamList, 'DigitalTicket'>['route'];

export function DigitalTicketView(): ReactElement {
  const navigation = useNavigation<DigitalTicketNavProp>();
  const route = useRoute<DigitalTicketRouteProp>();

  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { purchaseData, confirmationNumber } = route.params;

  const tripData = {
    departurePoint: purchaseData.origin || 'Salida pendiente',
    arrivalPoint: purchaseData.destination || 'Llegada pendiente',
    duration: '2h 30min',
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.backText}>‹ Inicio</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Ticket digital</Text>
        <Text style={styles.subtitle}>Presenta este boleto al abordar</Text>

        <View style={styles.ticketHeaderCard}>
          <Text style={styles.brand}>ZYBUS</Text>

          <View style={styles.qrBox}>
            <Text style={styles.qrText}>QR</Text>
          </View>

          <Text style={styles.label}>Número de confirmación</Text>
          <Text style={styles.confirmation}>{confirmationNumber}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Ruta del viaje</Text>
            <Ionicons name="bus-outline" size={22} color={theme.colors.brandBlue} />
          </View>

          <View style={styles.tripRoute}>
            <View style={styles.tripPoint}>
              <Text style={styles.routeLabel}>Salida</Text>
              <Text style={styles.placeText}>San José</Text>
            </View>

            <View style={styles.roadContainer}>
              <View style={styles.roadLine} />
              <View style={styles.busCircle}>
                <Ionicons name="bus-outline" size={20} color={theme.colors.white} />
              </View>
              <Text style={styles.durationText}>{tripData.duration}</Text>
            </View>

            <View style={styles.tripPointRight}>
              <Text style={styles.routeLabel}>Llegada</Text>
              <Text style={styles.placeText}>Limón</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalles del boleto</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha</Text>
            <Text style={styles.value}>{purchaseData.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Hora</Text>
            <Text style={styles.value}>07:00 AM</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Asiento(s)</Text>
            <Text style={styles.value}>{purchaseData.seat}</Text>
          </View>

        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pago</Text>

          <View style={styles.paymentRow}>
            <Text style={styles.label}>Total pagado</Text>
            <Text style={styles.total}>₡{purchaseData.finalPrice}</Text>
          </View>

          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
            <Text style={styles.statusText}>Pago aprobado</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.primaryButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 120,
    },
    backBtn: {
      paddingTop: 36,
      paddingBottom: 12,
    },
    backText: {
      fontSize: theme.typography.md,
      color: theme.colors.brandBlue,
      fontWeight: '600',
    },
    title: {
      fontSize: theme.typography.xl,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginBottom: 18,
    },
    ticketHeaderCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 22,
      padding: 24,
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    brand: {
      fontSize: theme.typography.xl,
      fontWeight: '800',
      color: theme.colors.brandBlue,
      marginBottom: 18,
      letterSpacing: 1,
    },
    qrBox: {
      width: 160,
      height: 160,
      borderRadius: 16,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    qrText: {
      fontSize: theme.typography.xl,
      color: theme.colors.textPrimary,
      fontWeight: '800',
    },
    confirmation: {
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
      fontWeight: '800',
      marginTop: 4,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    tripRoute: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 6,
    },
    tripPoint: {
      width: '28%',
      alignItems: 'flex-start',
    },
    tripPointRight: {
      width: '28%',
      alignItems: 'flex-end',
    },
    routeLabel: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    placeText: {
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    roadContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    roadLine: {
      position: 'absolute',
      top: 16,
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: theme.colors.border,
      borderRadius: 99,
    },
    busCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    durationText: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginTop: 6,
      fontWeight: '600',
    },
    infoRow: {
      marginBottom: 12,
    },
    label: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      marginBottom: 3,
    },
    value: {
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    total: {
      fontSize: theme.typography.lg,
      color: theme.colors.brandBlue,
      fontWeight: '800',
    },
    statusBadge: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: theme.colors.inputBackground,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 99,
    },
    statusText: {
      fontSize: theme.typography.sm,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      padding: 16,
      paddingBottom: 28,
    },
    primaryButton: {
      backgroundColor: theme.colors.brandBlue,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: theme.typography.md,
      fontWeight: '700',
    },
  });
}