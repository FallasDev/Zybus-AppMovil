import { SelectedSeat } from "../modules/seat-selection/models/seat-selection.model";

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
  Notifications: undefined;
  PurchaseSummary: {
  tripId: string;
  usesSeats: boolean;
  selectedSeats: {
    id?: string;
    seatCode: string;
    passengerType: string;
    status?: string;
  }[];
};

SeatSelection: {
  tripId: string;
  passengers: number;
  usesSeats?: boolean;
};
  PaymentMethod: { purchaseData: any;};
  PaymentConfirmation: { purchaseData: any; paymentMethod: string; paymentStatus: 'approved' | 'rejected'; confirmationNumber: string;
};
  DigitalTicket: { purchaseData: any; confirmationNumber: string;};
};
