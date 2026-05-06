import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import { AppSuccessModal } from '../../../shared/components';

import type { RootStackParamList } from '../../../navigation/types';

type PaymentConfirmationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentConfirmation'
>;

type PaymentConfirmationRouteProp =
  NativeStackScreenProps<
    RootStackParamList,
    'PaymentConfirmation'
  >['route'];

export function PaymentConfirmationScreen(): ReactElement {
  const navigation = useNavigation<PaymentConfirmationNavProp>();
  const route = useRoute<PaymentConfirmationRouteProp>();

  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { purchaseData, paymentMethod, paymentStatus, confirmationNumber } =
    route.params;

  const isApproved = paymentStatus === 'approved';

  const [showModal, setShowModal] = useState(true);

  return (
    <View style={styles.container}>
      {/* Puedes dejar fondo vacío o info si quieres */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Procesando resultado del pago...
        </Text>
      </View>

      <AppSuccessModal
        visible={showModal}
        title={isApproved ? 'Pago aprobado' : 'Pago rechazado'}
        message={
          isApproved
            ? `Tu compra se realizó correctamente con ${paymentMethod}.`
            : 'No se pudo procesar el pago. Intenta nuevamente.'
        }
        buttonLabel={isApproved ? 'Ver ticket' : 'Intentar de nuevo'}
        onClose={() => {
          setShowModal(false);

          if (isApproved) {
            navigation.navigate('DigitalTicket', {
              purchaseData,
              confirmationNumber,
            });
          } else {
            navigation.navigate('PaymentMethod', {
              purchaseData,
            });
          }
        }}
      />
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: theme.typography.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
}