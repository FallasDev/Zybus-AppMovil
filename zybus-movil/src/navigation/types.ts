import type { Ticket } from '../modules/tickets/models/ticket.model';
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Verification: undefined;
  MainTabs: undefined;
  AddDestination: undefined;
  BusRoute: undefined;
  Users: undefined;
  Tickets: undefined;
  TripSearch: undefined;
  SearchResults: { originStopId: string; destinationStopId: string; date: string; passengers: number };
  TripDetail: { tripId: string; passengers: number };
  SeatSelection: { tripId: string; passengers: number };
  Notifications: undefined;
   TicketHistory: undefined;
   TicketDetailScreen: { ticket: Ticket };
};