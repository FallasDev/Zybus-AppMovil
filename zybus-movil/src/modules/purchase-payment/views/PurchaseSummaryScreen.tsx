import type { ReactElement } from 'react';
import { useMemo } from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps, } from '@react-navigation/native-stack';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';

import { usePurchasePaymentStore } from '../store/purchase-payment.store';

import { PaymentSummaryCard, PurchaseSummaryFooter, PurchaseTicketDetailCard, TicketTypeSummaryCard, } from '../index';

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

  const { setSelectedTicket } = usePurchasePaymentStore();

  const { tripId, selectedSeats, usesSeats, } = route.params;

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

  const purchaseData = useMemo(
  () => ({
    ticketId: tripId.toString(),
    title: `Viaje #${tripId}`,
    route: 'San José - Limón',
    seatNumber: usesSeats
      ? seatCodes
      : 'Sin numeración',
    usesSeats,
    ownerUserId: 'user-1',
    paymentMethodId: 0,
    total,
    paymentStatus: 'pending',
    salesChannelId: 1,
    purchaseDate: new Date().toISOString(),
    departurePoint: 'San José',
    arrivalPoint: 'Limón',
    duration: '2h 30min',
    date: new Date().toLocaleDateString(),
    departureTime: '07:00 AM',
  }),
  [tripId, seatCodes, total, usesSeats]
);

  const handleContinueToPayment = () => {
    setSelectedTicket({
      id: purchaseData.ticketId,
      title: purchaseData.title,
      route: purchaseData.route,
      seatNumber: purchaseData.seatNumber,
      ownerUserId: purchaseData.ownerUserId,
      createdAt: purchaseData.purchaseDate,
    });

    navigation.navigate('PaymentMethod', {
      purchaseData,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹ Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Resumen de compra</Text>

        <Text style={styles.subtitle}>
          Revisa el detalle antes de continuar al pago
        </Text>

        <PurchaseTicketDetailCard
          date={purchaseData.date}
          departurePoint={purchaseData.departurePoint}
          arrivalPoint={purchaseData.arrivalPoint}
          duration={purchaseData.duration}
          ticketQuantity={ticketQuantity}
          seatCodes={purchaseData.seatNumber}
        />

        <TicketTypeSummaryCard
          normalTickets={normalTickets}
          seniorTickets={seniorTickets}
          ticketUnitPrice={ticketUnitPrice}
        />

        <PaymentSummaryCard
          ticketUnitPrice={ticketUnitPrice}
          ticketQuantity={ticketQuantity}
          total={total}
        />
      </ScrollView>

      <PurchaseSummaryFooter
        total={total}
        onPress={handleContinueToPayment}
      />
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
  });
}