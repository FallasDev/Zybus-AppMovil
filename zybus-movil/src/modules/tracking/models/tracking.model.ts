export interface TrackingStop {
  id: string;
  name: string;
  sortOrder: number;
  latitude: number;
  longitude: number;
  isCompleted: boolean;
}

export interface TrackingDriver {
  name: string;
  licenseNumber: string;
}

export interface TrackingBus {
  model: string;
  licensePlate: string;
  typeName: string;
}

export interface TrackingIncident {
  id: string;
  description: string;
  severityName: string;
  incidentTypeName: string;
  reportedAt: string;
}

export interface BusPosition {
  latitude: number;
  longitude: number;
  speedKmh: number;
}

export interface TripTracking {
  tripId: string;
  routeName: string;
  stateName: string;
  departureTime: string;
  estimatedArrival: string;
  stops: TrackingStop[];
  driver: TrackingDriver;
  bus: TrackingBus;
  currentPosition: BusPosition;
  incidents: TrackingIncident[];
  etaMinutes: number | null;
}
