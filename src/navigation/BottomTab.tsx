/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  HOME,
  HOME_DARK,
  HOME_SELECTED,
  MINING,
  MINING_DARK,
  MINING_SELECTED,
  USER,
  USER_DARK,
  USER_SELECTED,
} from '@/assets/icons/bottom';
import HomeScreen from '@/screens/Home/HomeScreen';
import MiningScreen from '@/screens/Mining/MiningScreen';
import SettingScreen from '@/screens/Setting/SettingScreen';
import {StoreState, useAppSelector} from '@/store';
import {COLORS} from '@/theme/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {Image, Text} from 'react-native';

export const KEY_BOTTOM_SCREEN = {
  HOME: 'home',
  ENERGY: 'energy',
  NOTIFICATION: 'Notify',
  PROFILE: 'profile',
};

const BottomTab = () => {
  const {isDarkMode, containerColor, textColor} = useAppSelector(
    (state: StoreState) => state.ThemeSlice,
  );
  const {t} = useTranslation(['other']);

  const ACTIVE_COLOR = COLORS.primary_A500;
  const DEACTIVE_COLOR = textColor;

  const BottomTabConstant = {
    [KEY_BOTTOM_SCREEN.HOME]: {
      name: KEY_BOTTOM_SCREEN.HOME,
      component: HomeScreen,
      activeIcon: HOME_SELECTED,
      deactiveIcon: isDarkMode ? HOME_DARK : HOME,
      index: 0,
      activeColor: COLORS.primary_A500,
      deactiveColor: DEACTIVE_COLOR,
    },
    [KEY_BOTTOM_SCREEN.ENERGY]: {
      name: KEY_BOTTOM_SCREEN.ENERGY,
      component: MiningScreen,
      activeIcon: MINING_SELECTED,
      deactiveIcon: isDarkMode ? MINING_DARK : MINING,
      index: 1,
      activeColor: COLORS.secondary_violet2,
      deactiveColor: DEACTIVE_COLOR,
    },

    [KEY_BOTTOM_SCREEN.PROFILE]: {
      name: KEY_BOTTOM_SCREEN.PROFILE,
      component: SettingScreen,
      activeIcon: USER_SELECTED,
      deactiveIcon: isDarkMode ? USER_DARK : USER,
      index: 2,
      activeColor: COLORS.secondary_green1,
      deactiveColor: DEACTIVE_COLOR,
    },
  };

  const Tab = createBottomTabNavigator();

  const renderBottomTab = Object.values(BottomTabConstant)
    .sort((a, b) => a.index - b.index)
    .map(item => (
      <Tab.Screen
        options={{
          headerShown: false,
          // animationEnabled: true,
        }}
        key={item.name}
        name={item.name}
        component={item.component}
      />
    ));

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          margin: 10,
          borderRadius: 10,
          height: 70,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: containerColor,
        },
        tabBarLabel: ({children, color, focused}) => {
          const newColor = focused
            ? BottomTabConstant[route.name].activeColor
            : BottomTabConstant[route.name].deactiveColor;
          return <Text style={{color: newColor}}>{t(children)}</Text>;
        },
        tabBarIcon: ({focused, color, size}) => {
          const iconSrc = focused
            ? BottomTabConstant[route.name].activeIcon
            : BottomTabConstant[route.name].deactiveIcon;
          return (
            <Image
              source={iconSrc}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
          );
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: DEACTIVE_COLOR,
      })}>
      {renderBottomTab}
    </Tab.Navigator>
  );
};

export default BottomTab;
