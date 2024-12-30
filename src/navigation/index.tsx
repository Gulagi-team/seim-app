/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
// import { useTheme } from "@/theme";
import {navigate, navigationRef} from '@/helpers/navigation';
import linking from '@/linking';
import SplashScreen from '@/screens/Splash/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTab, {KEY_BOTTOM_SCREEN} from './BottomTab';
import {route} from './route';

import {PermissionsAndroid, Platform} from 'react-native';

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

function ApplicationNavigator() {
  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notifications Permission',
            message: 'App needs permission to show notifications.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the notifications');
        } else {
          console.log('Notifications permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  messaging().onMessage(async remoteMessage => {});

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    if (remoteMessage.data) {
      navigate(KEY_BOTTOM_SCREEN.ENERGY);
    }
  });

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <SafeAreaProvider>
        <MainStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
