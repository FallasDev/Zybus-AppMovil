import type { TripSearchResultDTO, StopOptionDTO } from './trip-search.dto';
import type { TripSearchResult, StopOption } from './trip-search.model';

export const mapTripSearchResultFromDTO = (dto: TripSearchResultDTO): TripSearchResult => ({
  tripId: dto.trip_id,
  routeName: dto.route_name,
  companyName: dto.company_name,
  logoUrl: dto.logo_url,
  departureTime: dto.departure_datetime,
  estimatedArrival: dto.estimated_arrival,
  availableSeats: dto.available_seats,
  priceFrom: dto.price_from,
});

export const mapStopOptionFromDTO = (dto: StopOptionDTO): StopOption => ({
  id: dto.id,
  name: dto.name,
});
