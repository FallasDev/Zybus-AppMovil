import type { ReactElement } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../shared/theme/colors';
import { images } from '../../../shared/assets/images';
import type { RootStackParamList } from '../../../navigation/types';
import { nearbyStops } from '../constants/home.mock';
import { BusStopCard } from '../components/BusStopCard';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen(): ReactElement {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.smallText}>Hola,</Text>
          <Text style={styles.title}>Paradas de Autobús Cercanas</Text>
        </View>

        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>D</Text>
        </View>
      </View>

      <View style={styles.mapCard}>
        <Image
          source={images.onboarding1}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.mapOverlay}>
          <Text style={styles.mapOverlayText}>Vista previa del mapa</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.searchWrap}
        onPress={() => navigation.navigate('AddDestination')}
      >
        <TextInput
          editable={false}
          placeholder="Añadir tu destino"
          placeholderTextColor="#9c9c9c"
          style={styles.searchInput}
        />
      </TouchableOpacity>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Paradas Cercanas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BusRoute')}>
          <Text style={styles.viewAll}>Ver ruta</Text>
        </TouchableOpacity>
      </View>

      {nearbyStops.map((stop) => (
        <BusStopCard
          key={stop.id}
          name={stop.name}
          distance={stop.distance}
          route={stop.route}
          onPress={() => navigation.navigate('BusRoute')}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 52,
    paddingBottom: 32,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  smallText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
  },
  profileCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.brandBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  mapCard: {
    height: 240,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#dfe8d8',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  mapOverlayText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  searchWrap: {
    marginBottom: 18,
  },
  searchInput: {
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.black,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brandBlue,
  },
});