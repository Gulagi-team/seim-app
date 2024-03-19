import api from './index';
import habits from '@/assets/json/habits.json';

export const getListHabit = () => {
  if (process.env.DEBUG) {
    return habits;
  }
  return api.get('/users/habits');
};
