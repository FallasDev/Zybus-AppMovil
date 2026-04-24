import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyStatusBar } from '../../../shared/components/MyStatusBar';
import { colors } from '../../../shared/theme/colors';
import { onboardingSlides } from '../constants/onboarding.data';
import type { RootStackParamList } from '../../../navigation/types';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props): ReactElement {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <MyStatusBar />

      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.pagination}>
        {onboardingSlides.map((item, index) => (
          <View
            key={item.id}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingSlides.length - 1 ? 'Iniciar sesión' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brandBlue,
  },
  slide: {
    width,
    height,
    paddingHorizontal: 24,
    paddingBottom: 180,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height / 2.5,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  pagination: {
    position: 'absolute',
    bottom: 130,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF30',
    marginHorizontal: 6,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 32,
    paddingVertical: 12,
    elevation: 2,
  },
  buttonText: {
    color: colors.brandBlue,
    fontSize: 20,
    fontWeight: '600',
  },
});