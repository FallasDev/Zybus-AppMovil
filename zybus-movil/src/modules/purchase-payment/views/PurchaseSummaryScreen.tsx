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

type PurchaseSummaryNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'PurchaseSummary'
>;

type PurchaseSummaryRouteProp =
  NativeStackScreenProps<RootStackParamList, 'PurchaseSummary'>['route'];

export function PurchaseSummaryView(): ReactElement {
  const navigation = useNavigation<PurchaseSummaryNavProp>();
  const route = useRoute<PurchaseSummaryRouteProp>();

  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { tripId, selectedSeats } = route.params;

  const ticketUnitPrice = 5500;
  const ticketQuantity = selectedSeats.length;
  const total = ticketQuantity * ticketUnitPrice;
  const seatCodes = selectedSeats.map((seat) => seat.seatCode).join(', ');

  const normalTickets = selectedSeats.filter(
    (seat) => seat.passengerType !== 'adulto_mayor'
  ).length;

  const seniorTickets = selectedSeats.filter(
    (seat) => seat.passengerType === 'adulto_mayor'
  ).length;

  const purchaseData = {
    seat: seatCodes,
    finalPrice: total,
    passengerName: 'Pendiente',
    passengerId: 'Pendiente',
    origin: `Viaje #${tripId}`,
    destination: 'Destino seleccionado',
    date: new Date().toLocaleDateString(),
    time: 'Pendiente',
    
  departurePoint: 'San José',
  arrivalPoint: 'Limón',
  duration: '2h 30min',

  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Resumen de compra</Text>
        <Text style={styles.subtitle}>Revisa el detalle antes de continuar al pago</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Detalle del boleto</Text>
            <Ionicons name="ticket-outline" size={22} color={theme.colors.brandBlue} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha</Text>
            <Text style={styles.value}>{purchaseData.date}</Text>
          </View>

          <View style={styles.tripRoute}>
  <View style={styles.tripPoint}>
    <Text style={styles.timeText}>Salida</Text>
    <Text style={styles.placeText}>San José</Text>
  </View>

  <View style={styles.roadContainer}>
    <View style={styles.roadLine} />
    <View style={styles.busCircle}>
      <Ionicons name="bus-outline" size={20} color={theme.colors.white} />
    </View>
    <Text style={styles.durationText}>2h 30min</Text>
  </View>

  <View style={styles.tripPointRight}>
    <Text style={styles.timeText}>Llegada</Text>
    <Text style={styles.placeText}>Limón</Text>
  </View>
</View>

          <View style={styles.row}>
            <Text style={styles.label}>Cantidad de asientos</Text>
            <Text style={styles.value}>{ticketQuantity}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Asientos</Text>
            <Text style={styles.value}>{seatCodes}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tipo de boleto</Text>

          {normalTickets > 0 ? (
            <View style={styles.ticketRow}>
              <View>
                <Text style={styles.value}>Boleto normal</Text>
                <Text style={styles.label}>Cantidad: {normalTickets}</Text>
              </View>
              <Text style={styles.price}>₡{ticketUnitPrice}</Text>
            </View>
          ) : null}

          {seniorTickets > 0 ? (
            <View style={styles.ticketRow}>
              <View>
                <Text style={styles.value}>Boleto adulto mayor</Text>
                <Text style={styles.label}>Cantidad: {seniorTickets}</Text>
              </View>
              <Text style={styles.price}>₡{ticketUnitPrice}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumen de pago</Text>

          <View style={styles.paymentRow}>
            <Text style={styles.label}>Precio unitario por boleto</Text>
            <Text style={styles.value}>₡{ticketUnitPrice}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.label}>Cantidad total</Text>
            <Text style={styles.value}>{ticketQuantity}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Total a pagar</Text>
            <Text style={styles.totalPrice}>₡{total}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.footerTotal}>₡{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate('PaymentMethod', { purchaseData })}
        >
          <Text style={styles.payButtonText}>Continuar al pago</Text>
          <Ionicons name="arrow-forward" size={18} color={theme.colors.white} />
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
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    row: {
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
      fontWeight: '600',
    },
    ticketRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    price: {
      fontSize: theme.typography.md,
      color: theme.colors.brandBlue,
      fontWeight: '700',
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      gap: 12,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 6,
    },
    totalLabel: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    totalPrice: {
      fontSize: theme.typography.xl,
      color: theme.colors.brandBlue,
      fontWeight: '800',
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    footerTotal: {
      fontSize: theme.typography.lg,
      color: theme.colors.textPrimary,
      fontWeight: '800',
    },
    payButton: {
      flex: 1,
      backgroundColor: theme.colors.brandBlue,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    payButtonText: {
      color: theme.colors.white,
      fontSize: theme.typography.md,
      fontWeight: '700',
    },
    tripRoute: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
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
timeText: {
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
  });
}