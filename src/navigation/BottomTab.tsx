import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
// import { useDispatch } from 'react-redux';

import HomeScreen from '@/screens/Home/HomeScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';

import {HOME, NOTIFICATION, PROFILE} from '@/assets/icons/bottom';
import MyWalletScreen from '@/screens/Wallet/MyWallet/MyWalletScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const KEY_BOTTOM_SCREEN = {
  HOME: 'Trang chủ',
  WALLET: 'Ví',
  NOTIFICATION: 'Thông báo',
  PROFILE: 'Tài khoản',
};

const ACTIVE_COLOR = '#303030';
const DEACTIVE_COLOR = '#C5C5C5';

const BottomTabConstant = {
  [KEY_BOTTOM_SCREEN.HOME]: {
    name: KEY_BOTTOM_SCREEN.HOME,
    component: HomeScreen,
    // activeIcon: HOME, // TODO
    // deactiveIcon: HOME,
    icon: 'home',
    index: 0,
    activeColor: ACTIVE_COLOR,
    deactiveColor: DEACTIVE_COLOR,
  },
  [KEY_BOTTOM_SCREEN.WALLET]: {
    name: KEY_BOTTOM_SCREEN.WALLET,
    component: MyWalletScreen,
    // activeIcon: NOTIFICATION, // TODO
    // deactiveIcon: NOTIFICATION,
    icon: 'account-balance-wallet',
    index: 1,
    activeColor: ACTIVE_COLOR,
    deactiveColor: DEACTIVE_COLOR,
  },
  [KEY_BOTTOM_SCREEN.NOTIFICATION]: {
    name: KEY_BOTTOM_SCREEN.NOTIFICATION,
    component: NotificationScreen,
    // activeIcon: NOTIFICATION, // TODO
    // deactiveIcon: NOTIFICATION,
    icon: 'notifications',
    index: 1,
    activeColor: ACTIVE_COLOR,
    deactiveColor: DEACTIVE_COLOR,
  },

  [KEY_BOTTOM_SCREEN.PROFILE]: {
    name: KEY_BOTTOM_SCREEN.PROFILE,
    component: ProfileScreen,
    // activeIcon: PROFILE, // TODO
    // deactiveIcon: PROFILE,
    icon: 'account-circle',
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
          const iconName = BottomTabConstant[route.name]?.icon;
          // const iconSrc = focused
          //   ? BottomTabConstant[route.name].activeIcon
          //   : BottomTabConstant[route.name].deactiveIcon;
          const newColor = focused
            ? BottomTabConstant[route.name].activeColor
            : BottomTabConstant[route.name].deactiveColor;

          return (
            // <Image
            //   source={iconSrc}
            //   resizeMode="contain"
            //   style={{width: 28, height: 28}}
            // />
            <Icon name={iconName} size={28} color={newColor} />
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
