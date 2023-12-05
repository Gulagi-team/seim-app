import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  GetInfoScreen: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
