import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { SplashScreen, WelcomeScreen, GetInfoScreen } from "@/screens";
import { useTheme } from "@/theme";

import type { ApplicationStackParamList } from "@/types/navigation";
import { navigationRef } from "@/helper/navigation";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="GetInfoScreen" component={GetInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
