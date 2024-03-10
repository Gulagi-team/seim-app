import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/Home/HomeScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';
import MyWalletScreen from '@/screens/Wallet/MyWallet/MyWalletScreen';
import {
  HOME,
  HOME_SELECTED,
  MINING,
  MINING_SELECTED,
  NOTIFICATION,
  SETTING,
  SETTING_SELECTED,
} from '@/assets/icons/bottom';

export const KEY_BOTTOM_SCREEN = {
  HOME: 'Home',
  WALLET: 'Mining',
  NOTIFICATION: 'Notify',
  PROFILE: 'Setting',
};

const ACTIVE_COLOR = '#1B9CFC';
const DEACTIVE_COLOR = '#404040';

const BottomTabConstant = {
  [KEY_BOTTOM_SCREEN.HOME]: {
    name: KEY_BOTTOM_SCREEN.HOME,
    component: HomeScreen,
    activeIcon: HOME_SELECTED,
    deactiveIcon: HOME,
    index: 0,
    activeColor: '#1B9CFC',
    deactiveColor: DEACTIVE_COLOR,
  },
  [KEY_BOTTOM_SCREEN.WALLET]: {
    name: KEY_BOTTOM_SCREEN.WALLET,
    component: MyWalletScreen,
    activeIcon: MINING_SELECTED,
    deactiveIcon: MINING,
    index: 1,
    activeColor: '#A29BFE',
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
    activeIcon: SETTING_SELECTED,
    deactiveIcon: SETTING,
    index: 2,
    activeColor: '#1DD1A1',
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
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          margin: 10,
          borderRadius: 10,
          height: 70,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarLabel: ({children, color, focused}) => {
          const newColor = focused
            ? BottomTabConstant[route.name].activeColor
            : BottomTabConstant[route.name].deactiveColor;
          return <Text style={{color: newColor}}>{children}</Text>;
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
