export interface TripSearchFormData {
  originStopId: string;
  destinationStopId: string;
  date: string;
  passengers: number;
  normales: number;
  adultosMayores: number;
  identificaciones: string[];
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
