import {
  toTripDetailResponseDTO,
  type TripDetailResponseDTO,
} from '../models/trip-detail.dto';
import { TRIP_DETAIL_ERRORS } from '../constants/trip-detail.constants';
import type { TripDetail } from '../models/trip-detail.model';

const mockTripDetails: Record<string, TripDetail> = {
  t_1: {
    tripId: 't_1',
    departureTime: '2026-05-01T07:00:00',
    estimatedArrival: '2026-05-01T08:00:00',
    stateName: 'Activo',
    route: { name: 'San José – Alajuela Expreso', distanceKm: 20, durationMinutes: 60 },
    company: { name: 'ZYBUS', logoUrl: '', description: 'Transportes Unidos Alajuelenses S.A.' },
    stops: [
      { id: 'st_1', name: 'San José Centro', sortOrder: 1, latitude: 9.9281, longitude: -84.0907 },
      { id: 'st_2', name: 'La Uruca', sortOrder: 2, latitude: 9.9444, longitude: -84.1030 },
      { id: 'st_3', name: 'Ciudad del Este', sortOrder: 3, latitude: 9.9556, longitude: -84.1148 },
      { id: 'st_4', name: 'Alajuela Centro', sortOrder: 4, latitude: 10.0162, longitude: -84.2150 },
    ],
    fares: [
      { fareTypeId: 'ft_1', fareTypeName: 'Adulto', price: 1200 },
      { fareTypeId: 'ft_2', fareTypeName: 'Estudiante', price: 800 },
      { fareTypeId: 'ft_3', fareTypeName: 'Adulto mayor', price: 600 },
    ],
    bus: { model: 'Yutong ZK6118HGA', licensePlate: 'AB-1234', typeName: 'Bus Expreso', capacity: 40, usesSeats: true },
  },
  t_2: {
    tripId: 't_2',
    departureTime: '2026-05-01T07:30:00',
    estimatedArrival: '2026-05-01T08:45:00',
    stateName: 'Activo',
    route: { name: 'San José – Alajuela Regular', distanceKm: 22, durationMinutes: 75 },
    company: { name: 'ZYBUS', logoUrl: '', description: 'Transportes Unidos Alajuelenses S.A.' },
    stops: [
      { id: 'st_5', name: 'San José Sur', sortOrder: 1, latitude: 9.9200, longitude: -84.0800 },
      { id: 'st_6', name: 'Pavas', sortOrder: 2, latitude: 9.9350, longitude: -84.1200 },
      { id: 'st_7', name: 'San Antonio', sortOrder: 3, latitude: 9.9700, longitude: -84.1500 },
      { id: 'st_8', name: 'Alajuela Centro', sortOrder: 4, latitude: 10.0162, longitude: -84.2150 },
    ],
    fares: [
      { fareTypeId: 'ft_1', fareTypeName: 'Adulto', price: 900 },
      { fareTypeId: 'ft_2', fareTypeName: 'Estudiante', price: 600 },
      { fareTypeId: 'ft_3', fareTypeName: 'Adulto mayor', price: 450 },
    ],
    bus: { model: 'King Long XMQ6127J', licensePlate: 'CD-5678', typeName: 'Bus Regular', capacity: 45, usesSeats: false },
  },
  t_3: {
    tripId: 't_3',
    departureTime: '2026-05-01T14:00:00',
    estimatedArrival: '2026-05-01T15:00:00',
    stateName: 'Activo',
    route: { name: 'San José – Alajuela Expreso Tarde', distanceKm: 20, durationMinutes: 60 },
    company: { name: 'ZYBUS', logoUrl: '', description: 'Transportes Unidos Alajuelenses S.A.' },
    stops: [
      { id: 'st_1', name: 'San José Centro', sortOrder: 1, latitude: 9.9281, longitude: -84.0907 },
      { id: 'st_2', name: 'La Uruca', sortOrder: 2, latitude: 9.9444, longitude: -84.1030 },
      { id: 'st_4', name: 'Alajuela Centro', sortOrder: 3, latitude: 10.0162, longitude: -84.2150 },
    ],
    fares: [
      { fareTypeId: 'ft_1', fareTypeName: 'Adulto', price: 1100 },
      { fareTypeId: 'ft_2', fareTypeName: 'Estudiante', price: 750 },
      { fareTypeId: 'ft_3', fareTypeName: 'Adulto mayor', price: 550 },
    ],
    bus: { model: 'Yutong ZK6118HGA', licensePlate: 'EF-9012', typeName: 'Bus Expreso', capacity: 40, usesSeats: true },
  },
};

const wait = (ms = 400): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const tripDetailService = {
  async getTripDetail(tripId: string): Promise<TripDetailResponseDTO> {
    await wait();
    const detail = mockTripDetails[tripId];
    if (!detail) throw new Error(TRIP_DETAIL_ERRORS.TRIP_NOT_FOUND);
    return toTripDetailResponseDTO(detail);
  },
};
