import type { TripDetail, TripStop, TripFare } from './trip-detail.model';

export interface TripStopDTO {
  id: string;
  name: string;
  sort_order: number;
  latitude: number;
  longitude: number;
}

export interface TripFareDTO {
  fare_type_id: string;
  fare_type_name: string;
  price: number;
}

export interface TripDetailResponseDTO {
  trip_id: string;
  departure_datetime: string;
  estimated_arrival: string;
  state_name: string;
  route_name: string;
  distance_km: number;
  estimated_duration_minutes: number;
  company_name: string;
  logo_url: string;
  company_description: string;
  stops: TripStopDTO[];
  fares: TripFareDTO[];
  bus_model: string;
  license_plate: string;
  bus_type_name: string;
  capacity: number;
}

export const toTripStopDTO = (stop: TripStop): TripStopDTO => ({
  id: stop.id,
  name: stop.name,
  sort_order: stop.sortOrder,
  latitude: stop.latitude,
  longitude: stop.longitude,
});

export const toTripFareDTO = (fare: TripFare): TripFareDTO => ({
  fare_type_id: fare.fareTypeId,
  fare_type_name: fare.fareTypeName,
  price: fare.price,
});

export const toTripDetailResponseDTO = (detail: TripDetail): TripDetailResponseDTO => ({
  trip_id: detail.tripId,
  departure_datetime: detail.departureTime,
  estimated_arrival: detail.estimatedArrival,
  state_name: detail.stateName,
  route_name: detail.route.name,
  distance_km: detail.route.distanceKm,
  estimated_duration_minutes: detail.route.durationMinutes,
  company_name: detail.company.name,
  logo_url: detail.company.logoUrl,
  company_description: detail.company.description,
  stops: detail.stops.map(toTripStopDTO),
  fares: detail.fares.map(toTripFareDTO),
  bus_model: detail.bus.model,
  license_plate: detail.bus.licensePlate,
  bus_type_name: detail.bus.typeName,
  capacity: detail.bus.capacity,
});
