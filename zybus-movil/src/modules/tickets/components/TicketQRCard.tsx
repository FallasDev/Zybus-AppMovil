import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../../../shared/theme/colors';

interface Props {
  qrCode: string;
  confirmationNumber: string;
}

export function TicketQRCard({ qrCode, confirmationNumber }: Props): ReactElement {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Código QR</Text>

      {qrCode ? (
        <View style={styles.qrWrap}>
          <QRCode value={qrCode} size={190} color="#000" backgroundColor="#fff" />
        </View>
      ) : (
        <Text style={styles.empty}>Sin código QR</Text>
      )}

      <View style={styles.notch}>
        <View style={styles.circle} />
        <View style={styles.dashed} />
        <View style={styles.circle} />
      </View>

      <Text style={styles.confirmLabel}>Número de confirmación</Text>
      <Text style={styles.confirmValue}>#{confirmationNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingTop: 22,
    paddingBottom: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 18,
  },
  qrWrap: {
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  empty: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 12,
  },
  notch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '120%',
    marginVertical: 20,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.background,
  },
  dashed: {
    flex: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    height: 1,
    marginHorizontal: 4,
  },
  confirmLabel: {
    fontSize: 12,
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  confirmValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.brandBlue,
  },
});
