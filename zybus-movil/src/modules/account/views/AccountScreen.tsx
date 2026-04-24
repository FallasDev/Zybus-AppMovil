import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export function AccountScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta</Text>
      <Text style={styles.subtitle}>Perfil y configuración del usuario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.gray,
    textAlign: 'center',
  },
});