export interface TripSearchFormData {
  originStopId: string;
  destinationStopId: string;
  date: string;
  passengers: number;
}

export interface TripSearchResult {
  tripId: string;
  routeName: string;
  companyName: string;
  logoUrl: string;
  departureTime: string;
  estimatedArrival: string;
  availableSeats: number;
  priceFrom: number;
}

export interface StopOption {
  id: string;
  name: string;
}
