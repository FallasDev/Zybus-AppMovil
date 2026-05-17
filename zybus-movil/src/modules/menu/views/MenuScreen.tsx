import type { ReactElement } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../shared/theme/colors';
import { images } from '../../../shared/assets/images';
import type { RootStackParamList } from '../../../navigation/types';

type MenuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NOOP = () => {};

interface MenuItem {
  label: string;
  onPress: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export function MenuScreen(): ReactElement {
  const navigation = useNavigation<MenuNavigationProp>();

  const sections: MenuSection[] = [
    {
      title: 'General',
      items: [
        { label: 'Configuración', onPress: () => navigation.navigate('Profile') },
        { label: 'Preferencias de usuario', onPress: NOOP },
        { label: '¿Necesitas ayuda?', onPress: NOOP },
        { label: 'Términos y condiciones', onPress: NOOP },
        { label: 'Política de privacidad', onPress: NOOP },
        { label: 'Aviso legal', onPress: NOOP },
        { label: 'Accesibilidad', onPress: NOOP },
        { label: 'Ubicaciones', onPress: () => navigation.navigate('BusRoute') },
        { label: 'Calificar la app', onPress: NOOP },
        { label: 'Acerca de Zybus', onPress: NOOP },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     
      <View style={styles.header}>
        <Image source={images.logoBlanco} style={styles.logo} resizeMode="contain" />
      </View>

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionDivider} />

          {section.items.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index < section.items.length - 1 && styles.menuItemBorder,
              ]}
              onPress={item.onPress}
              activeOpacity={0.5}
            >
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  /* Header */
  header: {
    backgroundColor: colors.brandBlue,
    paddingTop: 52,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  logo: {
    width: 90,
    height: 100,
  },

  /* Sección */
  section: {
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.brandBlue,
    marginBottom: 10,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: colors.brandBlue,
    marginHorizontal: -20,
    marginBottom: 0,
  },

  /* Ítems */
  menuItem: {
    paddingVertical: 18,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.18)',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.black,
  },
});
