import {UserProfileType} from '@/types/colection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuth = async (): Promise<UserProfileType> => {
  const user = await AsyncStorage.getItem('userInfo');
  const userInfo = user ? JSON.parse(user) : null;
  return userInfo as UserProfileType;
};
