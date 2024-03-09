import CONST_SCREEN from '@/constants/screen';

import HomeScreen from '@/screens/Home/HomeScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';
import WelcomeScreen from '@/screens/Welcome/Welcome';
import GetInfoScreen from '@/screens/Welcome/GetInfoScreen';
import PackScreen from '@/screens/Pack/PackScreen';
import LessionTypeScreen from '@/screens/LessionType/LessionTypeScreen';
import TopicScreen from '@/screens/Topic/TopicScreen';
import LessionScreen from '@/screens/Lession/LessionScreen';

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
];
