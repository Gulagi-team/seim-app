import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/Home/HomeScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';
import {
  HOME,
  HOME_SELECTED,
  HOME_DARK,
  NOTIFICATION,
  NOTIFICATION_SELECTED,
  NOTIFICATION_DARK,
  SETTING,
  SETTING_SELECTED,
  SETTING_DARK,
} from '@/assets/icons/bottom';
import {COLORS} from '@/theme/index';
import SettingScreen from '@/screens/Setting/SettingScreen';
import {StoreState, useAppSelector} from '@/store';
import TabIcon from './TabIcon';
import AnimatedTabLabel from './AnimatedTabLabel';

export const KEY_BOTTOM_SCREEN = {
  HOME: 'Home',
  NOTIFICATION: 'Notify',
  SETTING: 'Setting',
};

const BottomTab = () => {
  const {isDarkMode, containerColor, textColor} = useAppSelector(
    (state: StoreState) => state.ThemeSlice,
  );
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
    [KEY_BOTTOM_SCREEN.NOTIFICATION]: {
      name: KEY_BOTTOM_SCREEN.NOTIFICATION,
      component: NotificationScreen,
      activeIcon: NOTIFICATION_SELECTED,
      deactiveIcon: isDarkMode ? NOTIFICATION_DARK : NOTIFICATION,
      index: 1,
      activeColor: COLORS.secondary_orange2,
      deactiveColor: DEACTIVE_COLOR,
    },

    [KEY_BOTTOM_SCREEN.SETTING]: {
      name: KEY_BOTTOM_SCREEN.SETTING,
      component: SettingScreen,
      activeIcon: SETTING_SELECTED,
      deactiveIcon: isDarkMode ? SETTING_DARK : SETTING,
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
          return (
            <AnimatedTabLabel focused={focused} color={newColor}>
              {children}
            </AnimatedTabLabel>
          );
        },
        tabBarIcon: ({focused}) => {
          const iconSrc = focused
            ? BottomTabConstant[route.name].activeIcon
            : BottomTabConstant[route.name].deactiveIcon;
          return <TabIcon source={iconSrc} focused={focused} />;
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: DEACTIVE_COLOR,
      })}>
      {renderBottomTab}
    </Tab.Navigator>
  );
};

export default BottomTab;
