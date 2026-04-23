import type { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UsersProvider } from './src/modules/users';
import { TicketsProvider } from './src/modules/tickets';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <UsersProvider>
          <TicketsProvider>
            <AppNavigator />
          </TicketsProvider>
        </UsersProvider>
        <StatusBar style="dark" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
});
