import type { ReactElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { HomeScreen } from '../modules/home';
import { TicketsScreen } from '../modules/tickets';
import { AccountScreen } from '../modules/account';
import { MenuScreen } from '../modules/menu';
import { colors } from '../shared/theme/colors';

export type MainTabParamList = {
  HomeTab: undefined;
  TicketsTab: undefined;
  AccountTab: undefined;
  MenuTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs(): ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brandBlue,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.white,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TicketsTab"
        component={TicketsScreen}
        options={{
          tabBarLabel: 'Tiquetes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="confirmation-number" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{
          tabBarLabel: 'Menú',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}