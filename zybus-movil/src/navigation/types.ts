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
  SearchResults: { originStopId: string; destinationStopId: string; date: string; passengers: number };
  TripDetail: { tripId: string; passengers: number };
  SeatSelection: { tripId: string; passengers: number };
  Notifications: undefined;
};