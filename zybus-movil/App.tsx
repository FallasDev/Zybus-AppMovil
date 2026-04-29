import type { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UsersProvider } from './src/modules/users';
import { TicketsProvider } from './src/modules/tickets';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/shared/providers';
import { useAppTheme } from './src/shared/hooks';

function AppContent(): ReactElement {
  const { mode } = useAppTheme();
  return (
    <>
      <AppNavigator />
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ThemeProvider>
          <UsersProvider>
            <TicketsProvider>
              <AppContent />
            </TicketsProvider>
          </UsersProvider>
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
