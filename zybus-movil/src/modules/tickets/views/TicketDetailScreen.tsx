import type { ReactElement } from 'react';
import { useMemo } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';
import { Header } from '../../tickets/components/Header';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';


type Props = NativeStackScreenProps<
  RootStackParamList,
  'TicketDetailScreen'
>;

export function TicketDetailScreen({
  route,
}: Props): ReactElement {
  const { ticket } = route.params;

  const { theme } = useAppTheme();

  const styles = useMemo(
    () => makeStyles(theme),
    [theme]
  );

  const isActive =
    new Date(ticket.departureDatetime) >=
    new Date();

  return (
    <View style={styles.wrapper}>
      <Header title="Detalle del ticket" />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* STATUS */}
        <View
          style={[
            styles.statusBox,
            isActive
              ? styles.active
              : styles.past,
          ]}
        >
          <Text style={styles.statusText}>
            {isActive
              ? 'Activo'
              : 'Finalizado'}
          </Text>
        </View>

        {/* ROUTE */}
        <Text style={styles.route}>
          {ticket.routeName}
        </Text>

        {/* QR */}
        <View style={styles.qrBox}>
          <Text style={styles.label}>
            Código QR
          </Text>

          {ticket.qrCode ? (
            <View
              style={styles.qrImageContainer}
            >
              <QRCode
                value={ticket.qrCode}
                size={200}
                color="#000"
                backgroundColor="#fff"
              />
            </View>
          ) : (
            <Text style={styles.qrText}>
              Sin código QR
            </Text>
          )}

          {/* CONFIRMATION */}
          <View style={styles.qrInfo}>
            <Text style={styles.label}>
              Número de confirmación
            </Text>

            <Text style={styles.value}>
              {ticket.confirmationNumber}
            </Text>
          </View>
        </View>

       {/* DETAILS */}
<View style={styles.detailsCard}>
  <View style={styles.detailRow}>
    <Text style={styles.label}>
      Pasajero:
    </Text>

    <Text style={styles.value}>
      {ticket.passengerName}
    </Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.detailRow}>
    <Text style={styles.label}>
      Asiento:
    </Text>

    <Text style={styles.value}>
      {ticket.seatLabel}
    </Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.detailRow}>
    <Text style={styles.label}>
      Precio:
    </Text>

    <Text style={styles.value}>
      ₡ {ticket.price}
    </Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.detailRow}>
    <Text style={styles.label}>
      Ruta:
    </Text>

    <Text style={styles.value}>
      #{ticket.tripId}
    </Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.detailRow}>
    <Text style={styles.label}>
      Compra:
    </Text>

    <Text style={styles.value}>
      #{ticket.purchaseId}
    </Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.detailRow}>
    <Text style={styles.label}>
      Emisión:
    </Text>

    <Text style={styles.value}>
      {new Date(
        ticket.issuedAt
      ).toLocaleString()}
    </Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.detailRow}>
    <Text style={styles.label}>
      Salida:
    </Text>

    <Text style={styles.value}>
      {new Date(
        ticket.departureDatetime
      ).toLocaleString()}
    </Text>
  </View>
 </View>
      </ScrollView>
    </View>
  );
}

/*  STYLES */

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    wrapper: {
      flex: 1,

      backgroundColor:
        theme.colors.background,
    },

    container: {
      flex: 1,

      paddingHorizontal: 20,

      paddingBottom: 24,
    },

    /* STATUS */
    statusBox: {
      paddingVertical: 10,

      paddingHorizontal: 14,

      borderRadius: 10,

      alignSelf: 'flex-start',

      marginTop: 16,

      marginBottom: 14,
    },

    active: {
      backgroundColor: '#d1fae5',
    },

    past: {
      backgroundColor: '#fee2e2',
    },

    statusText: {
      fontWeight: '700',

      fontSize: 14,

      color: theme.colors.brandBlue,
    },

    /* ROUTE */
    route: {
      fontSize: 24,

      fontWeight: '700',

      color: theme.colors.textPrimary,

      marginBottom: 12,
    },

    /* QR */
    qrBox: {
      marginTop: 10,

      padding: 18,

      backgroundColor:
        theme.colors.surface,

      borderRadius: 16,

      alignItems: 'center',
    },

    qrImageContainer: {
      marginTop: 12,

      padding: 12,

      backgroundColor: '#fff',

      borderRadius: 12,
    },

    qrText: {
      marginTop: 12,

      fontSize: 13,

      color: theme.colors.textSecondary,
    },

    qrInfo: {
      marginTop: 16,

      width: '100%',

      alignItems: 'center',
    },

    /* SECTION */
    section: {
      marginTop: 14,

      padding: 14,

      backgroundColor:
        theme.colors.surface,

      borderRadius: 14,
    },

    label: {
      fontSize: 12,

      color: theme.colors.textSecondary,

      marginBottom: 6,

      textTransform: 'uppercase',
    },

    value: {
      fontSize: 16,

      fontWeight: '600',

      color: theme.colors.textPrimary,
    },
    detailsCard: {
      marginTop: 16,

      backgroundColor:
        theme.colors.surface,

      borderRadius: 16,

      paddingVertical: 6,
    },

    detailRow: {
      paddingHorizontal: 16,

      paddingVertical: 12,
    },

    divider: {
      height: 1,
      backgroundColor: '#e5e7eb',
      marginHorizontal: 16,
    },

  });
}