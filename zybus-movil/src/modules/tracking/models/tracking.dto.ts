export interface TrackingStopDTO {
  id: string;
  name: string;
  sort_order: number;
  latitude: number;
  longitude: number;
  is_completed: boolean;
}

export interface TrackingDriverDTO {
  name: string;
  license_number: string;
}

export interface TrackingBusDTO {
  model: string;
  license_plate: string;
  type_name: string;
}

export interface TrackingIncidentDTO {
  id: string;
  description: string;
  severity_name: string;
  incident_type_name: string;
  reported_at: string;
}

export interface BusPositionDTO {
  latitude: number;
  longitude: number;
  speed_kmh: number;
}

export interface TripTrackingResponseDTO {
  trip_id: string;
  route_name: string;
  state_name: string;
  departure_time: string;
  estimated_arrival: string;
  stops: TrackingStopDTO[];
  driver: TrackingDriverDTO;
  bus: TrackingBusDTO;
  current_position: BusPositionDTO;
  incidents: TrackingIncidentDTO[];
  eta_minutes: number | null;
}
