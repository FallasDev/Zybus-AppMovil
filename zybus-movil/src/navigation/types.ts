import type { Ticket } from '../modules/tickets/models/ticket.model';
import type { SelectedSeat } from '../modules/seat-selection/models/seat-selection.model';

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
  TicketHistory: undefined;
  TicketDetailScreen: { ticket: Ticket };

  TripSearch: undefined;
  SearchResults: {
    originStopId: string;
    destinationStopId: string;
    date: string;
    passengers: number;
  };

  TripDetail: {
    tripId: string;
    passengers: number;
  };

  SeatSelection: {
    tripId: string;
    passengers: number;
    usesSeats?: boolean;
  };

  TripTracking: {
    tripId: string;
  };

  Notifications: undefined;
  Profile: undefined;

  PurchaseSummary: {
    tripId: string;
    usesSeats: boolean;
    selectedSeats: SelectedSeat[];
  };

  PaymentMethod: {
    purchaseData: any;
  };

  PaymentConfirmation: {
    purchaseData: any;
    paymentMethod: string;
    paymentStatus: 'approved' | 'rejected';
    confirmationNumber: string;
  };

  DigitalTicket: {
    purchaseData: any;
    confirmationNumber: string;
  };
    
};