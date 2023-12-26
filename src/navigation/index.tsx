import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// import { useTheme } from "@/theme";

import {ApplicationStackParamList} from '@/types/navigation';
import SplashScreen from '@/screens/Splash/SplashScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import {navigationRef} from '@/helpers/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GetInfoScreen from '@/screens/Welcome/GetInfoScreen';
import WelcomeScreen from '@/screens/Welcome/Welcome';
import PackScreen from '@/screens/Pack/PackScreen';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="GetInfoScreen" component={GetInfoScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PackScreen" component={PackScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
