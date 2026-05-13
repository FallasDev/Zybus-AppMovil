import type { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../modules/onboarding';
import { LoginScreen, RegisterScreen, VerificationScreen } from '../modules/auth';
import { AddDestinationScreen, BusRouteScreen } from '../modules/home';
import { UsersScreen } from '../modules/users';
import { TicketsScreen } from '../modules/tickets';
import { SearchResultsScreen, TripSearchProvider } from '../modules/trip-search';
import { TripDetailScreen, TripDetailProvider } from '../modules/trip-detail';
import { SeatSelectionScreen, SeatSelectionProvider } from '../modules/seat-selection';
import { NotificationsScreen, NotificationsProvider } from '../modules/notifications';
import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';
import { TicketHistoryScreen } from '../modules/tickets/views/TicketsHistoryScreen';
import { TicketDetailScreen } from '../modules/tickets/views/TicketDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = (): ReactElement => {
  return (
    <NavigationContainer>
      <NotificationsProvider>
      <TripSearchProvider>
        <TripDetailProvider>
          <SeatSelectionProvider>
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
              <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
              <Stack.Screen name="TripDetail" component={TripDetailScreen} />
              <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
              <Stack.Screen name="TicketHistory" component={TicketHistoryScreen} />
             <Stack.Screen name="TicketDetailScreen" component={TicketDetailScreen} />
            </Stack.Navigator>
          </SeatSelectionProvider>
        </TripDetailProvider>
      </TripSearchProvider>
      </NotificationsProvider>
    </NavigationContainer>
  );
};