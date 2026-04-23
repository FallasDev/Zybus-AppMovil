import type { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UsersScreen } from '../modules/users';
import { TicketsScreen } from '../modules/tickets';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Users"
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#f5f7fb' },
        }}
      >
        <Stack.Screen name="Users" component={UsersScreen} options={{ title: 'Users' }} />
        <Stack.Screen name="Tickets" component={TicketsScreen} options={{ title: 'Tickets' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
