/* eslint-disable prettier/prettier */
import React, {createRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
// import { useTheme } from "@/theme";
import BottomTab from './BottomTab';
import SplashScreen from '@/screens/Splash/SplashScreen';
import {navigationRef} from '@/helpers/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CONST_SCREEN from '@/constants/screen';

import {route} from './route';

enableScreens();

const Stack = createNativeStackNavigator<any>();

const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="MAIN_SCREEN" component={BottomTab} />
    {route.map(item => (
      <Stack.Screen
        key={item.name}
        // options={HEADER_OPTIONS}
        // sharedElements={item.configShareElement}
        name={item.name}
        component={item.component}
      />
    ))}
  </Stack.Navigator>
);

const config = {
  screens: {
    Setting: CONST_SCREEN.SETTING,
    Referral: CONST_SCREEN.REFERRAL,
    Feedback: CONST_SCREEN.FEEDBACK,
  },
};

const linking = {
  enabled: true,
  prefixes: ['demo://app'],
  config,
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
