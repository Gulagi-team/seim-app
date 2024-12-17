import CONST_SCREEN from '@/constants/screen';

import DisplayScreen from '@/screens/Display/Display';
import FeedbackScreen from '@/screens/Feedback/FeedbackScreen';
import HabitDetailScreen from '@/screens/HabitDetail/HabitDetailScreen';
import HistoryMiningScreen from '@/screens/HistoryMining/HistoryMiningScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import LanguageScreen from '@/screens/Language/LanguageScreen';
import LessionScreen from '@/screens/Lession/LessionScreen';
import LessionTypeScreen from '@/screens/LessionType/LessionTypeScreen';
import LoginScreen from '@/screens/Login/LoginScreen';
import MiningScreen from '@/screens/Mining/MiningScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';
import PackScreen from '@/screens/Pack/PackScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import ReferralScreen from '@/screens/Referral/ReferralScreen';
import TopicScreen from '@/screens/Topic/TopicScreen';
import UpdateProfileScreen from '@/screens/UpdateProfile/UpdateProfileScreen';
import CreateWalletScreen from '@/screens/Wallet/CreateWallet/CreateWalletScreen';
import ImportWalletScreen from '@/screens/Wallet/ImportWallet/ImportWalletScreen';
import IntroWalletScreen from '@/screens/Wallet/IntroWallet/IntroWalletScreen';
import MyWalletScreen from '@/screens/Wallet/MyWallet/MyWalletScreen';
import PasswordWalletScreen from '@/screens/Wallet/PasswordWallet/PasswordWalletScreen';
import GetInfoScreen from '@/screens/Welcome/GetInfoScreen';
import WelcomeScreen from '@/screens/Welcome/Welcome';

export const route = [
  {
    name: CONST_SCREEN.HOME,
    component: HomeScreen,
  },
  {
    name: CONST_SCREEN.PROFILE,
    component: ProfileScreen,
  },
  {
    name: CONST_SCREEN.NOTIFICATION,
    component: NotificationScreen,
  },
  {
    name: CONST_SCREEN.WELCOME,
    component: WelcomeScreen,
  },
  {
    name: CONST_SCREEN.GETINFO,
    component: GetInfoScreen,
  },
  {
    name: CONST_SCREEN.PACK,
    component: PackScreen,
  },
  {
    name: CONST_SCREEN.LESSION_TYPE,
    component: LessionTypeScreen,
  },
  {
    name: CONST_SCREEN.TOPIC,
    component: TopicScreen,
  },
  {
    name: CONST_SCREEN.LESSION,
    component: LessionScreen,
  },
  {
    name: CONST_SCREEN.LOGIN,
    component: LoginScreen,
  },
  {
    name: CONST_SCREEN.MY_WALLET,
    component: MyWalletScreen,
  },
  {
    name: CONST_SCREEN.PASSWORD_WALLET,
    component: PasswordWalletScreen,
  },
  {
    name: CONST_SCREEN.CREATE_WALLET,
    component: CreateWalletScreen,
  },
  {
    name: CONST_SCREEN.IMPORT_WALLET,
    component: ImportWalletScreen,
  },
  {
    name: CONST_SCREEN.INTRO_WALLET_SCREEN,
    component: IntroWalletScreen,
  },
  {
    name: CONST_SCREEN.MINING,
    component: MiningScreen,
  },
  {
    name: CONST_SCREEN.LANGUAGE,
    component: LanguageScreen,
  },
  {
    name: CONST_SCREEN.FEEDBACK,
    component: FeedbackScreen,
  },
  {
    name: CONST_SCREEN.REFERRAL,
    component: ReferralScreen,
  },
  {
    name: CONST_SCREEN.DISPLAY,
    component: DisplayScreen,
  },
  {
    name: CONST_SCREEN.HABIT_DETAIL,
    component: HabitDetailScreen,
  },
  {
    name: CONST_SCREEN.MINING_HISTORY,
    component: HistoryMiningScreen,
  },
  {
    name: CONST_SCREEN.UPDATE_PROFILE,
    component: UpdateProfileScreen,
  },
];
