import type {StackScreenProps} from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  GetInfoScreen: undefined;
  HomeScreen: undefined;
  PackScreen: undefined;
  LessionTypeScreen: undefined;
};

export type ApplicationScreenProps<
  Screen extends keyof ApplicationStackParamList,
> = StackScreenProps<ApplicationStackParamList, Screen>;
