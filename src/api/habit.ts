import api from './index';
import habits from '@/assets/json/habits.json';

export const getListHabit = () => {
  if (process.env.DEBUG) {
    console.log('true');
    return habits;
  }
  console.log('false');
  return api.get('/users/habits');
};
