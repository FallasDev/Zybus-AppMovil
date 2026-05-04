import type { TripDetailResponseDTO } from './trip-detail.dto';
import type { TripDetail } from './trip-detail.model';

export const mapTripDetailFromDTO = (dto: TripDetailResponseDTO): TripDetail => ({
  tripId: dto.trip_id,
  departureTime: dto.departure_datetime,
  estimatedArrival: dto.estimated_arrival,
  stateName: dto.state_name,
  route: {
    name: dto.route_name,
    distanceKm: dto.distance_km,
    durationMinutes: dto.estimated_duration_minutes,
  },
  company: {
    name: dto.company_name,
    logoUrl: dto.logo_url,
    description: dto.company_description,
  },
  stops: dto.stops.map((s) => ({
    id: s.id,
    name: s.name,
    sortOrder: s.sort_order,
    latitude: s.latitude,
    longitude: s.longitude,
  })),
  fares: dto.fares.map((f) => ({
    fareTypeId: f.fare_type_id,
    fareTypeName: f.fare_type_name,
    price: f.price,
  })),
  bus: {
    model: dto.bus_model,
    licensePlate: dto.license_plate,
    typeName: dto.bus_type_name,
    capacity: dto.capacity,
  },
});
