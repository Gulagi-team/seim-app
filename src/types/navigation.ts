import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
