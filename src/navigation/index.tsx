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

function ApplicationNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <MainStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
