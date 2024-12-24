/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {enableScreens} from 'react-native-screens';
// import { useTheme } from "@/theme";
import {navigationRef} from '@/helpers/navigation';
import SplashScreen from '@/screens/Splash/SplashScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTab from './BottomTab';

import {route} from './route';

enableScreens();

const Stack = createNativeStackNavigator<any>();

const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="MAIN_SCREEN" component={BottomTab} />

    {route.map(item => {
      return (
        <Stack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      );
    })}
  </Stack.Navigator>
);

const config = {
  screens: {
    MAIN_SCREEN: 'main',
    REFERRAL_SCREEN: 'referral',
  },
};

const linking = {
  enabled: true,
  prefixes: ['seim://app'],
  config,
  fallback: 'MAIN_SCREEN',
};
function ApplicationNavigator() {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <SafeAreaProvider>
        <MainStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
