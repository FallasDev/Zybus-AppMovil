export interface TripRoute {
  name: string;
  distanceKm: number;
  durationMinutes: number;
}

export interface TripCompany {
  name: string;
  logoUrl: string;
  description: string;
}

export interface TripStop {
  id: string;
  name: string;
  sortOrder: number;
  latitude: number;
  longitude: number;
}

export interface TripFare {
  fareTypeId: string;
  fareTypeName: string;
  price: number;
}

export interface TripBus {
  model: string;
  licensePlate: string;
  typeName: string;
  capacity: number;
}

export interface TripDetail {
  tripId: string;
  departureTime: string;
  estimatedArrival: string;
  stateName: string;
  route: TripRoute;
  company: TripCompany;
  stops: TripStop[];
  fares: TripFare[];
  bus: TripBus;
}
