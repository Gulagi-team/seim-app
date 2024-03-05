import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
// import { useDispatch } from 'react-redux';

import HomeScreen from '@/screens/Home/HomeScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';

import {HOME, NOTIFICATION, PROFILE} from '@/assets/icons/bottom';

export const KEY_BOTTOM_SCREEN = {
  HOME: 'Trang chủ',
  NOTIFICATION: 'Thông báo',
  PROFILE: 'Tài khoản',
};

const ACTIVE_COLOR = '#1873D3';
const DEACTIVE_COLOR = '#1873D3';

const BottomTabConstant = {
  [KEY_BOTTOM_SCREEN.HOME]: {
    name: KEY_BOTTOM_SCREEN.HOME,
    component: HomeScreen,
    activeIcon: HOME, // TODO
    deactiveIcon: HOME,
    index: 0,
    activeColor: ACTIVE_COLOR,
    deactiveColor: DEACTIVE_COLOR,
  },
  [KEY_BOTTOM_SCREEN.NOTIFICATION]: {
    name: KEY_BOTTOM_SCREEN.NOTIFICATION,
    component: NotificationScreen,
    activeIcon: NOTIFICATION, // TODO
    deactiveIcon: NOTIFICATION,
    index: 1,
    activeColor: ACTIVE_COLOR,
    deactiveColor: DEACTIVE_COLOR,
  },

  [KEY_BOTTOM_SCREEN.PROFILE]: {
    name: KEY_BOTTOM_SCREEN.PROFILE,
    component: ProfileScreen,
    activeIcon: PROFILE, // TODO
    deactiveIcon: PROFILE,
    index: 2,
    activeColor: ACTIVE_COLOR,
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

const BottomTab = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(updateRegistrationToken());
  // }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconSrc = focused
            ? BottomTabConstant[route.name].activeIcon
            : BottomTabConstant[route.name].deactiveIcon;
          const newColor = focused
            ? BottomTabConstant[route.name].activeColor
            : BottomTabConstant[route.name].deactiveColor;

          return (
            <Image
              source={iconSrc}
              resizeMode="contain"
              style={{width: 28, height: 28}}
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
