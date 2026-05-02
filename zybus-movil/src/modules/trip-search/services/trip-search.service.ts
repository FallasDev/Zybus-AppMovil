import {
  toStopOptionDTO,
  toTripSearchResultDTO,
  type StopOptionDTO,
  type TripSearchResultDTO,
} from '../models/trip-search.dto';
import type { TripSearchFormData } from '../models/trip-search.model';
import type { TripSearchResult, StopOption } from '../models/trip-search.model';

const mockStops: StopOption[] = [
  { id: 's_1', name: 'San José' },
  { id: 's_2', name: 'Alajuela' },
  { id: 's_3', name: 'Heredia' },
  { id: 's_4', name: 'Cartago' },
  { id: 's_5', name: 'Liberia' },
  { id: 's_6', name: 'Pérez Zeledón' },
  { id: 's_7', name: 'Puntarenas' },
  { id: 's_8', name: 'Limón' },
];

const mockResults: TripSearchResult[] = [
  {
    tripId: 't_1',
    routeName: 'San José – Alajuela Expreso',
    companyName: 'ZYBUS',
    logoUrl: '',
    departureTime: '2026-05-01T07:00:00',
    estimatedArrival: '2026-05-01T08:00:00',
    availableSeats: 24,
    priceFrom: 1200,
  },
  {
    tripId: 't_2',
    routeName: 'San José – Alajuela Regular',
    companyName: 'ZYBUS',
    logoUrl: '',
    departureTime: '2026-05-01T07:30:00',
    estimatedArrival: '2026-05-01T08:45:00',
    availableSeats: 8,
    priceFrom: 900,
  },
  {
    tripId: 't_3',
    routeName: 'San José – Alajuela Expreso Tarde',
    companyName: 'ZYBUS',
    logoUrl: '',
    departureTime: '2026-05-01T14:00:00',
    estimatedArrival: '2026-05-01T15:00:00',
    availableSeats: 40,
    priceFrom: 1100,
  },
];

const wait = (ms = 300): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const tripSearchService = {
  async getStops(): Promise<StopOptionDTO[]> {
    await wait();
    return mockStops.map(toStopOptionDTO);
  },

  async searchTrips(_params: TripSearchFormData): Promise<TripSearchResultDTO[]> {
    await wait(500);
    return mockResults.map(toTripSearchResultDTO);
  },
};
