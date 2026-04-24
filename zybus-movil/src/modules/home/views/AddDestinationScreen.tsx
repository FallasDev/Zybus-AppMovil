import type { ReactElement } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../../shared/theme/colors';
import type { RootStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDestination'>;

export function AddDestinationScreen({ navigation }: Props): ReactElement {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add Destination</Text>

      <Text style={styles.label}>From</Text>
      <TextInput
        placeholder="Current location"
        placeholderTextColor="#b8b8b8"
        style={styles.input}
      />

      <Text style={styles.label}>To</Text>
      <TextInput
        placeholder="Choose destination"
        placeholderTextColor="#b8b8b8"
        style={styles.input}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.primaryButton}
        onPress={() => navigation.navigate('BusRoute')}
      >
        <Text style={styles.primaryButtonText}>Search Route</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  backText: {
    fontSize: 26,
    color: colors.black,
    marginTop: -2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    height: 54,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.black,
    marginBottom: 12,
  },
  primaryButton: {
    height: 56,
    backgroundColor: colors.brandBlue,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});