import type { TripTracking, TrackingStop, BusPosition } from '../models/tracking.model';
import { TRACKING_TEXT } from '../constants/tracking.constants';

const mockTrackingData: Record<string, TripTracking> = {
  t_1: {
    tripId: 't_1',
    routeName: 'San José – Alajuela Expreso',
    stateName: 'En ruta',
    departureTime: '2026-05-05T07:00:00',
    estimatedArrival: '2026-05-05T08:00:00',
    stops: [
      { id: 'st_1', name: 'San José Centro', sortOrder: 1, latitude: 9.9281, longitude: -84.0907, isCompleted: true },
      { id: 'st_2', name: 'La Uruca', sortOrder: 2, latitude: 9.9444, longitude: -84.1030, isCompleted: true },
      { id: 'st_3', name: 'Ciudad del Este', sortOrder: 3, latitude: 9.9556, longitude: -84.1148, isCompleted: false },
      { id: 'st_4', name: 'Alajuela Centro', sortOrder: 4, latitude: 10.0162, longitude: -84.2150, isCompleted: false },
    ],
    driver: {
      name: 'Carlos Rodríguez Mora',
      licenseNumber: 'B-23456',
    },
    bus: {
      model: 'Yutong ZK6118HGA',
      licensePlate: 'AB-1234',
      typeName: 'Bus Expreso',
    },
    currentPosition: {
      latitude: 9.9500,
      longitude: -84.1090,
      speedKmh: 62,
    },
    incidents: [],
    etaMinutes: 35,
  },
  t_2: {
    tripId: 't_2',
    routeName: 'San José – Alajuela Regular',
    stateName: 'Demorado',
    departureTime: '2026-05-05T07:30:00',
    estimatedArrival: '2026-05-05T08:55:00',
    stops: [
      { id: 'st_5', name: 'San José Sur', sortOrder: 1, latitude: 9.9200, longitude: -84.0800, isCompleted: true },
      { id: 'st_6', name: 'Pavas', sortOrder: 2, latitude: 9.9350, longitude: -84.1200, isCompleted: false },
      { id: 'st_7', name: 'San Antonio', sortOrder: 3, latitude: 9.9700, longitude: -84.1500, isCompleted: false },
      { id: 'st_8', name: 'Alajuela Centro', sortOrder: 4, latitude: 10.0162, longitude: -84.2150, isCompleted: false },
    ],
    driver: {
      name: 'Mario Jiménez Solano',
      licenseNumber: 'C-78901',
    },
    bus: {
      model: 'King Long XMQ6127J',
      licensePlate: 'CD-5678',
      typeName: 'Bus Regular',
    },
    currentPosition: {
      latitude: 9.9275,
      longitude: -84.1000,
      speedKmh: 28,
    },
    incidents: [
      {
        id: 'inc_1',
        description: 'Tráfico pesado en Av. 10. Se estima demora de 10 minutos.',
        severityName: 'MEDIA',
        incidentTypeName: 'Tráfico',
        reportedAt: '2026-05-05T07:45:00',
      },
    ],
    etaMinutes: 50,
  },
};

const wait = (ms = 400): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

function interpolate(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export const trackingService = {
  async getTripTracking(tripId: string): Promise<TripTracking> {
    await wait();
    const data = mockTrackingData[tripId];
    if (!data) throw new Error(TRACKING_TEXT.ERROR_NOT_FOUND);
    return { ...data, stops: data.stops.map((s) => ({ ...s })) };
  },

  subscribeToBusPosition(
    tripId: string,
    onUpdate: (position: BusPosition, stops: TrackingStop[]) => void
  ): () => void {
    const data = mockTrackingData[tripId];
    if (!data) return () => {};

    const sortedStops = [...data.stops].sort((a, b) => a.sortOrder - b.sortOrder);
    const stops: TrackingStop[] = sortedStops.map((s) => ({ ...s }));

    let segmentIndex = stops.findIndex((s) => !s.isCompleted);
    if (segmentIndex <= 0) segmentIndex = 1;

    let progress = 0.1;

    const interval = setInterval(() => {
      if (segmentIndex >= stops.length) {
        clearInterval(interval);
        return;
      }

      const from = stops[segmentIndex - 1];
      const to = stops[segmentIndex];

      progress += 0.12;

      if (progress >= 1) {
        stops[segmentIndex - 1].isCompleted = true;
        segmentIndex += 1;
        progress = 0;

        if (segmentIndex >= stops.length) {
          clearInterval(interval);
          onUpdate(
            { latitude: to.latitude, longitude: to.longitude, speedKmh: 0 },
            stops
          );
          return;
        }
      }

      const latitude = interpolate(from.latitude, to.latitude, progress);
      const longitude = interpolate(from.longitude, to.longitude, progress);

      onUpdate({ latitude, longitude, speedKmh: 55 + Math.random() * 15 }, stops);
    }, 3000);

    return () => clearInterval(interval);
  },
};
