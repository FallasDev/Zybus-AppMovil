import type { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../modules/onboarding';
import { LoginScreen, RegisterScreen, VerificationScreen } from '../modules/auth';
import { AddDestinationScreen, BusRouteScreen } from '../modules/home';
import { UsersScreen } from '../modules/users';
import { TicketsScreen } from '../modules/tickets';
import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="AddDestination" component={AddDestinationScreen} />
        <Stack.Screen name="BusRoute" component={BusRouteScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Tickets" component={TicketsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};