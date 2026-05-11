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

import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';

import { usePurchasePaymentStore } from '../store/purchase-payment.store';

import {
  DigitalTicketHeaderCard,
  TripRouteCard,
  TicketDetailsCard,
  PaymentStatusCard,
} from '../components/Index';

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
  const { purchase } = usePurchasePaymentStore();

  const routeParts = purchase?.route?.split(' - ') ?? [];

  const departurePoint =
    routeParts[0] ?? purchaseData?.departurePoint ?? 'Salida pendiente';

  const arrivalPoint =
    routeParts[1] ?? purchaseData?.arrivalPoint ?? 'Llegada pendiente';

  const duration = purchaseData?.duration ?? '2h 30min';

  const purchaseDate = purchase?.purchaseDate
    ? new Date(purchase.purchaseDate).toLocaleDateString()
    : purchaseData?.date ?? 'Pendiente';

  const departureTime = purchaseData?.departureTime ?? 'Hora pendiente';

  const seatNumber =
    purchase?.seatNumber ??
    purchaseData?.seatNumber ??
    purchaseData?.seat ??
    'Pendiente';

  const totalPaid =
    purchase?.total ??
    purchaseData?.total ??
    purchaseData?.finalPrice ??
    0;

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

        <Text style={styles.subtitle}>
          Presenta este boleto al abordar
        </Text>

        <DigitalTicketHeaderCard
          confirmationNumber={confirmationNumber}
        />

        <TripRouteCard
          departurePoint={departurePoint}
          arrivalPoint={arrivalPoint}
          duration={duration}
        />

        <TicketDetailsCard
          date={purchaseDate}
          time={departureTime}
          seatNumber={seatNumber}
        />

        <PaymentStatusCard totalPaid={totalPaid} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.primaryButtonText}>
            Volver al inicio
          </Text>
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