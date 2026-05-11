import type {
  TripTrackingResponseDTO,
  TrackingStopDTO,
  TrackingIncidentDTO,
} from './tracking.dto';
import type {
  TripTracking,
  TrackingStop,
  TrackingIncident,
} from './tracking.model';

function mapStop(dto: TrackingStopDTO): TrackingStop {
  return {
    id: dto.id,
    name: dto.name,
    sortOrder: dto.sort_order,
    latitude: dto.latitude,
    longitude: dto.longitude,
    isCompleted: dto.is_completed,
  };
}

function mapIncident(dto: TrackingIncidentDTO): TrackingIncident {
  return {
    id: dto.id,
    description: dto.description,
    severityName: dto.severity_name,
    incidentTypeName: dto.incident_type_name,
    reportedAt: dto.reported_at,
  };
}

export function mapTripTracking(dto: TripTrackingResponseDTO): TripTracking {
  return {
    tripId: dto.trip_id,
    routeName: dto.route_name,
    stateName: dto.state_name,
    departureTime: dto.departure_time,
    estimatedArrival: dto.estimated_arrival,
    stops: dto.stops.map(mapStop),
    driver: {
      name: dto.driver.name,
      licenseNumber: dto.driver.license_number,
    },
    bus: {
      model: dto.bus.model,
      licensePlate: dto.bus.license_plate,
      typeName: dto.bus.type_name,
    },
    currentPosition: {
      latitude: dto.current_position.latitude,
      longitude: dto.current_position.longitude,
      speedKmh: dto.current_position.speed_kmh,
    },
    incidents: dto.incidents.map(mapIncident),
    etaMinutes: dto.eta_minutes,
  };
}
