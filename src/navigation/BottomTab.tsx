import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/Home/HomeScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';
import {
  HOME,
  HOME_SELECTED,
  MINING,
  MINING_SELECTED,
  NOTIFICATION,
  NOTIFICATION_SELECTED,
  SETTING,
  SETTING_SELECTED,
} from '@/assets/icons/bottom';
import {COLORS} from '@/theme/index';
import MiningScreen from '@/screens/Mining/MiningScreen';
import SettingScreen from '@/screens/Setting/SettingScreen';

export const KEY_BOTTOM_SCREEN = {
  HOME: 'Home',
  MINING: 'Mining',
  NOTIFICATION: 'Notify',
  SETTING: 'Setting',
};

const ACTIVE_COLOR = COLORS.primary_A500;
const DEACTIVE_COLOR = COLORS.text_A700;

const BottomTabConstant = {
  [KEY_BOTTOM_SCREEN.HOME]: {
    name: KEY_BOTTOM_SCREEN.HOME,
    component: HomeScreen,
    activeIcon: HOME_SELECTED,
    deactiveIcon: HOME,
    index: 0,
    activeColor: COLORS.primary_A500,
    deactiveColor: DEACTIVE_COLOR,
  },
  [KEY_BOTTOM_SCREEN.MINING]: {
    name: KEY_BOTTOM_SCREEN.MINING,
    component: MiningScreen,
    activeIcon: MINING_SELECTED,
    deactiveIcon: MINING,
    index: 1,
    activeColor: COLORS.secondary_violet2,
    deactiveColor: DEACTIVE_COLOR,
  },
  [KEY_BOTTOM_SCREEN.NOTIFICATION]: {
    name: KEY_BOTTOM_SCREEN.NOTIFICATION,
    component: NotificationScreen,
    activeIcon: NOTIFICATION_SELECTED,
    deactiveIcon: NOTIFICATION,
    index: 1,
    activeColor: COLORS.secondary_orange2,
    deactiveColor: DEACTIVE_COLOR,
  },

  [KEY_BOTTOM_SCREEN.SETTING]: {
    name: KEY_BOTTOM_SCREEN.SETTING,
    component: SettingScreen,
    activeIcon: SETTING_SELECTED,
    deactiveIcon: SETTING,
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
          bottom: 5,
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
