import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  GetInfoScreen: undefined;
  HomeScreen: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
