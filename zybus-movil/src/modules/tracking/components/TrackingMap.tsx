import type { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import type { BusPosition, TrackingStop } from '../models/tracking.model';

interface TrackingMapProps {
  stops: TrackingStop[];
  busPosition: BusPosition | null;
}

function calcRegion(stops: TrackingStop[]) {
  if (stops.length === 0) {
    return { latitude: 9.9281, longitude: -84.0907, latitudeDelta: 0.1, longitudeDelta: 0.1 };
  }
  const lats = stops.map((s) => s.latitude);
  const lngs = stops.map((s) => s.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: (maxLat - minLat) * 1.4 + 0.02,
    longitudeDelta: (maxLng - minLng) * 1.4 + 0.02,
  };
}

export function TrackingMap({ stops, busPosition }: TrackingMapProps): ReactElement {
  const sorted = [...stops].sort((a, b) => a.sortOrder - b.sortOrder);
  const routeCoords = sorted.map((s) => ({ latitude: s.latitude, longitude: s.longitude }));
  const region = calcRegion(sorted);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation={false}>
        <Polyline coordinates={routeCoords} strokeColor="#1A56DB" strokeWidth={3} />

        {sorted.map((stop, index) => {
          const isEndpoint = index === 0 || index === sorted.length - 1;
          return (
            <Marker
              key={stop.id}
              coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
              title={stop.name}
              pinColor={stop.isCompleted ? '#1A56DB' : isEndpoint ? '#1A56DB' : '#9CA3AF'}
            />
          );
        })}

        {busPosition && (
          <Marker
            coordinate={{ latitude: busPosition.latitude, longitude: busPosition.longitude }}
            title="Bus"
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.busMarker}>
              <View style={styles.busIcon} />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '55%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  busMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  busIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F59E0B',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
