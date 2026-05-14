import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
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

type PaymentMethodNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentMethod'
>;

type PaymentMethodRouteProp =
  NativeStackScreenProps<RootStackParamList, 'PaymentMethod'>['route'];

export function PaymentMethodView(): ReactElement {
  const navigation = useNavigation<PaymentMethodNavProp>();
  const route = useRoute<PaymentMethodRouteProp>();

  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { purchaseData } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta');

  const handlePayment = () => {
    navigation.navigate('PaymentConfirmation', {
      purchaseData,
      paymentMethod,
      paymentStatus: 'approved',
      confirmationNumber: '123456',
    });
  };

return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
      <Text style={styles.backText}>‹ Volver</Text>
    </TouchableOpacity>

    <View style={styles.content}>
      <Text style={styles.title}>Método de pago</Text>
      <Text style={styles.subtitle}>Selecciona cómo deseas pagar tu boleto</Text>

      {['Tarjeta', 'SINPE Móvil'].map((method) => (
        <TouchableOpacity
          key={method}
          style={[styles.optionCard, paymentMethod === method && styles.optionSelected]}
          onPress={() => setPaymentMethod(method)}
        >
          <Text style={styles.optionTitle}>{method}</Text>
          <Text style={styles.optionDescription}>
            {paymentMethod === method ? 'Método seleccionado' : 'Tocar para seleccionar'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <View style={styles.footer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total a pagar</Text>
        <Text style={styles.total}>₡{purchaseData.total}</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handlePayment}>
        <Text style={styles.primaryButtonText}>Pagar ahora</Text>
      </TouchableOpacity>
    </View>
  </View>
);
function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    backBtn: {
      paddingHorizontal: 20,
      paddingTop: 52,
      paddingBottom: 4,
    },

    backText: {
      fontSize: theme.typography.md,
      color: theme.colors.brandBlue,
      fontWeight: '600',
    },

    content: {
      padding: 20,
      paddingBottom: 140,
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
      marginBottom: 20,
    },

    optionCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 18,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    optionSelected: {
      borderColor: theme.colors.brandBlue,
    },

    optionTitle: {
      fontSize: theme.typography.md,
      color: theme.colors.textPrimary,
      fontWeight: '700',
      marginBottom: 4,
    },

    optionDescription: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },

    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      padding: 16,
      paddingBottom: 28,
    },

    summaryCard: {
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },

    summaryText: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },

    total: {
      fontSize: theme.typography.lg,
      color: theme.colors.textPrimary,
      fontWeight: '700',
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
}