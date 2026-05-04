import type { TripSearchFormData, TripSearchResult, StopOption } from './trip-search.model';

export interface TripSearchRequestDTO {
  origin_stop_id: string;
  destination_stop_id: string;
  date: string;
  passengers: number;
}

export interface TripSearchResultDTO {
  trip_id: string;
  route_name: string;
  company_name: string;
  logo_url: string;
  departure_datetime: string;
  estimated_arrival: string;
  available_seats: number;
  price_from: number;
}

export interface StopOptionDTO {
  id: string;
  name: string;
}

export const toTripSearchRequestDTO = (data: TripSearchFormData): TripSearchRequestDTO => ({
  origin_stop_id: data.originStopId,
  destination_stop_id: data.destinationStopId,
  date: data.date,
  passengers: data.passengers,
});

export const toTripSearchResultDTO = (result: TripSearchResult): TripSearchResultDTO => ({
  trip_id: result.tripId,
  route_name: result.routeName,
  company_name: result.companyName,
  logo_url: result.logoUrl,
  departure_datetime: result.departureTime,
  estimated_arrival: result.estimatedArrival,
  available_seats: result.availableSeats,
  price_from: result.priceFrom,
});

export const toStopOptionDTO = (stop: StopOption): StopOptionDTO => ({
  id: stop.id,
  name: stop.name,
});
