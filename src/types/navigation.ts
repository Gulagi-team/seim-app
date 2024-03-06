import type {StackScreenProps} from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  GetInfoScreen: undefined;
  HomeScreen: undefined;
  PackScreen: undefined;
  LessionTypeScreen: undefined;
  LoginScreen: undefined;
  MyWalletScreen: undefined;
  IntroWalletScreen: undefined;
  PasswordWalletScreen: {
    to: string;
  };
  CreateWalletScreen: {
    password: string;
  };
  ImportWalletScreen: {
    password: string;
  };
};

export type ApplicationScreenProps<
  Screen extends keyof ApplicationStackParamList,
> = StackScreenProps<ApplicationStackParamList, Screen>;
