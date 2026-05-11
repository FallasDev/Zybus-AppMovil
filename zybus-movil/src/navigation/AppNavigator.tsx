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
import { PurchaseSummaryView, PaymentMethodView, PaymentConfirmationView, DigitalTicketView,PurchasePaymentProvider} from '../modules/purchase-payment';
import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = (): ReactElement => {
  return (
    <NavigationContainer>
      <NotificationsProvider>
      <TripSearchProvider>
        <TripDetailProvider>
          <SeatSelectionProvider>
            <PurchasePaymentProvider>
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
              <Stack.Screen name="PurchaseSummary" component={PurchaseSummaryView} />
              <Stack.Screen name="PaymentMethod" component={PaymentMethodView} />
              <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationView} />
              <Stack.Screen name="DigitalTicket" component={DigitalTicketView} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
            </Stack.Navigator>
            </PurchasePaymentProvider>
          </SeatSelectionProvider>
        </TripDetailProvider>
      </TripSearchProvider>
      </NotificationsProvider>
    </NavigationContainer>
  );
};