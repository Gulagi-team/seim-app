/* eslint-disable prettier/prettier */
import PushNotification from 'react-native-push-notification';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {enableScreens} from 'react-native-screens';
// import { useTheme } from "@/theme";
import {navigationRef} from '@/helpers/navigation';
import SplashScreen from '@/screens/Splash/SplashScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTab from './BottomTab';
import messaging from '@react-native-firebase/messaging';
import {route} from './route';
import linking from '@/linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

import analytics from '@react-native-firebase/analytics';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {displayNotification} from '@/helpers/notification';

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

// analytics().logEvent('app_open', {
//   screen_name: 'Splash',
//   screen_class: 'SplashScreen',
// });
function ApplicationNavigator() {
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
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

        console.log('granted', granted);
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

  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Your Firebase Token is:', token);
      await AsyncStorage.setItem('fcmToken', token);
    } catch (error) {
      console.log('error get fcm token', error);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Foreground:', remoteMessage);
      await displayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
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
